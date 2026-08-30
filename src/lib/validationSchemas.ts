import { z } from 'zod';
import { FORM_CONSTRAINTS } from './constants';

const phoneRegex = /^[\d\s\-+()]+$/;

export const cateringInquirySchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  event_type: z.string().min(2),
  guest_count: z.number().min(1).max(10000),
  event_date: z.string().date('Invalid date'),
  location: z.string().min(5).max(255),
  catering_style: z.string().optional(),
  special_requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const corporateEventSchema = z.object({
  company_name: z.string().min(2).max(255),
  contact_name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  event_type: z.string().min(2),
  event_date: z.string().date('Invalid date'),
  guest_count: z.number().min(1).max(10000),
  budget: z.string().optional(),
  requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const mealInquirySchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  meal_type: z.string().min(2),
  delivery_frequency: z.string().optional(),
  dietary_requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
  quantity: z.number().min(1).optional(),
});

export const consultationSchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  consultation_type: z.string().min(2),
  available_dates: z.string().max(500).optional(),
  budget: z.string().optional(),
  requirements: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const privateChefInquirySchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  event_type: z.string().min(2),
  guest_count: z.number().min(1).max(1000),
  preferred_date: z.string().date('Invalid date'),
  location: z.string().min(5).max(255),
  special_requests: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const freshInquirySchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  product_interest: z.string().min(1),
  delivery_location: z.string().min(2).max(255),
  preferred_plan: z.string().optional(),
  notes: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
});

export const courseRegistrationSchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  course_name: z.string().min(2),
  experience_level: z.string().optional(),
  dietary_restrictions: z.string().max(FORM_CONSTRAINTS.messageMax).optional(),
  guests: z.number().min(1).max(100).optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(FORM_CONSTRAINTS.nameMin).max(FORM_CONSTRAINTS.nameMax),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number').optional(),
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
