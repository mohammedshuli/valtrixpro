import { describe, expect, it } from 'vitest';
import { cateringInquirySchema, contactMessageSchema, privateChefInquirySchema } from './validationSchemas';

describe('public inquiry schemas', () => {
  it('validates catering boundaries used by the inquiry form', () => {
    const result = cateringInquirySchema.safeParse({
      name: 'A Guest',
      email: 'guest@example.com',
      phone: '+255 700 123 456',
      event_type: 'Wedding',
      guest_count: 80,
      event_date: '2026-11-01',
      location: 'Dar es Salaam',
    });
    expect(result.success).toBe(true);
  });

  it('rejects out-of-range guest counts and malformed email addresses', () => {
    const result = cateringInquirySchema.safeParse({
      name: 'A Guest',
      email: 'invalid',
      phone: '+255 700 123 456',
      event_type: 'Wedding',
      guest_count: 10001,
      event_date: '2026-11-01',
      location: 'Dar es Salaam',
    });
    expect(result.success).toBe(false);
  });

  it('supports the private-chef submission fields and optional contact phone', () => {
    expect(privateChefInquirySchema.safeParse({
      name: 'A Guest',
      email: 'guest@example.com',
      phone: '+255 700 123 456',
      event_type: 'Private dinner',
      guest_count: 8,
      preferred_date: '2026-11-01',
      location: 'Dar es Salaam',
    }).success).toBe(true);

    expect(contactMessageSchema.safeParse({
      name: 'A Guest',
      email: 'guest@example.com',
      message: 'Please contact me about an upcoming event.',
    }).success).toBe(true);
  });
});
