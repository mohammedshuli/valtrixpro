-- Admin authorization helper for authenticated users only.
-- Public sign-ups should be disabled in Supabase Dashboard -> Authentication -> Settings.
-- This fix stops non-admin accounts from doing anything, but it does not prevent those
-- accounts from being created if public sign-up remains enabled.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admins
    WHERE lower(email) = lower(COALESCE(auth.jwt() ->> 'email', ''))
  );
$$;

REVOKE EXECUTE ON FUNCTION is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Drop the permissive public admin policies and recreate them as authenticated-only checks.
DROP POLICY IF EXISTS "admin_all_operations" ON admins;
DROP POLICY IF EXISTS "admin_all_bookings" ON bookings;
DROP POLICY IF EXISTS "admin_all_corporate_events" ON corporate_events;
DROP POLICY IF EXISTS "admin_all_meal_inquiries" ON meal_inquiries;
DROP POLICY IF EXISTS "admin_all_consultations" ON consultations;
DROP POLICY IF EXISTS "admin_all_course_registrations" ON course_registrations;
DROP POLICY IF EXISTS "admin_all_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "admin_all_services" ON services;
DROP POLICY IF EXISTS "admin_all_testimonials" ON testimonials;
DROP POLICY IF EXISTS "admin_all_gallery" ON gallery;
DROP POLICY IF EXISTS "admin_all_homepage_content" ON homepage_content;

CREATE POLICY "admin_all_operations" ON admins
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_bookings" ON bookings
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_corporate_events" ON corporate_events
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_meal_inquiries" ON meal_inquiries
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_consultations" ON consultations
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_course_registrations" ON course_registrations
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_contact_messages" ON contact_messages
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_services" ON services
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_testimonials" ON testimonials
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_gallery" ON gallery
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "admin_all_homepage_content" ON homepage_content
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Scope the public-facing insert and select policies explicitly to anon/authenticated roles.
DROP POLICY IF EXISTS "public_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "public_no_select_bookings" ON bookings;
DROP POLICY IF EXISTS "public_insert_corporate_events" ON corporate_events;
DROP POLICY IF EXISTS "public_no_select_corporate_events" ON corporate_events;
DROP POLICY IF EXISTS "public_insert_meal_inquiries" ON meal_inquiries;
DROP POLICY IF EXISTS "public_no_select_meal_inquiries" ON meal_inquiries;
DROP POLICY IF EXISTS "public_insert_consultations" ON consultations;
DROP POLICY IF EXISTS "public_no_select_consultations" ON consultations;
DROP POLICY IF EXISTS "public_insert_course_registrations" ON course_registrations;
DROP POLICY IF EXISTS "public_no_select_course_registrations" ON course_registrations;
DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "public_no_select_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "public_select_services" ON services;
DROP POLICY IF EXISTS "public_select_testimonials" ON testimonials;
DROP POLICY IF EXISTS "public_select_gallery" ON gallery;
DROP POLICY IF EXISTS "public_select_homepage_content" ON homepage_content;

CREATE POLICY "public_insert_bookings" ON bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_no_select_bookings" ON bookings
  FOR SELECT TO anon, authenticated
  USING (false);

CREATE POLICY "public_insert_corporate_events" ON corporate_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_no_select_corporate_events" ON corporate_events
  FOR SELECT TO anon, authenticated
  USING (false);

CREATE POLICY "public_insert_meal_inquiries" ON meal_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_no_select_meal_inquiries" ON meal_inquiries
  FOR SELECT TO anon, authenticated
  USING (false);

CREATE POLICY "public_insert_consultations" ON consultations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_no_select_consultations" ON consultations
  FOR SELECT TO anon, authenticated
  USING (false);

CREATE POLICY "public_insert_course_registrations" ON course_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_no_select_course_registrations" ON course_registrations
  FOR SELECT TO anon, authenticated
  USING (false);

CREATE POLICY "public_insert_contact_messages" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_no_select_contact_messages" ON contact_messages
  FOR SELECT TO anon, authenticated
  USING (false);

CREATE POLICY "public_select_services" ON services
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "public_select_testimonials" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "public_select_gallery" ON gallery
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "public_select_homepage_content" ON homepage_content
  FOR SELECT TO anon, authenticated
  USING (true);
