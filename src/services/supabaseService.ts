import { supabase } from '../lib/supabase';
import * as types from '../types';
import * as schemas from '../lib/validationSchemas';

type InquiryCategory = 'catering' | 'corporate' | 'meal' | 'consultation' | 'course' | 'contact';

const submitInquiry = async (category: InquiryCategory, data: Record<string, unknown>): Promise<void> => {
  const { error } = await supabase.functions.invoke('submit-inquiry', {
    body: { category, data },
  });

  if (!error) return;

  let message = error.message;
  if (error.context instanceof Response) {
    const response = await error.context.clone().json() as { error?: unknown };
    if (typeof response.error === 'string') message = response.error;
  }
  throw new Error(message);
};

// Catering Bookings
export const submitCateringInquiry = async (data: schemas.CateringInquiry) => {
  return submitInquiry('catering', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    event_type: data.event_type,
    guest_count: data.guest_count,
    event_date: data.event_date,
    location: data.location,
    catering_style: data.catering_style,
    special_requirements: data.special_requirements,
  });
};

// Corporate Events
export const submitCorporateEventInquiry = async (data: schemas.CorporateEvent) => {
  return submitInquiry('corporate', {
    company_name: data.company_name,
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone,
    event_type: data.event_type,
    event_date: data.event_date,
    guest_count: data.guest_count,
    budget: data.budget,
    requirements: data.requirements,
  });
};

// Meal Inquiries
export const submitMealInquiry = async (data: schemas.MealInquiry) => {
  return submitInquiry('meal', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    meal_type: data.meal_type,
    delivery_frequency: data.delivery_frequency,
    dietary_requirements: data.dietary_requirements,
    quantity: data.quantity,
  });
};

// Consultations
export const submitConsultationRequest = async (data: schemas.Consultation) => {
  return submitInquiry('consultation', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    consultation_type: data.consultation_type,
    available_dates: data.available_dates,
    budget: data.budget,
    requirements: data.requirements,
  });
};

// Private Chef Inquiries
export const submitPrivateChefInquiry = async (data: schemas.PrivateChefInquiry) => {
  return submitInquiry('consultation', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    consultation_type: data.event_type,
    available_dates: data.preferred_date,
    budget: null,
    requirements: `Location: ${data.location}\nGuest count: ${data.guest_count}${data.special_requests ? `\nSpecial Requests: ${data.special_requests}` : ''}`,
  });
};

// Course Registrations
export const submitCourseRegistration = async (data: schemas.CourseRegistration) => {
  return submitInquiry('course', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    course_name: data.course_name,
    experience_level: data.experience_level,
    dietary_restrictions: data.dietary_restrictions,
    guests: data.guests || 1,
  });
};

// Contact Messages
export const submitContactMessage = async (data: schemas.ContactMessage) => {
  return submitInquiry('contact', {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject,
    message: data.message,
  });
};

// Fresh Food Inquiries
export const submitFreshInquiry = async (data: schemas.FreshInquiry) => {
  return submitInquiry('meal', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    meal_type: data.product_interest,
    delivery_frequency: data.preferred_plan || 'one-time',
    delivery_location: data.delivery_location,
    dietary_requirements: data.notes || null,
    quantity: 1,
  });
};

type PaginatedInquiryResult<T> = {
  data: T[];
  totalCount: number;
  pendingCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

const normalizePaginatedQuery = <T extends Record<string, unknown>>(
  items: T[] | null,
  count: number | null,
  pendingCount: number | null,
  page: number,
  pageSize: number
): PaginatedInquiryResult<T> => ({
  data: items ?? [],
  totalCount: count ?? items?.length ?? 0,
  pendingCount: pendingCount ?? 0,
  totalPages: pageSize > 0 ? Math.max(1, Math.ceil((count ?? items?.length ?? 0) / pageSize)) : 1,
  currentPage: page,
  pageSize,
});

// Admin queries
export const fetchAllInquiries = async (
  page: number = 1,
  pageSize: number = 20
): Promise<{
  catering: PaginatedInquiryResult<Record<string, unknown>>;
  corporate: PaginatedInquiryResult<Record<string, unknown>>;
  meals: PaginatedInquiryResult<Record<string, unknown>>;
  consultations: PaginatedInquiryResult<Record<string, unknown>>;
  courses: PaginatedInquiryResult<Record<string, unknown>>;
  contact: PaginatedInquiryResult<Record<string, unknown>>;
}> => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const offset = (safePage - 1) * safePageSize;

  const [bookings, corporate, meals, consultations, courses, contacts, pendingBookings, pendingCorporate, pendingMeals, pendingConsultations, pendingCourses, pendingContacts] = await Promise.all([
    supabase.from('bookings').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + safePageSize - 1),
    supabase.from('corporate_events').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + safePageSize - 1),
    supabase.from('meal_inquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + safePageSize - 1),
    supabase.from('consultations').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + safePageSize - 1),
    supabase.from('course_registrations').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + safePageSize - 1),
    supabase.from('contact_messages').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + safePageSize - 1),
    supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('corporate_events').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('meal_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('consultations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('course_registrations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  const queryErrors = [
    bookings.error, corporate.error, meals.error, consultations.error, courses.error, contacts.error,
    pendingBookings.error, pendingCorporate.error, pendingMeals.error,
    pendingConsultations.error, pendingCourses.error, pendingContacts.error,
  ];
  const queryError = queryErrors.find((error) => error !== null);
  if (queryError) throw new Error(`Unable to load inquiries: ${queryError.message}`);

  return {
    catering: normalizePaginatedQuery(bookings.data, bookings.count, pendingBookings.count, safePage, safePageSize),
    corporate: normalizePaginatedQuery(corporate.data, corporate.count, pendingCorporate.count, safePage, safePageSize),
    meals: normalizePaginatedQuery(meals.data, meals.count, pendingMeals.count, safePage, safePageSize),
    consultations: normalizePaginatedQuery(consultations.data, consultations.count, pendingConsultations.count, safePage, safePageSize),
    courses: normalizePaginatedQuery(courses.data, courses.count, pendingCourses.count, safePage, safePageSize),
    contact: normalizePaginatedQuery(contacts.data, contacts.count, pendingContacts.count, safePage, safePageSize),
  };
};

export type InquiryTable =
  | 'bookings'
  | 'corporate_events'
  | 'meal_inquiries'
  | 'consultations'
  | 'course_registrations'
  | 'contact_messages';

export const updateInquiryStatus = async (
  table: InquiryTable,
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
export const fetchServices = async (): Promise<types.Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw new Error(error.message);
  return (data as types.Service[]) || [];
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
