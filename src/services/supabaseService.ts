import { supabase } from '../lib/supabase';
import * as types from '../types';
import * as schemas from '../lib/validationSchemas';

// Catering Bookings
export const submitCateringInquiry = async (data: schemas.CateringInquiry) => {
  const { data: result, error } = await supabase
    .from('bookings')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        event_date: data.event_date,
        guest_count: data.guest_count,
        budget: data.budget,
        special_requirements: data.special_requirements,
        status: 'pending',
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return result?.[0];
};

// Corporate Events
export const submitCorporateEventInquiry = async (data: schemas.CorporateEvent) => {
  const { data: result, error } = await supabase
    .from('corporate_events')
    .insert([
      {
        company_name: data.company_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone,
        event_type: data.event_type,
        event_date: data.event_date,
        guest_count: data.guest_count,
        budget: data.budget,
        requirements: data.requirements,
        status: 'pending',
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return result?.[0];
};

// Meal Inquiries
export const submitMealInquiry = async (data: schemas.MealInquiry) => {
  const { data: result, error } = await supabase
    .from('meal_inquiries')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        meal_type: data.meal_type,
        delivery_frequency: data.delivery_frequency,
        dietary_requirements: data.dietary_requirements,
        quantity: data.quantity,
        status: 'pending',
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return result?.[0];
};

// Consultations
export const submitConsultationRequest = async (data: schemas.Consultation) => {
  const { data: result, error } = await supabase
    .from('consultations')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        consultation_type: data.consultation_type,
        available_dates: data.available_dates,
        budget: data.budget,
        requirements: data.requirements,
        status: 'pending',
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return result?.[0];
};

// Course Registrations
export const submitCourseRegistration = async (data: schemas.CourseRegistration) => {
  const { data: result, error } = await supabase
    .from('course_registrations')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        course_name: data.course_name,
        experience_level: data.experience_level,
        dietary_restrictions: data.dietary_restrictions,
        guests: data.guests || 1,
        status: 'pending',
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return result?.[0];
};

// Contact Messages
export const submitContactMessage = async (data: schemas.ContactMessage) => {
  const { data: result, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        status: 'pending',
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return result?.[0];
};

// Admin queries
export const fetchAllInquiries = async () => {
  const [bookings, corporate, meals, consultations, courses, contacts] = await Promise.all([
    supabase.from('bookings').select('*').order('created_at', { ascending: false }),
    supabase.from('corporate_events').select('*').order('created_at', { ascending: false }),
    supabase.from('meal_inquiries').select('*').order('created_at', { ascending: false }),
    supabase.from('consultations').select('*').order('created_at', { ascending: false }),
    supabase.from('course_registrations').select('*').order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
  ]);

  return {
    catering: bookings.data || [],
    corporate: corporate.data || [],
    meals: meals.data || [],
    consultations: consultations.data || [],
    courses: courses.data || [],
    contact: contacts.data || [],
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
