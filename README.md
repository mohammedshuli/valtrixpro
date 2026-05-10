# Valtrix Pro Chef - Digital Platform

A production-ready luxury hospitality platform for Valtrix Pro Chef, Tanzania's leading premium culinary operator.

## Overview

Valtrix Pro Chef is a modern, feature-rich digital platform that positions Tanzania's premium culinary brand as internationally competitive. The platform serves as a digital-first hospitality ecosystem, offering:

- **Private Chef Experiences** - Personalized culinary journeys
- **Premium Catering** - Full-service event catering
- **Corporate Events** - B2B culinary solutions
- **Valtrix Fresh** - Premium meal prep delivery
- **Culinary Masterclasses** - Hands-on learning experiences
- **Chef Consultation** - Expert culinary guidance
- **Catering Partnerships** - Strategic B2B collaborations

## Tech Stack

### Frontend
- **React 18** + **TypeScript** - Type-safe UI components
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Client-side routing
- **TanStack React Query** - Data fetching & caching
- **Framer Motion** - Smooth animations
- **react-hook-form** + **zod** - Form handling & validation
- **shadcn/ui** - UI component library

### Backend & Database
- **Supabase** - PostgreSQL database + Auth
- **Row-Level Security (RLS)** - Secure data access
- **Supabase Storage** - Image & file management

## Project Structure

```
src/
├── app/              # App entry & router setup
├── pages/            # Route-level page components (10 public pages)
├── components/       # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── forms/        # Form components
│   ├── sections/     # Section components
│   └── admin/        # Admin components
├── features/         # Feature modules
│   ├── inquiries/    # Form submissions
│   ├── gallery/      # Image gallery
│   └── admin/        # Admin dashboard
├── layouts/          # Layout components
│   ├── PublicLayout.tsx
│   └── AdminLayout.tsx
├── services/         # Supabase API functions
├── types/            # TypeScript interfaces
├── lib/              # Utilities, constants, validators
│   ├── supabase.ts   # Supabase client
│   ├── constants.ts  # App constants
│   ├── utils.ts      # Helper utilities
│   └── validationSchemas.ts  # Zod schemas
├── hooks/            # Custom React hooks
├── store/            # Global state (if needed)
├── assets/           # Static assets
└── index.css         # Global styles
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### 1. Clone & Install

```bash
cd /home/moshuly/Desktop/cursor
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set Up Supabase Database

#### Option A: Manual Setup
1. Create a new Supabase project
2. Go to SQL Editor in your Supabase dashboard
3. Copy the entire SQL migration from `supabase/migrations/001_create_schema.sql`
4. Paste and execute in the SQL editor

#### Option B: Using Supabase CLI
```bash
npm install -g supabase
supabase link --project-ref your-project-id
supabase db push
```

### 4. Create Admin User

In Supabase SQL Editor:
```sql
INSERT INTO admins (email, role) VALUES ('your-email@example.com', 'admin');
```

Then set up an auth account:
- Go to Supabase Dashboard → Authentication → Users
- Create a new user with the same email
- Set a password

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Public Pages (10 Total)
1. **Homepage** - Brand storytelling with conversion funnel
2. **About** - Brand story, mission, values, team
3. **Services** - Full service overview
4. **Catering** - Catering showcase + inquiry form
5. **Corporate Events** - B2B services + inquiry form
6. **Valtrix Fresh** - Meal prep product line + inquiry form
7. **Culinary Experiences** - Masterclasses + registration form
8. **Chef Consultation** - Consultation services + request form
9. **Gallery** - Visual portfolio with category filtering
10. **Contact** - General contact form with location info

### Admin Dashboard
Access at `/admin/login`

#### Module 1: Inquiry Management
- View all submissions (catering, corporate, meal prep, consultation, masterclass, contact)
- Filter by type and status
- Update inquiry status (pending → contacted → confirmed → completed)
- View full submission details

#### Module 2: Content Management
- Edit homepage hero section
- Edit service descriptions
- Manage testimonials (add/edit/delete/reorder)

#### Module 3: Media Management
- Upload images to Supabase Storage
- Manage gallery
- Update promotional banners

