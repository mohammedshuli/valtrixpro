import { supabase } from '../lib/supabase';
import { AppError } from '../lib/errorHandler';
import { UI_CONSTANTS } from '../lib/constants';
import * as types from '../types';
import * as schemas from '../lib/validationSchemas';

type InquirySubmitType =
  | 'catering'
  | 'corporate'
  | 'meal'
  | 'consultation'
  | 'privateChef'
  | 'course'
  | 'contact'
  | 'fresh';

interface InquiryAdapter {
  table: string;
  transform?: (data: Record<string, unknown>) => Record<string, unknown>;
}

const inquiryAdapters: Record<InquirySubmitType, InquiryAdapter> = {
  catering: {
    table: 'bookings',
  },
  corporate: {
    table: 'corporate_events',
  },
  meal: {
    table: 'meal_inquiries',
  },
  consultation: {
    table: 'consultations',
  },
  privateChef: {
    table: 'consultations',
    transform: (data) => ({
      name: data.name,
      email: data.email,
      phone: data.phone,
      consultation_type: data.event_type,
      available_dates: data.preferred_date,
      budget: null,
      requirements: `Location: ${data.location}${data.special_requests ? `\nSpecial Requests: ${data.special_requests}` : ''}`,
      status: 'pending',
    }),
  },
  course: {
    table: 'course_registrations',
  },
  contact: {
    table: 'contact_messages',
  },
  fresh: {
    table: 'meal_inquiries',
    transform: (data) => ({
      name: data.name,
      email: data.email,
      phone: data.phone,
      meal_type: data.product_interest,
      delivery_frequency: data.preferred_plan || 'one-time',
      dietary_requirements: data.notes || null,
      quantity: 1,
      status: 'pending',
    }),
  },
};

const submitInquiry = async (
  type: InquirySubmitType,
  data: Record<string, unknown>
) => {
  const adapter = inquiryAdapters[type];

  if (!adapter) {
    throw new AppError(`Inquiry type '${type}' is not supported.`, 'SERVER');
  }

  const record = adapter.transform
    ? adapter.transform(data)
    : {
        ...data,
        status: 'pending',
      };

  const { data: result, error } = await supabase.from(adapter.table).insert([record]).select();

  if (error) {
    throw new AppError(`Failed to submit ${type} inquiry: ${error.message}`, 'SERVER', true);
  }

  return result?.[0];
};

export const submitCateringInquiry = async (data: schemas.CateringInquiry) =>
  submitInquiry('catering', data);

export const submitCorporateEventInquiry = async (data: schemas.CorporateEvent) =>
  submitInquiry('corporate', data);

export const submitMealInquiry = async (data: schemas.MealInquiry) =>
  submitInquiry('meal', data);

export const submitConsultationRequest = async (data: schemas.Consultation) =>
  submitInquiry('consultation', data);

export const submitPrivateChefInquiry = async (data: schemas.PrivateChefInquiry) =>
  submitInquiry('privateChef', data);

export const submitCourseRegistration = async (data: schemas.CourseRegistration) =>
  submitInquiry('course', data);

export const submitContactMessage = async (data: schemas.ContactMessage) =>
  submitInquiry('contact', data);

export const submitFreshInquiry = async (data: schemas.FreshInquiry) =>
  submitInquiry('fresh', data);

// Admin queries
export type InquiryCategoryKey = 'catering' | 'corporate' | 'meals' | 'consultations' | 'courses' | 'contact';

const inquiryCategoryTableMap: Record<InquiryCategoryKey, string> = {
  catering: 'bookings',
  corporate: 'corporate_events',
  meals: 'meal_inquiries',
  consultations: 'consultations',
  courses: 'course_registrations',
  contact: 'contact_messages',
};

export interface PaginatedInquiryResult<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const fetchInquiriesByCategory = async <T = unknown>(
  category: InquiryCategoryKey,
  page = 1,
  pageSize = UI_CONSTANTS.ADMIN_PAGE_SIZE
): Promise<PaginatedInquiryResult<T>> => {
  const table = inquiryCategoryTableMap[category];
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  const { data, error, count } = await supabase
    .from(table)
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new AppError(`Failed to fetch ${category} inquiries: ${error.message}`, 'SERVER', true);
  }

  return {
    data: (data as T[]) || [],
    totalCount: count ?? 0,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
    currentPage: page,
  };
};

export const fetchAllInquiries = async (
  pageMap: Record<InquiryCategoryKey, number> = {
    catering: 1,
    corporate: 1,
    meals: 1,
    consultations: 1,
    courses: 1,
    contact: 1,
  },
  pageSize = UI_CONSTANTS.ADMIN_PAGE_SIZE
) => {
  const [catering, corporate, meals, consultations, courses, contact] = await Promise.all([
    fetchInquiriesByCategory<types.CateringBooking>('catering', pageMap.catering, pageSize),
    fetchInquiriesByCategory<types.CorporateEvent>('corporate', pageMap.corporate, pageSize),
    fetchInquiriesByCategory<types.MealInquiry>('meals', pageMap.meals, pageSize),
    fetchInquiriesByCategory<types.Consultation>('consultations', pageMap.consultations, pageSize),
    fetchInquiriesByCategory<types.CourseRegistration>('courses', pageMap.courses, pageSize),
    fetchInquiriesByCategory<types.ContactMessage>('contact', pageMap.contact, pageSize),
  ]);

  return {
    catering,
    corporate,
    meals,
    consultations,
    courses,
    contact,
  };
};

export const updateInquiryStatus = async (
  table: string,
  id: string,
  status: types.InquiryStatus
) => {
  const { error } = await supabase
    .from(table)
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(error.message);
};

// Services
export const fetchServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name');

  if (error) throw new Error(error.message);
  return data || [];
};

// Testimonials
export const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('order');

  if (error) throw new Error(error.message);
  return data || [];
};

export const createTestimonial = async (data: Omit<types.Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
  const { error } = await supabase
    .from('testimonials')
    .insert([data]);

  if (error) throw new Error(error.message);
};

// Gallery
export const fetchGalleryImages = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('order');

  if (error) throw new Error(error.message);
  return data || [];
};

// Homepage Content
export const fetchHomepageContent = async () => {
  const { data, error } = await supabase
    .from('homepage_content')
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateHomepageContent = async (id: string, data: Partial<types.HomepageContent>) => {
  const { error } = await supabase
    .from('homepage_content')
    .update(data)
    .eq('id', id);

  if (error) throw new Error(error.message);
};
