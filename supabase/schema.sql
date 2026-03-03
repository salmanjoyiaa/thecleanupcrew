-- ============================================
-- The Clean Up Crew — Supabase Database Schema
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- ─── PROFILES ───────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'crew')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── SERVICES ───────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  base_price NUMERIC(10,2),
  price_unit TEXT DEFAULT 'per service',
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed default services
INSERT INTO services (name, slug, description, short_description, base_price, price_unit, icon, sort_order) VALUES
('Window Cleaning', 'window-cleaning', 'Professional residential and commercial window cleaning using pure-water technology. Streak-free results guaranteed up to 5 stories.', 'Crystal clear windows using eco-friendly pure-water tech.', 6.50, 'per pane', 'droplets', 1),
('Commercial Cleaning', 'commercial-cleaning', 'Full exterior maintenance for offices, retail plazas, and commercial properties. Flexible scheduling and volume discounts available.', 'Storefronts, offices, and mid-rise buildings.', 4.00, 'per pane', 'building', 2),
('Eavestrough Cleaning', 'eavestrough-cleaning', 'Complete gutter and eavestrough cleaning with full debris removal and downspout flushing. Protect your foundation from water damage.', 'Full debris removal and downspout flushing.', 149.00, 'per service', 'waves', 3),
('Carpet Cleaning', 'carpet-cleaning', 'Deep carpet cleaning using hot water extraction. Removes stains, allergens, and odors for a fresher, healthier home.', 'Deep clean for fresher, healthier carpets.', 99.00, 'per room', 'sparkles', 4)
ON CONFLICT (slug) DO NOTHING;

-- ─── QUOTES ─────────────────────────────────
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  property_type TEXT CHECK (property_type IN ('residential', 'commercial')),
  num_windows INT DEFAULT 10,
  num_floors INT DEFAULT 1,
  add_ons TEXT[] DEFAULT '{}',
  estimated_total NUMERIC(10,2),
  currency TEXT DEFAULT 'CAD',
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'expired')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── BOOKINGS ───────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  scheduled_date DATE,
  scheduled_time TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  province TEXT DEFAULT 'ON',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  total_price NUMERIC(10,2),
  crew_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── REVIEWS ────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── CONTACT SUBMISSIONS ────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── GALLERY ITEMS ──────────────────────────
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('residential', 'commercial', 'eavestrough')),
  image_url TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── SERVICE AREAS ──────────────────────────
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  province TEXT DEFAULT 'ON',
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

-- Seed service areas
INSERT INTO service_areas (city, province, sort_order) VALUES
('Toronto', 'ON', 1),
('Mississauga', 'ON', 2),
('Brampton', 'ON', 3),
('Vaughan', 'ON', 4),
('Markham', 'ON', 5),
('Oakville', 'ON', 6),
('Hamilton', 'ON', 7),
('London', 'ON', 8),
('Ottawa', 'ON', 9),
('Vancouver', 'BC', 10)
ON CONFLICT DO NOTHING;

-- ─── ROW LEVEL SECURITY ─────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

-- Public read access for services, gallery, service areas
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read areas" ON service_areas FOR SELECT USING (true);

-- Anyone can insert quotes and contact submissions
CREATE POLICY "Anyone can submit quote" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Users can read their own data
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users read own quotes" ON quotes FOR SELECT USING (profile_id = auth.uid());
CREATE POLICY "Users read own bookings" ON bookings FOR SELECT USING (profile_id = auth.uid());

-- Published reviews are public
CREATE POLICY "Public read published reviews" ON reviews FOR SELECT USING (is_published = true);

-- ─── INDEXES ────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(contact_email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- ─── UPDATED_AT TRIGGER ─────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
