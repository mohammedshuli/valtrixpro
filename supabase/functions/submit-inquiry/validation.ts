export const inquiryCategories = ['catering', 'corporate', 'meal', 'consultation', 'course', 'contact'] as const;
export type InquiryCategory = (typeof inquiryCategories)[number];
export type InquiryPayload = Record<string, unknown>;

const allowedFields: Record<InquiryCategory, string[]> = {
  catering: ['name', 'email', 'phone', 'event_type', 'guest_count', 'event_date', 'location', 'catering_style', 'special_requirements'],
  corporate: ['company_name', 'contact_name', 'email', 'phone', 'event_type', 'event_date', 'guest_count', 'budget', 'requirements'],
  meal: ['name', 'email', 'phone', 'meal_type', 'delivery_frequency', 'delivery_location', 'dietary_requirements', 'quantity'],
  consultation: ['name', 'email', 'phone', 'consultation_type', 'available_dates', 'budget', 'requirements'],
  course: ['name', 'email', 'phone', 'course_name', 'experience_level', 'dietary_restrictions', 'guests'],
  contact: ['name', 'email', 'phone', 'subject', 'message'],
};

const requiredFields: Record<InquiryCategory, string[]> = {
  catering: ['name', 'email', 'phone', 'event_type', 'guest_count', 'event_date', 'location'],
  corporate: ['company_name', 'contact_name', 'email', 'phone', 'event_type', 'event_date', 'guest_count'],
  meal: ['name', 'email', 'phone', 'meal_type'],
  consultation: ['name', 'email', 'phone', 'consultation_type'],
  course: ['name', 'email', 'phone', 'course_name'],
  contact: ['name', 'email', 'message'],
};

const stringLimits: Record<string, number> = {
  name: 100,
  email: 255,
  phone: 20,
  company_name: 255,
  contact_name: 100,
  event_type: 100,
  event_date: 10,
  location: 255,
  catering_style: 100,
  special_requirements: 5000,
  budget: 100,
  requirements: 5000,
  meal_type: 100,
  delivery_frequency: 50,
  delivery_location: 255,
  dietary_requirements: 5000,
  consultation_type: 100,
  available_dates: 500,
  course_name: 255,
  experience_level: 50,
  dietary_restrictions: 5000,
  subject: 255,
  message: 5000,
};

const nullableFields = new Set([
  'phone', 'catering_style', 'special_requirements', 'budget', 'requirements',
  'delivery_frequency', 'delivery_location', 'dietary_requirements',
  'available_dates', 'experience_level', 'dietary_restrictions', 'subject',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validatePayload(
  category: InquiryCategory,
  input: unknown,
): { payload?: InquiryPayload; error?: string } {
  if (!isRecord(input)) return { error: 'Invalid inquiry data.' };

  const allowed = new Set(allowedFields[category]);
  if (Object.keys(input).some((key) => !allowed.has(key))) {
    return { error: 'Inquiry contains unsupported fields.' };
  }

  for (const field of requiredFields[category]) {
    if (!(field in input) || input[field] === null || input[field] === '') {
      return { error: `Please provide ${field.replaceAll('_', ' ')}.` };
    }
  }

  const payload: InquiryPayload = {};
  for (const [field, value] of Object.entries(input)) {
    if (value === null && nullableFields.has(field)) {
      payload[field] = null;
      continue;
    }

    const maxLength = stringLimits[field];
    if (maxLength !== undefined) {
      if (typeof value !== 'string' || value.length > maxLength) {
        return { error: `Please check the ${field.replaceAll('_', ' ')} field.` };
      }
      const normalized = value.trim();
      if (normalized.length === 0 && requiredFields[category].includes(field)) {
        return { error: `Please provide ${field.replaceAll('_', ' ')}.` };
      }
      if (['name', 'company_name', 'contact_name', 'event_type', 'meal_type', 'consultation_type', 'course_name'].includes(field) && normalized.length < 2) {
        return { error: `Please check the ${field.replaceAll('_', ' ')} field.` };
      }
      payload[field] = normalized;
      continue;
    }

    if (['guest_count', 'quantity', 'guests'].includes(field)) {
      const maximum = field === 'guest_count' ? 10000 : 100;
      if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > maximum) {
        return { error: `Please check the ${field.replaceAll('_', ' ')} field.` };
      }
      payload[field] = value;
      continue;
    }

    return { error: 'Inquiry contains invalid data.' };
  }

  const email = payload.email;
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }
  if (typeof payload.phone === 'string' && !/^[\d\s\-+()]{5,20}$/.test(payload.phone)) {
    return { error: 'Please provide a valid phone number.' };
  }
  if (typeof payload.event_date === 'string') {
    const date = new Date(`${payload.event_date}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.event_date) || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== payload.event_date) {
      return { error: 'Please provide a valid event date.' };
    }
  }
  if (typeof payload.subject === 'string' && payload.subject.length < 3) {
    return { error: 'Please check the subject field.' };
  }
  if (category === 'contact' && (typeof payload.message !== 'string' || payload.message.length < 10)) {
    return { error: 'Please provide a message of at least 10 characters.' };
  }

  return { payload };
}
