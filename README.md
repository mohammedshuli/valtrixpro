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
- Node.js 20.19+ (or 22.12+)
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

#### Using the Supabase CLI
```bash
npm install -g supabase
supabase link --project-ref your-project-id
supabase db push
```

For manual setup, execute migrations `001` through `005` in order in the Supabase SQL Editor. Do not launch before migration `005`; it revokes direct public inquiry-table writes and installs the private rate-limit store.

Deploy the public inquiry function after applying the migrations:

```bash
supabase functions deploy submit-inquiry
```

The function uses Supabase's server-side `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment values. Confirm they are available to the Edge Function in the Supabase project settings. Never put the service-role key in `.env.local`, a `VITE_` variable, or browser code.

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

### Primary Public Routes
- `/` - Homepage
- `/about` and `/services` - Brand overview and service directory
- `/catering`, `/corporate-events`, `/catering-partnerships`
- `/private-chef-experiences`, `/chef-consultation`, `/culinary-experiences`
- `/valtrix-fresh`, `/valtrix-studio`, `/equipment-rental`
- `/packages-menu`, `/packages/:packageId`, `/menu/:foodId`
- `/gallery` and `/contact`

### Admin Dashboard
Access at `/admin/login`. Admins can review paginated inquiries, inspect submitted details, and update inquiry status. Content editing, media uploads, and analytics are not part of this release and are deliberately not shown in the admin navigation.

## Forms & Validation

All forms use **react-hook-form** + **zod** validation:

### Public Inquiry Forms:
1. **Catering Inquiry** - Event details, guest count, budget
2. **Corporate Event** - Company info, event type, requirements
3. **Meal Prep Inquiry** - Meal preferences, delivery frequency
4. **Fresh Order Inquiry** - Product and delivery details
5. **Consultation Request** - Consultation type, availability
6. **Private Chef Inquiry** - Event, guest count, and location
7. **Masterclass Registration** - Course selection, experience level
8. **General Contact** - Message submission

All implemented public inquiry forms:
- ✅ Client-side validation with zod
- ✅ Real-time error feedback
- ✅ Success/error states
- ✅ Auto-clear on success
- ✅ Submit through the server-validated `submit-inquiry` Edge Function
- ✅ Server-side payload limits and per-IP/per-email rate limits
- ✅ Direct anon/authenticated INSERT access to inquiry tables revoked by migration `005`

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

RLS policies are defined by the ordered migrations. Public inquiry writes go through the Edge Function; the browser roles cannot insert directly into inquiry tables. Inquiry reads and status changes require an authenticated admin. Apply and verify every migration in the hosted project before launch. The function enforces payload validation and rate limits; monitor abuse and add a CAPTCHA if production traffic shows it is needed.

## Build & Deploy

### Build for Production
```bash
npm run build
```

Outputs optimized build to `dist/`

Run `npm run lint`, `npm test`, `npm run build`, and `npm audit` before deployment. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting provider. These `VITE_` values are exposed to browsers; use only the publishable/anon key and never place a service-role key in a frontend environment variable. Set the final production domain before adding canonical and social-share URLs.

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
npm test          # Run inquiry validation regression tests
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Enforce code standards
- **Tailwind** - Utility classes only
- **Naming** - camelCase for functions, PascalCase for components

## Supabase RLS Policies

**Configured for:**
- ✅ Public inquiry submissions through the rate-limited Edge Function
- ✅ Browser INSERT privileges on inquiry tables revoked by migration 005
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

- Admin content editing, media uploads, and analytics are not implemented
- Payment processing not integrated (requires Stripe/Paystack)
- Inquiry email notifications not configured; provide an operations monitoring procedure
- Image optimization CDN not configured
- Multi-language support not implemented
- Mobile app not included
- Final domain-specific canonical and Open Graph URLs require the production domain and share image

## Troubleshooting

### Supabase Connection Issues
```
Error: Supabase environment variables not configured
```
→ Check `.env.local` has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### Form Submissions Not Working
→ Confirm migrations `001`–`005` are applied and `submit-inquiry` is deployed
→ Check Edge Function logs and its server-side Supabase environment
→ Confirm the browser has only the publishable/anon key and the project URL is correct

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