#### Module 4: Analytics Overview
- Inquiry count by type (last 30 days)
- Most requested services
- Recent activity feed
- Monthly trends

## Forms & Validation

All forms use **react-hook-form** + **zod** validation:

### 6 Inquiry Forms:
1. **Catering Inquiry** - Event details, guest count, budget
2. **Corporate Event** - Company info, event type, requirements
3. **Meal Prep Inquiry** - Meal preferences, delivery frequency
4. **Consultation Request** - Consultation type, availability
5. **Masterclass Registration** - Course selection, experience level
6. **General Contact** - Message submission

All forms:
- ✅ Client-side validation with zod
- ✅ Real-time error feedback
- ✅ Success/error states
- ✅ Auto-clear on success
- ✅ Submit to Supabase with timestamps

## Database Schema

All tables include:
- `id` (UUID) - Primary key
- `created_at` - Timestamp
- `updated_at` - Timestamp
- `status` - ENUM (pending, contacted, confirmed, completed)

### Tables:
- `admins` - Admin users
- `bookings` - Catering inquiries
- `corporate_events` - Corporate event requests
- `meal_inquiries` - Valtrix Fresh requests
- `consultations` - Chef consultation requests
- `course_registrations` - Masterclass registrations
- `contact_messages` - General contact submissions
- `services` - Service content
- `testimonials` - Client testimonials
- `gallery` - Gallery images
- `homepage_content` - Homepage copy

## Security

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Public users** can INSERT only, cannot SELECT inquiry tables
✅ **Admins** have full CRUD access
✅ **Authentication** via Supabase Auth (email/password)
✅ **Protected routes** for admin dashboard
✅ **Input validation** with zod schemas
✅ **CORS configured** for Supabase

## Build & Deploy

### Build for Production
```bash
npm run build
```

Outputs optimized build to `dist/`

### Deploy Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

#### Traditional Hosting
- Deploy `dist/` folder to any static hosting
- Set environment variables in hosting platform
- Ensure `.env.local` is in `.gitignore`

## Performance Optimization

✅ **Code Splitting** - Route-based lazy loading
✅ **Image Optimization** - Unsplash placeholders (replace with CDN)
✅ **Caching** - React Query default 5-minute stale time
✅ **Compression** - Gzip enabled
✅ **CSS** - Tailwind purged unused styles

Target metrics:
- Homepage load: < 3 seconds
- Mobile performance: 90+
- Desktop performance: 95+

## Development

### Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Enforce code standards
- **Tailwind** - Utility classes only
- **Naming** - camelCase for functions, PascalCase for components

## Supabase RLS Policies

**Configured for:**
- ✅ Public INSERT on inquiry tables (no auth needed)
- ✅ Public SELECT on content tables (services, testimonials, gallery)
- ✅ Admin full access to all tables
- ✅ Automatic timestamp updates

## Brand Design System

### Colors (CSS Variables)
```css
--color-bg:        #FFF8E7 (Warm cream)
--color-highlight: #FFD77A (Light gold)
--color-accent:    #E6A520 (Primary gold)
--color-heading:   #7A4A00 (Dark brown)
```

### Typography
- **Headings**: Playfair Display (elegant, serif)
- **Body**: Inter (modern, clean)

### Visual Style
- Luxury hospitality aesthetic
- Warm, cinematic, editorial
- Strong visual hierarchy
- Intentional whitespace
- Storytelling-first layouts

## Known Limitations & Future Enhancements

- Admin module pages (Content, Media, Analytics) are dashboard stubs
- Payment processing not integrated (requires Stripe/Paystack)
- Email notifications to admin not configured
- Image optimization CDN not configured
- Multi-language support not implemented
- Mobile app not included

## Troubleshooting

### Supabase Connection Issues
```
Error: Supabase environment variables not configured
```
→ Check `.env.local` has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### Form Submissions Not Working
→ Check RLS policies in Supabase SQL Editor
→ Ensure `status` ENUM type is created

### Images Not Loading
→ Update image URLs to your CDN
→ Check Supabase Storage bucket permissions

## Support & Documentation

- [Supabase Docs](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)

## License

Private - Valtrix Pro Chef

## Contact

For platform support or customization:
- Email: hello@valtrixprofchef.com
- Phone: +255 123 456 789
