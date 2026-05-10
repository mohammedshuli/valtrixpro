export type UserRole = 'admin' | 'guest';
export type InquiryStatus = 'pending' | 'contacted' | 'confirmed' | 'completed';
export type ServiceType = 'catering' | 'corporate_events' | 'meal_prep' | 'consultation' | 'masterclass' | 'general_contact';

export interface Admin {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface CateringBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  guest_count: number;
  budget: string;
  special_requirements: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface CorporateEvent {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guest_count: number;
  budget: string;
  requirements: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface MealInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  meal_type: string;
  delivery_frequency: string;
  dietary_requirements: string;
  quantity: number;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  consultation_type: string;
  available_dates: string;
  budget: string;
  requirements: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface CourseRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  course_name: string;
  experience_level: string;
  dietary_restrictions: string;
  guests: number;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

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
