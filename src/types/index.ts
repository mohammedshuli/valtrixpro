export type UserRole = 'admin' | 'guest';
export type InquiryStatus = 'pending' | 'contacted' | 'confirmed' | 'completed';
export type ServiceType = 'catering' | 'corporate_events' | 'meal_prep' | 'consultation' | 'masterclass' | 'general_contact';
export type InquiryType =
  | 'catering'
  | 'corporate'
  | 'meal'
  | 'consultation'
  | 'privateChef'
  | 'course'
  | 'contact'
  | 'fresh';

export interface Admin {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface InquiryBase {
  id: string;
  email: string;
  phone: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface CateringBooking extends InquiryBase {
  name: string;
  event_date: string;
  guest_count: number;
  budget: string;
  special_requirements: string;
}

export interface CorporateEvent extends InquiryBase {
  company_name: string;
  contact_name: string;
  event_type: string;
  event_date: string;
  guest_count: number;
  budget: string;
  requirements: string;
}

export interface MealInquiry extends InquiryBase {
  name: string;
  meal_type: string;
  delivery_frequency: string;
  dietary_requirements: string;
  quantity: number;
}

export interface Consultation extends InquiryBase {
  name: string;
  consultation_type: string;
  available_dates: string;
  budget: string;
  requirements: string;
}

export interface CourseRegistration extends InquiryBase {
  name: string;
  course_name: string;
  experience_level: string;
  dietary_restrictions: string;
  guests: number;
}

export interface ContactMessage extends InquiryBase {
  name: string;
  subject: string;
  message: string;
}

export type Inquiry =
  | (CateringBooking & { type: 'catering' })
  | (CorporateEvent & { type: 'corporate' })
  | (MealInquiry & { type: 'meal' })
  | (Consultation & { type: 'consultation' })
  | (CourseRegistration & { type: 'course' })
  | (ContactMessage & { type: 'contact' })
  | (MealInquiry & { type: 'fresh' });

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  image_url: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  message: string;
  rating: number;
  image_url?: string;
  service_type: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  image_path: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_image_url: string;
  created_at: string;
  updated_at: string;
}
