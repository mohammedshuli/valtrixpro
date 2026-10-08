-- Remove temporary public read policies that expose inquiry submissions.
DROP POLICY IF EXISTS "public_select_bookings_dev" ON public.bookings;
DROP POLICY IF EXISTS "public_select_corporate_events_dev" ON public.corporate_events;
DROP POLICY IF EXISTS "public_select_meal_inquiries_dev" ON public.meal_inquiries;
DROP POLICY IF EXISTS "public_select_consultations_dev" ON public.consultations;
DROP POLICY IF EXISTS "public_select_course_registrations_dev" ON public.course_registrations;
DROP POLICY IF EXISTS "public_select_contact_messages_dev" ON public.contact_messages;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE lower(email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
      AND role = 'admin'
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;