import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { inquiryCategories, validatePayload, type InquiryCategory } from './validation.ts';

/* global Deno */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const tableByCategory = {
  catering: 'bookings',
  corporate: 'corporate_events',
  meal: 'meal_inquiries',
  consultation: 'consultations',
  course: 'course_registrations',
  contact: 'contact_messages',
} as const;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function hmacSha256(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function readBoundedBody(request: Request, maxBytes: number): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > 12_000) return jsonResponse({ error: 'Inquiry is too large.' }, 413);

  let body: unknown;
  try {
    const rawBody = await readBoundedBody(request, 12_000);
    if (rawBody === null) return jsonResponse({ error: 'Inquiry is too large or missing.' }, 413);
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON.' }, 400);
  }

  if (!isRecord(body) || typeof body.category !== 'string' || !inquiryCategories.includes(body.category as InquiryCategory)) {
    return jsonResponse({ error: 'Unsupported inquiry type.' }, 400);
  }

  const category = body.category as InquiryCategory;
  const result = validatePayload(category, body.data);
  if (result.error || !result.payload) return jsonResponse({ error: result.error ?? 'Invalid inquiry data.' }, 400);

  const forwardedIps = request.headers.get('x-forwarded-for')?.split(',').map((ip) => ip.trim()).filter(Boolean);
  const clientIp = request.headers.get('cf-connecting-ip')?.trim() || forwardedIps?.at(-1);
  if (!clientIp) return jsonResponse({ error: 'Unable to verify the request for rate limiting.' }, 503);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Inquiry function is missing server Supabase configuration.');
    return jsonResponse({ error: 'Inquiry service is temporarily unavailable.' }, 503);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const [ipHash, emailHash] = await Promise.all([
    hmacSha256(serviceRoleKey, `ip:${clientIp}`),
    hmacSha256(serviceRoleKey, `email:${String(result.payload.email).toLowerCase()}`),
  ]);
  const { data: allowed, error: rateLimitError } = await supabase.rpc('consume_inquiry_rate_limit', {
    p_ip_hash: ipHash,
    p_email_hash: emailHash,
  });

  if (rateLimitError) {
    console.error('Inquiry rate-limit check failed:', rateLimitError.message);
    return jsonResponse({ error: 'Inquiry service is temporarily unavailable.' }, 503);
  }
  if (!allowed) return jsonResponse({ error: 'Too many inquiries. Please wait 15 minutes before trying again.' }, 429);

  const table = tableByCategory[category];
  const { error: insertError } = await supabase
    .from(table)
    .insert({ ...result.payload, status: 'pending' });

  if (insertError) {
    console.error('Inquiry insert failed:', { category, message: insertError.message });
    return jsonResponse({ error: 'We could not submit your inquiry. Please try again.' }, 500);
  }

  return jsonResponse({ ok: true });
});
