-- Add Valtrix Studio and Equipment Rental to services
INSERT INTO services (name, slug, description, short_description, features, is_active, display_order)
VALUES
('Valtrix Studio', 'valtrix-studio', 'Live mobile kitchen experiences for food sales, competitions, culinary workshops, and interactive chef demonstrations designed to engage communities and event audiences.', 'Mobile culinary activations and training', '["Mobile kitchen service", "Cooking competitions", "Hands-on workshops", "Live chef demonstrations"]'::jsonb, true, 8),
('Equipment Rental', 'equipment-rental', 'Rent chafing dishes, buffet setups, tables, chairs, kitchen equipment, serving utensils, and event catering accessories for professional service execution and elegant event presentation.', 'Professional event and catering gear', '["Chafing dishes and warmers", "Tables and chairs", "Serving utensils and serviceware", "Kitchen and buffet equipment"]'::jsonb, true, 9)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order,
  updated_at = timezone('utc', now());
