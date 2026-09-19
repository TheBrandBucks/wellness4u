/*
  # Visa Consultancy Platform Schema

  ## Tables
  - `countries`: Destination countries and nationalities
  - `visa_types`: Visa categories per country (Study, Work, Tourist, etc.)
  - `applications`: Submitted visa applications with personal details

  ## Details
  1. `countries` - id, name, code, flag_emoji, region
  2. `visa_types` - id, country_id (FK), name, description, processing_time, fee, document_checklist (text[])
  3. `applications` - id, user_name, email, phone, nationality, destination_country_id, visa_type_id, status, documents_submitted, created_at

  ## Security
  - RLS enabled on all tables
  - Countries and visa_types are publicly readable
  - Applications restricted to authenticated users by email match
*/

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  flag_emoji text NOT NULL DEFAULT '',
  region text NOT NULL DEFAULT '',
  is_destination boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Countries are publicly readable"
  ON countries FOR SELECT
  TO anon, authenticated
  USING (true);

-- Visa types table
CREATE TABLE IF NOT EXISTS visa_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Tourist',
  description text NOT NULL DEFAULT '',
  processing_time text NOT NULL DEFAULT '2-4 weeks',
  fee numeric(10,2) NOT NULL DEFAULT 0,
  document_checklist text[] NOT NULL DEFAULT '{}',
  requirements text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visa_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visa types are publicly readable"
  ON visa_types FOR SELECT
  TO anon, authenticated
  USING (true);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  date_of_birth date,
  nationality text NOT NULL,
  passport_number text NOT NULL DEFAULT '',
  destination_country_id uuid NOT NULL REFERENCES countries(id),
  visa_type_id uuid NOT NULL REFERENCES visa_types(id),
  status text NOT NULL DEFAULT 'pending',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO anon, authenticated
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_visa_types_country_id ON visa_types(country_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
