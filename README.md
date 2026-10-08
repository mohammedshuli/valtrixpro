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
- **React 19** + **TypeScript** - Type-safe UI components
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router v7** - Client-side routing
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

Copy `.env.example` to `.env.local` and fill in your Supabase project URL and publishable (anon) key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set Up Supabase Database

Apply every SQL migration in `supabase/migrations/` in numeric order. For a hosted project, the Supabase CLI is preferred so migration history is tracked:

#### Option B: Using Supabase CLI
```bash
npm install -g supabase
supabase link --project-ref your-project-id
supabase db push
```

For manual setup, execute migrations `001` through `004` in order in the Supabase SQL Editor. Do not launch with only the initial schema migration applied; later migrations harden inquiry access and admin authorization.

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
Access at `/admin/login`. Admin authentication and route protection are present, but inquiry management, content editing, media management, and analytics routes are placeholders and are not operational workflows. Do not rely on them to process production inquiries; arrange a separate monitored process until these modules are implemented.

## Forms & Validation

All forms use **react-hook-form** + **zod** validation:

### 6 Inquiry Forms:
1. **Catering Inquiry** - Event details, guest count, budget
2. **Corporate Event** - Company info, event type, requirements
3. **Meal Prep Inquiry** - Meal preferences, delivery frequency
4. **Consultation Request** - Consultation type, availability
5. **Masterclass Registration** - Course selection, experience level
6. **General Contact** - Message submission

All implemented public inquiry forms:
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

RLS policies are defined by the ordered migrations. Public inquiry inserts are intentionally allowed, while inquiry reads and admin operations require the appropriate access. Verify the effective policies in the hosted project after applying migrations. Client-side Zod validation is not an abuse-control boundary; add server-verified throttling/CAPTCHA before exposing forms to substantial public traffic.

## Build & Deploy

### Build for Production
```bash
npm run build
```

Outputs optimized build to `dist/`

Run `npm run lint` and `npm run build` before deployment. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting provider. These `VITE_` values are exposed to browsers; use only the publishable/anon key and never place a service-role key in a frontend environment variable.

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

✅ **Code Splitting** - Route-level lazy loading
✅ **Image Optimization** - Unsplash placeholders (replace with CDN)
✅ **Caching** - React Query default 5-minute stale time
✅ **Compression** - Hosting should serve compressed assets
✅ **CSS** - Tailwind removes unused styles

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
