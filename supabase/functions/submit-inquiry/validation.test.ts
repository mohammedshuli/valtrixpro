import { describe, expect, it } from 'vitest';
import { validatePayload } from './validation';

const contact = {
  name: 'A Guest',
  email: 'guest@example.com',
  phone: '+255 700 123 456',
};

describe('server inquiry validation', () => {
  it('accepts valid catering and trims submitted text', () => {
    const result = validatePayload('catering', {
      ...contact,
      event_type: 'Wedding',
      guest_count: 80,
      event_date: '2026-11-01',
      location: 'Dar es Salaam',
      special_requirements: '  Vegetarian options  ',
    });

    expect(result.error).toBeUndefined();
    expect(result.payload?.special_requirements).toBe('Vegetarian options');
  });

  it('accepts the supported corporate, meal, consultation and course shapes', () => {
    expect(validatePayload('corporate', {
      company_name: 'Valtrix',
      contact_name: 'A Guest',
      email: contact.email,
      phone: contact.phone,
      event_type: 'Conference',
      event_date: '2026-11-01',
      guest_count: 120,
    }).error).toBeUndefined();

    expect(validatePayload('meal', {
      ...contact,
      meal_type: 'Lunch',
      quantity: 3,
    }).error).toBeUndefined();

    expect(validatePayload('consultation', {
      ...contact,
      consultation_type: 'Menu planning',
    }).error).toBeUndefined();

    expect(validatePayload('course', {
      ...contact,
      course_name: 'Culinary class',
      guests: 2,
    }).error).toBeUndefined();
  });

  it('accepts contact messages without a phone number', () => {
    expect(validatePayload('contact', {
      name: 'A Guest',
      email: contact.email,
      subject: 'Event request',
      message: 'Please contact me about an upcoming event.',
    }).error).toBeUndefined();
  });

  it('rejects extra fields that could set a status or target another column', () => {
    const result = validatePayload('meal', {
      ...contact,
      meal_type: 'Lunch',
      status: 'completed',
    });

    expect(result.error).toMatch(/unsupported fields/i);
  });

  it('rejects invalid emails, dates, and numeric bounds', () => {
    expect(validatePayload('catering', {
      ...contact,
      email: 'not-an-email',
      event_type: 'Wedding',
      guest_count: 80,
      event_date: '2026-11-01',
      location: 'Dar es Salaam',
    }).error).toMatch(/valid email/i);

    expect(validatePayload('catering', {
      ...contact,
      event_type: 'Wedding',
      guest_count: 80,
      event_date: '2026-02-30',
      location: 'Dar es Salaam',
    }).error).toMatch(/valid event date/i);

    expect(validatePayload('meal', {
      ...contact,
      meal_type: 'Lunch',
      quantity: 1.5,
    }).error).toMatch(/quantity/i);
  });

  it('enforces server-side field size and required-field constraints', () => {
    expect(validatePayload('contact', {
      name: 'A Guest',
      email: contact.email,
      message: 'short',
    }).error).toMatch(/at least 10/i);

    expect(validatePayload('meal', {
      ...contact,
      meal_type: 'Lunch',
      dietary_requirements: 'x'.repeat(5001),
    }).error).toMatch(/dietary requirements/i);
  });
});
