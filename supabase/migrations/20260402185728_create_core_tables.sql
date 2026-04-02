/*
  # Create Core Content Management Tables

  ## Overview
  This migration creates the foundational database schema for the EcoOptimizer website,
  replacing Storyblok CMS with a Supabase-based content management system.

  ## New Tables

  ### 1. pages
  Stores all website pages with metadata and configuration
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL path like 'about', 'services', 'contact'
  - `title` (text) - Page title for SEO and display
  - `meta_description` (text) - SEO meta description
  - `meta_keywords` (text) - SEO keywords
  - `theme_background` (text) - Background color for the page theme
  - `theme_text_color` (text) - Text color for the page theme
  - `published` (boolean) - Whether the page is live
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. sections
  Stores content sections for each page (hero, content blocks, etc.)
  - `id` (uuid, primary key)
  - `page_id` (uuid, foreign key to pages)
  - `type` (text) - Section type: 'hero', 'content', 'grid', 'testimonials', etc.
  - `title` (text) - Section heading
  - `background_color` (text) - Section background color
  - `text_color` (text) - Section text color
  - `accent_color` (text) - Section accent/highlight color
  - `content` (jsonb) - Flexible JSON storage for section-specific data
  - `order_position` (integer) - Display order on the page
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. navigation
  Stores navigation menu items
  - `id` (uuid, primary key)
  - `label` (text) - Display text for menu item
  - `url` (text) - Link destination
  - `parent_id` (uuid, nullable) - For nested navigation items
  - `order_position` (integer) - Display order in menu
  - `created_at` (timestamptz)

  ### 4. form_submissions
  Stores contact form submissions
  - `id` (uuid, primary key)
  - `name` (text) - Submitter's name
  - `email` (text) - Submitter's email
  - `message` (text) - Form message content
  - `page_uri` (text) - Page where form was submitted
  - `ip_address` (text, nullable) - Submitter's IP for spam prevention
  - `created_at` (timestamptz)

  ### 5. site_settings
  Stores global site configuration
  - `id` (uuid, primary key)
  - `key` (text, unique) - Setting identifier
  - `value` (jsonb) - Setting value (flexible JSON)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public users can read published pages, sections, and navigation
  - Only authenticated admins can insert/update/delete
  - Public users can insert form submissions
  - Form submissions are not publicly readable
*/

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text DEFAULT '',
  meta_keywords text DEFAULT '',
  theme_background text DEFAULT '#ffffff',
  theme_text_color text DEFAULT '#000000',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text DEFAULT '',
  background_color text DEFAULT '#ffffff',
  text_color text DEFAULT '#000000',
  accent_color text DEFAULT '#71e200',
  content jsonb DEFAULT '{}'::jsonb,
  order_position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create navigation table
CREATE TABLE IF NOT EXISTS navigation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  parent_id uuid REFERENCES navigation(id) ON DELETE CASCADE,
  order_position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  page_uri text DEFAULT '',
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages table
CREATE POLICY "Anyone can view published pages"
  ON pages FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage pages"
  ON pages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for sections table
CREATE POLICY "Anyone can view sections of published pages"
  ON sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pages
      WHERE pages.id = sections.page_id
      AND pages.published = true
    )
  );

CREATE POLICY "Authenticated users can manage sections"
  ON sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for navigation table
CREATE POLICY "Anyone can view navigation"
  ON navigation FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage navigation"
  ON navigation FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for form_submissions table
CREATE POLICY "Anyone can submit forms"
  ON form_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for site_settings table
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(order_position);
CREATE INDEX IF NOT EXISTS idx_navigation_order ON navigation(order_position);
CREATE INDEX IF NOT EXISTS idx_navigation_parent ON navigation(parent_id);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created ON form_submissions(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();