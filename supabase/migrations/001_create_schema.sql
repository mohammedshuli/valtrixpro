-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'guest');
CREATE TYPE inquiry_status AS ENUM ('pending', 'contacted', 'confirmed', 'completed');

-- Admins Table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Catering Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  event_date DATE NOT NULL,
  event_type VARCHAR(100),
  guest_count INTEGER NOT NULL,
  location VARCHAR(255),
  catering_style VARCHAR(100),
  budget VARCHAR(100),
  special_requirements TEXT,
  status inquiry_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Corporate Events Table
CREATE TABLE corporate_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  location VARCHAR(255),
  budget VARCHAR(100),
  requirements TEXT,
  status inquiry_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Meal Prep Inquiries Table
CREATE TABLE meal_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  meal_type VARCHAR(100) NOT NULL,
  delivery_frequency VARCHAR(50),
  delivery_location VARCHAR(255),
  dietary_requirements TEXT,
  quantity INTEGER,
  status inquiry_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Chef Consultations Table
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  consultation_type VARCHAR(100) NOT NULL,
  available_dates TEXT,
  budget VARCHAR(100),
  requirements TEXT,
  status inquiry_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Culinary Course Registrations Table
CREATE TABLE course_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  experience_level VARCHAR(50),
  dietary_restrictions TEXT,
  guests INTEGER DEFAULT 1,
  status inquiry_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status inquiry_status DEFAULT 'pending',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  icon VARCHAR(50),
  image_url VARCHAR(500),
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(100) NOT NULL,
  client_title VARCHAR(255),
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url VARCHAR(500),
  service_type VARCHAR(100),
  "order" INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Gallery Images Table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_path VARCHAR(500) NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  alt_text VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Homepage Content Table
CREATE TABLE homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title VARCHAR(500) NOT NULL,
  hero_subtitle VARCHAR(500),
  hero_cta_text VARCHAR(100),
  hero_image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_corporate_events_status ON corporate_events(status);
CREATE INDEX idx_corporate_events_created_at ON corporate_events(created_at DESC);
CREATE INDEX idx_corporate_events_event_date ON corporate_events(event_date);
CREATE INDEX idx_meal_inquiries_status ON meal_inquiries(status);
CREATE INDEX idx_meal_inquiries_created_at ON meal_inquiries(created_at DESC);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_course_registrations_status ON course_registrations(status);
CREATE INDEX idx_course_registrations_created_at ON course_registrations(created_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_order ON gallery("order");
CREATE INDEX idx_gallery_is_active ON gallery(is_active);
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_services_display_order ON services(display_order);
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_order ON testimonials("order");

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public can INSERT into inquiry tables but cannot SELECT
CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "public_no_select_bookings" ON bookings FOR SELECT USING (false);
CREATE POLICY "public_insert_corporate_events" ON corporate_events FOR INSERT WITH CHECK (true);
CREATE POLICY "public_no_select_corporate_events" ON corporate_events FOR SELECT USING (false);
CREATE POLICY "public_insert_meal_inquiries" ON meal_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "public_no_select_meal_inquiries" ON meal_inquiries FOR SELECT USING (false);
CREATE POLICY "public_insert_consultations" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "public_no_select_consultations" ON consultations FOR SELECT USING (false);
CREATE POLICY "public_insert_course_registrations" ON course_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "public_no_select_course_registrations" ON course_registrations FOR SELECT USING (false);
CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "public_no_select_contact_messages" ON contact_messages FOR SELECT USING (false);

-- RLS Policies: Admin can do everything
-- Note: These assume auth.uid() matches admin email - adjust as needed
CREATE POLICY "admin_all_operations" ON admins FOR ALL USING (true);
CREATE POLICY "admin_all_bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "admin_all_corporate_events" ON corporate_events FOR ALL USING (true);
CREATE POLICY "admin_all_meal_inquiries" ON meal_inquiries FOR ALL USING (true);
CREATE POLICY "admin_all_consultations" ON consultations FOR ALL USING (true);
CREATE POLICY "admin_all_course_registrations" ON course_registrations FOR ALL USING (true);
CREATE POLICY "admin_all_contact_messages" ON contact_messages FOR ALL USING (true);
CREATE POLICY "admin_all_services" ON services FOR ALL USING (true);
CREATE POLICY "admin_all_testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "admin_all_gallery" ON gallery FOR ALL USING (true);
CREATE POLICY "admin_all_homepage_content" ON homepage_content FOR ALL USING (true);

-- RLS Policies: Public can SELECT from content tables
CREATE POLICY "public_select_services" ON services FOR SELECT USING (true);
CREATE POLICY "public_select_testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "public_select_gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "public_select_homepage_content" ON homepage_content FOR SELECT USING (true);

-- Insert default admin (replace with your actual email)
INSERT INTO admins (email, role) VALUES ('admin@valtrixprofchef.com', 'admin') ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (name, slug, description, short_description, features) VALUES
('Private Chef Experiences', 'private-chef-experiences', 'Experience bespoke dining tailored to your preferences, dietary needs, and atmosphere. Our executive chefs create unforgettable moments through intimate culinary artistry.', 'Personalized culinary journeys in your space', '["Custom menu design", "Dietary accommodations", "Interactive preparation", "Premium ingredients"]'::jsonb),
('Premium Catering', 'premium-catering', 'From intimate gatherings to grand celebrations, our catering transforms your events with meticulous attention to cuisine, presentation, and service excellence.', 'Elevated dining for every occasion', '["Full-service catering", "Customizable menus", "Professional service staff", "Setup and breakdown"]'::jsonb),
('Corporate Events', 'corporate-events', 'Impress clients and motivate teams with our premium corporate catering and event production, crafted to reflect your brand''s prestige.', 'Sophisticated culinary solutions for business', '["Corporate dining", "Team building events", "Networking functions", "Conference catering"]'::jsonb),
('Valtrix Fresh', 'valtrix-fresh', 'Premium, locally-sourced salads, cold-pressed juices, and nutritionally balanced meals prepared fresh daily for your wellness journey.', 'Nutrient-rich meal prep delivered', '["Fresh ingredients", "Customizable plans", "Weekly delivery", "Nutritionist consultation"]'::jsonb),
('Culinary Experiences', 'culinary-experiences', 'Immersive cooking masterclasses and sensory experiences designed to elevate your culinary knowledge and appreciation for fine dining.', 'Learn from world-class chefs', '["Hands-on cooking", "Expert instruction", "Ingredient mastery", "Certification available"]'::jsonb),
('Chef Consultation', 'chef-consultation', 'One-on-one consultations with our executive chefs for menu planning, kitchen design, culinary training, and bespoke food strategy.', 'Expert guidance for your culinary vision', '["Menu planning", "Kitchen design", "Staff training", "Food strategy"]'::jsonb),
('Catering Partnerships', 'catering-partnerships', 'Long-term partnerships with hotels, venues, and establishments seeking premium culinary operations and F&B management.', 'Strategic collaborations for hospitality', '["F&B management", "Kitchen operations", "Staff management", "Revenue optimization"]'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (hero_title, hero_subtitle, hero_cta_text, hero_image_url) VALUES
('Experience Culinary Excellence in Tanzania', 'Valtrix Pro Chef brings world-class gastronomy to your table', 'Inquire Now', 'https://images.unsplash.com/photo-1559521713-95d5634ae3a7?w=1600&h=900&fit=crop')
ON CONFLICT DO NOTHING;
