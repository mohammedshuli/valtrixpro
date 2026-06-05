import { z } from 'zod';
import { FORM_CONSTRAINTS } from './constants';

const phoneRegex = /^[\d\s\-+()]+$/;

const nameField = z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax);
const emailField = z.string().email();
const phoneField = z.string().regex(phoneRegex, 'Invalid phone number');
const optionalPhoneField = phoneField.optional();

const baseContactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
});

const optionalPhoneContactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: optionalPhoneField,
});

const corporateContactSchema = z.object({
  company_name: z.string().min(2).max(255),
  contact_name: nameField,
  email: emailField,
  phone: phoneField,
});

export const cateringInquirySchema = baseContactSchema.extend({
  event_type: z.string().min(2),
  guest_count: z.number().min(1).max(10000),
  event_date: z.string().date('Invalid date'),
  location: z.string().min(5).max(255),
  catering_style: z.string().optional(),
  special_requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const corporateEventSchema = corporateContactSchema.extend({
  event_type: z.string().min(2),
  event_date: z.string().date('Invalid date'),
  guest_count: z.number().min(1).max(10000),
  budget: z.string().optional(),
  requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const mealInquirySchema = baseContactSchema.extend({
  meal_type: z.string().min(2),
  delivery_frequency: z.string().optional(),
  dietary_requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
  quantity: z.number().min(1).optional(),
});

export const consultationSchema = baseContactSchema.extend({
  consultation_type: z.string().min(2),
  available_dates: z.string().max(500).optional(),
  budget: z.string().optional(),
  requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const privateChefInquirySchema = baseContactSchema.extend({
  event_type: z.string().min(2),
  guest_count: z.number().min(1).max(1000),
  preferred_date: z.string().date('Invalid date'),
  location: z.string().min(5).max(255),
  special_requests: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const freshInquirySchema = baseContactSchema.extend({
  product_interest: z.string().min(1),
  delivery_location: z.string().min(2).max(255),
  preferred_plan: z.string().optional(),
  notes: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const courseRegistrationSchema = baseContactSchema.extend({
  course_name: z.string().min(2),
  experience_level: z.string().optional(),
  dietary_restrictions: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
  guests: z.number().min(1).max(100).optional(),
});

export const contactMessageSchema = optionalPhoneContactSchema.extend({
  subject: z.string().min(3).max(255).optional(),
  message: z.string().min(FORM_CONSTRAINTS.messageMin).max(FORM_CONSTRAINTS.messageMax),
});

export type CateringInquiry = z.infer<typeof cateringInquirySchema>;
export type CorporateEvent = z.infer<typeof corporateEventSchema>;
export type MealInquiry = z.infer<typeof mealInquirySchema>;
export type Consultation = z.infer<typeof consultationSchema>;
export type PrivateChefInquiry = z.infer<typeof privateChefInquirySchema>;
export type FreshInquiry = z.infer<typeof freshInquirySchema>;
export type CourseRegistration = z.infer<typeof courseRegistrationSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
