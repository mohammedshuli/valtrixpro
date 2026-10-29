CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

CREATE TABLE IF NOT EXISTS private.inquiry_rate_limits (
  bucket_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL CHECK (request_count > 0)
);

CREATE INDEX IF NOT EXISTS inquiry_rate_limits_window_started_at_idx
  ON private.inquiry_rate_limits (window_started_at);

REVOKE ALL ON TABLE private.inquiry_rate_limits FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE private.inquiry_rate_limits TO service_role;

CREATE OR REPLACE FUNCTION public.consume_inquiry_rate_limit(
  p_ip_hash text,
  p_email_hash text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, pg_temp
AS $$
DECLARE
  ip_count integer;
  email_count integer;
BEGIN
  IF p_ip_hash !~ '^[a-f0-9]{64}$' OR p_email_hash !~ '^[a-f0-9]{64}$' THEN
    RETURN false;
  END IF;

  DELETE FROM private.inquiry_rate_limits
  WHERE window_started_at < clock_timestamp() - interval '1 day';

  INSERT INTO private.inquiry_rate_limits (bucket_key, window_started_at, request_count)
  VALUES ('ip:' || p_ip_hash, clock_timestamp(), 1)
  ON CONFLICT (bucket_key) DO UPDATE
  SET
    request_count = CASE
      WHEN private.inquiry_rate_limits.window_started_at <= clock_timestamp() - interval '15 minutes' THEN 1
      ELSE private.inquiry_rate_limits.request_count + 1
    END,
    window_started_at = CASE
      WHEN private.inquiry_rate_limits.window_started_at <= clock_timestamp() - interval '15 minutes' THEN clock_timestamp()
      ELSE private.inquiry_rate_limits.window_started_at
    END
  RETURNING request_count INTO ip_count;

  INSERT INTO private.inquiry_rate_limits (bucket_key, window_started_at, request_count)
  VALUES ('email:' || p_email_hash, clock_timestamp(), 1)
  ON CONFLICT (bucket_key) DO UPDATE
  SET
    request_count = CASE
      WHEN private.inquiry_rate_limits.window_started_at <= clock_timestamp() - interval '15 minutes' THEN 1
      ELSE private.inquiry_rate_limits.request_count + 1
    END,
    window_started_at = CASE
      WHEN private.inquiry_rate_limits.window_started_at <= clock_timestamp() - interval '15 minutes' THEN clock_timestamp()
      ELSE private.inquiry_rate_limits.window_started_at
    END
  RETURNING request_count INTO email_count;

  RETURN ip_count <= 5 AND email_count <= 3;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_inquiry_rate_limit(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_inquiry_rate_limit(text, text) TO service_role;

DROP POLICY IF EXISTS "public_insert_bookings" ON public.bookings;
DROP POLICY IF EXISTS "public_insert_corporate_events" ON public.corporate_events;
DROP POLICY IF EXISTS "public_insert_meal_inquiries" ON public.meal_inquiries;
DROP POLICY IF EXISTS "public_insert_consultations" ON public.consultations;
DROP POLICY IF EXISTS "public_insert_course_registrations" ON public.course_registrations;
DROP POLICY IF EXISTS "public_insert_contact_messages" ON public.contact_messages;

REVOKE INSERT ON TABLE
  public.bookings,
  public.corporate_events,
  public.meal_inquiries,
  public.consultations,
  public.course_registrations,
  public.contact_messages
FROM anon, authenticated;

GRANT INSERT ON TABLE
  public.bookings,
  public.corporate_events,
  public.meal_inquiries,
  public.consultations,
  public.course_registrations,
  public.contact_messages
TO service_role;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "public_read_gallery_assets" ON storage.objects;
CREATE POLICY "public_read_gallery_assets" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'gallery');
