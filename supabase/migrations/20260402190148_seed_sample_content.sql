/*
  # Seed Sample Content

  ## Overview
  This migration populates the database with sample content for the EcoOptimizer website.

  ## Content Added
  1. Navigation items (Home, About, Services, Contact)
  2. Homepage with hero section and content sections
  3. About page with content
  4. Services page with content
  5. Contact page with contact form

  ## Notes
  - All pages are set to published
  - Sample content uses placeholder text
  - Navigation is ordered for proper display
*/

-- Insert navigation items
INSERT INTO navigation (label, url, order_position) VALUES
  ('Home', '/', 1),
  ('About', '/about', 2),
  ('Services', '/services', 3),
  ('Contact', '/contact', 4)
ON CONFLICT DO NOTHING;

-- Insert Homepage
INSERT INTO pages (slug, title, meta_description, meta_keywords, theme_background, theme_text_color, published)
VALUES (
  'home',
  'EcoOptimizer - Sustainable Solutions',
  'Leading provider of eco-friendly optimization solutions for businesses',
  'eco, sustainability, optimization, green business',
  '#ffffff',
  '#000000',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published;

-- Get the home page ID
DO $$
DECLARE
  home_page_id uuid;
BEGIN
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home';

  -- Insert Hero Section for Homepage
  INSERT INTO sections (page_id, type, title, background_color, text_color, accent_color, content, order_position)
  VALUES (
    home_page_id,
    'hero',
    '',
    '#71e200',
    '#ffffff',
    '#4255bd',
    jsonb_build_object(
      'heading', 'Welcome to EcoOptimizer',
      'subheading', 'Sustainable solutions for a better tomorrow',
      'buttonText', 'Get Started',
      'buttonUrl', '/contact',
      'buttonVariant', 'tertiary',
      'height', '80',
      'contentPosition', 'center'
    ),
    1
  );

  -- Insert Content Section for Homepage
  INSERT INTO sections (page_id, type, title, background_color, text_color, accent_color, content, order_position)
  VALUES (
    home_page_id,
    'content',
    'Our Services',
    '#f8f8f8',
    '#000000',
    '#71e200',
    jsonb_build_object(
      'richText', '<h2>What We Do</h2><p>We help businesses optimize their operations while reducing environmental impact.</p>',
      'height', 'auto',
      'containerSize', 'medium'
    ),
    2
  );
END $$;

-- Insert About Page
INSERT INTO pages (slug, title, meta_description, meta_keywords, theme_background, theme_text_color, published)
VALUES (
  'about',
  'About Us - EcoOptimizer',
  'Learn more about our mission and values',
  'about, mission, values, team',
  '#ffffff',
  '#000000',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published;

-- Get the about page ID and add sections
DO $$
DECLARE
  about_page_id uuid;
BEGIN
  SELECT id INTO about_page_id FROM pages WHERE slug = 'about';

  INSERT INTO sections (page_id, type, title, background_color, text_color, accent_color, content, order_position)
  VALUES (
    about_page_id,
    'content',
    'About EcoOptimizer',
    '#ffffff',
    '#000000',
    '#71e200',
    jsonb_build_object(
      'richText', '<h1>Our Story</h1><p>EcoOptimizer was founded with a simple mission: to help businesses thrive while protecting our planet.</p><p>We believe that sustainability and profitability go hand in hand.</p>',
      'height', 'auto',
      'containerSize', 'medium'
    ),
    1
  );
END $$;

-- Insert Services Page
INSERT INTO pages (slug, title, meta_description, meta_keywords, theme_background, theme_text_color, published)
VALUES (
  'services',
  'Our Services - EcoOptimizer',
  'Discover our range of sustainable business solutions',
  'services, solutions, consulting, optimization',
  '#ffffff',
  '#000000',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published;

-- Get the services page ID and add sections
DO $$
DECLARE
  services_page_id uuid;
BEGIN
  SELECT id INTO services_page_id FROM pages WHERE slug = 'services';

  INSERT INTO sections (page_id, type, title, background_color, text_color, accent_color, content, order_position)
  VALUES (
    services_page_id,
    'content',
    'What We Offer',
    '#f8f8f8',
    '#000000',
    '#71e200',
    jsonb_build_object(
      'richText', '<h1>Our Services</h1><p>We offer comprehensive sustainability consulting and optimization services tailored to your business needs.</p>',
      'height', 'auto',
      'containerSize', 'medium',
      'items', jsonb_build_array(
        jsonb_build_object('title', 'Energy Optimization', 'description', 'Reduce your energy consumption and costs'),
        jsonb_build_object('title', 'Waste Reduction', 'description', 'Minimize waste and maximize resource efficiency'),
        jsonb_build_object('title', 'Green Consulting', 'description', 'Expert guidance on sustainable practices')
      )
    ),
    1
  );
END $$;

-- Insert Contact Page
INSERT INTO pages (slug, title, meta_description, meta_keywords, theme_background, theme_text_color, published)
VALUES (
  'contact',
  'Contact Us - EcoOptimizer',
  'Get in touch with our team',
  'contact, reach us, get in touch',
  '#ffffff',
  '#000000',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published;

-- Get the contact page ID and add sections
DO $$
DECLARE
  contact_page_id uuid;
BEGIN
  SELECT id INTO contact_page_id FROM pages WHERE slug = 'contact';

  INSERT INTO sections (page_id, type, title, background_color, text_color, accent_color, content, order_position)
  VALUES (
    contact_page_id,
    'contact',
    'Get In Touch',
    '#f8f8f8',
    '#000000',
    '#71e200',
    jsonb_build_object(
      'height', 'auto',
      'containerSize', 'small'
    ),
    1
  );
END $$;