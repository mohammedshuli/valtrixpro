# Pre-Hosting Readiness Report

**Target launch date:** 1 November 2026
**Assessment date:** 26 October 2026
**Current verdict:** The application code has been improved, but **do not send production traffic until the required hosted Supabase and deployment checks below are complete**. Code changes in this repository do not apply migrations or deploy Edge Functions to the hosted project.

## Completed in the repository

- Replaced homepage and service-grid remote imagery with bundled project assets. Fixed a homepage image reference that pointed into the source tree and would fail after a production build.
- Replaced gallery fallback images with bundled assets, fixed gallery reads to use the schema's `image_path`, added active-image filtering, surfaced load errors, and provisioned a public read-only gallery bucket.
- Added Valtrix Studio and Equipment Rental to the service cards, header menu, and footer. Their existing public routes remain `/valtrix-studio` and `/equipment-rental`.
- Implemented an admin inquiry workflow: paginated category views, inquiry details, mail links, status updates, explicit query errors, and accurate all-record pending counts.
- Removed nonfunctional admin content/media/analytics controls from the navigation. Their direct routes now clearly say those tools are not included in this release.
- Added the `submit-inquiry` Supabase Edge Function with server-side validation, bounded request bodies, status assignment, and rate limits of 5 submissions per IP and 3 per email per 15-minute window.
- Added migration 005 to revoke direct browser-role INSERT privileges on inquiry tables and to keep rate-limit data in a private schema. The service-role key is only used by the Edge Function.
- Updated admin authorization checks to require the `admin` role and show Supabase verification errors instead of silently signing out. Disabled sign-ups in the local Supabase configuration.
- Added Vercel security headers, a CSP, a valid local favicon, and removed stale preview-domain canonical/Open Graph URL/image values.
- Upgraded Zod to 4.6.7, added regression tests for browser and server inquiry validation, and added a GitHub Actions workflow.

## Local verification

- `npm run build`: **passed** (TypeScript and production bundle); built favicon asset verified.
- `npm run lint`: **passed**.
- `npm test`: **passed** (9 tests across browser schemas and server inquiry validation).
- `npm audit`: **passed**, zero vulnerabilities across production and development dependencies.
- Production preview direct-route smoke test: **passed** for `/`, `/services`, `/valtrix-studio`, `/equipment-rental`, `/gallery`, `/admin/login`, `/admin`, `/packages/demo`, and `/menu/demo` (all returned the SPA entry).
- `git diff --check` and Vercel/package JSON parsing: **passed**.
- Supabase CLI and Deno are not installed in this workspace, so the SQL migration and Edge Function have not been applied or deployed here.
- No live Supabase, hosting, email delivery, backup, domain, or browser end-to-end test was possible.

## Required before 1 November 2026

### 1. Deploy and verify Supabase changes

- Confirm the target Supabase project is the intended project for the production site.
- Apply migrations `001` through `005` in order, using the Supabase CLI so migration history is recorded.
- Deploy `supabase/functions/submit-inquiry` and confirm its Supabase URL and service-role secret are available to the function runtime. **Never expose the service-role key in frontend variables or source code.**
- Disable public sign-ups in the hosted Auth settings; provision only named admin users and ensure their `admins` rows have `role = 'admin'`.
- Verify effective `pg_policies` and grants: anon/authenticated roles must not directly insert or read inquiries; intended admins must be able to read and update them; guest/non-admin users must be denied.
- Submit each public form against the hosted project. Verify valid rows receive `pending`, malformed/oversized requests are rejected, the rate limit returns 429, and failures are visible to users.

### 2. Configure the real site and verify deployment

- Set production `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting provider. Use only the publishable/anon key in the browser.
- Set the final domain and add the matching canonical URL, Open Graph URL, and a real share image. These were intentionally removed rather than leaving preview URLs in production metadata.
- Deploy and test direct loads and refreshes for `/`, `/services`, `/valtrix-studio`, `/equipment-rental`, `/admin/login`, `/admin`, and a nested package/menu route.
- Verify CSP and other response headers on the deployed host. Check the browser console for blocked fonts, Supabase calls, images, or routes; the current CSP permits Google Fonts, Supabase, local assets, and legacy Unsplash menu/gallery images.
- Test public forms, admin login/denial, inquiry pagination/details/status updates, error states, and responsive layout in desktop and mobile browsers.

### 3. Confirm operational and privacy readiness

- Publish an accurate privacy notice and confirm lawful handling of contact details, locations, event dates, and dietary information.
- Define inquiry retention/deletion and staff access procedures; confirm who monitors new inquiries and how quickly they respond. Email notifications are not implemented.
- Configure database backups and test restoring them before launch.
- Confirm the current admin dashboard is sufficient for operations. Content editing, media uploads, analytics, payments, and automated inquiry email are not included in this release.

## Launch gate

- [x] Local production build passes.
- [x] Full dependency audit passes with zero vulnerabilities.
- [x] Public inquiry write path, status workflow, and rate-limiting code added.
- [x] Studio/Equipment Rental navigation and bundled homepage/gallery/service imagery corrected.
- [x] Final lint, test, build, and production audit pass on the current change set.
- [ ] Hosted migrations 001–005 and the Edge Function deployed and verified.
- [ ] Production Auth, admin allow-list/roles, and effective RLS/grants tested.
- [ ] Production environment, domain, metadata, CSP, and routes verified.
- [ ] End-to-end form and admin workflows tested against hosted Supabase.
- [ ] Privacy, inquiry monitoring, backup, and restore procedures confirmed.
