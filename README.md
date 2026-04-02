# EcoOptimizer Website

A modern, sustainable business website built with Nuxt 3 and Supabase.

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, SCSS
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom design system with responsive layouts
- **Animations**: GSAP
- **Forms**: reCAPTCHA v3, Nodemailer

## Prerequisites

Install Bun on your machine:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Environment Variables

Create a `.env` file in the root directory with:

```env
# Supabase Configuration (required)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (for contact form)
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
TO_EMAIL=recipient@example.com

# reCAPTCHA (for contact form)
RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Environment
ENV=development
```

## Database Setup

The Supabase database is already configured with:
- Pages table for content management
- Sections table for page sections
- Navigation table for menu items
- Form submissions table
- Site settings table

Sample content has been seeded automatically.

## Setup

Install dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
bun run build
```

Preview production build:

```bash
bun run preview
```

## Project Structure

```
├── assets/scss/          # Global styles and design system
├── components/           # Vue components
│   ├── Section/         # Section components for page rendering
│   ├── Forms/           # Form components
│   ├── Navigation/      # Navigation components
│   └── ...
├── composables/         # Vue composables for data fetching
├── pages/               # Nuxt pages
├── server/              # Server API routes
└── config/              # Configuration files
```

## Content Management

Content is managed through Supabase. You can:
- Edit content directly in Supabase Studio
- Create new pages by adding records to the `pages` table
- Add sections to pages through the `sections` table
- Manage navigation through the `navigation` table

## Features

- Dynamic page rendering from database
- Responsive design with mobile-first approach
- Contact form with spam protection
- SEO-optimized with meta tags
- Smooth animations and transitions
- Accessible navigation

## Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
