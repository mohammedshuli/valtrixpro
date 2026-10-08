# Pre-Hosting Readiness Report

## Verdict

**Not ready for a public production launch yet.** The current worktree passes lint, production build, and production dependency audit, and route-level splitting has reduced the main JavaScript chunk. The admin inquiry workflow is still not usable, public-form abuse controls are absent, and hosted Supabase, domain, privacy, backup, and end-to-end behavior remain unverified. Do not launch until the remaining production gates below are completed.

This is a static repository audit plus local build, lint, and npm audit checks. I could not verify live Supabase settings, deployed migrations, production environment variables, backups, domain ownership, or real-browser form submissions.

## Completed Locally

- The lockfile now resolves the router to a release with no production audit findings.
- Migration 004 removes temporary public inquiry-read policies and checks `role = 'admin'` in `is_admin()`.
- Inquiry inserts no longer request returned rows, and Fresh/private-chef field mappings are preserved.
- Current lint passes and the production build succeeds.
- Route-level lazy loading reduced the main JS chunk from about 1,023 kB to 488 kB (142 kB gzip).
- `.env.example` is present and contains placeholders only; README setup and security guidance were corrected.

## P0: Resolve Before Public Traffic

1. **Verify hosted RLS and admin authorization.** The initial schema migration contains permissive policies that later migrations replace. Apply migrations 001 through 004 in order, inspect effective `pg_policies`, and test anonymous inserts, protected inquiry reads, and denial for authenticated non-admin and guest-role users in the hosted project. Do not launch with only migration 001 applied. See [001_create_schema.sql](supabase/migrations/001_create_schema.sql#L222), [003_fix_admin_rls.sql](supabase/migrations/003_fix_admin_rls.sql#L24), and [004_harden_inquiry_access.sql](supabase/migrations/004_harden_inquiry_access.sql).

2. **Protect public inquiry inserts from abuse.** Anonymous users can insert into inquiry tables under unconditional `WITH CHECK (true)` policies. Client-side Zod validation does not protect the database from scripted requests or spam. Add server-side throttling and abuse controls (for example, a CAPTCHA verified by an Edge Function), and enforce sensible constraints/limits at the database boundary. See [003_fix_admin_rls.sql](supabase/migrations/003_fix_admin_rls.sql#L108).

## P1: Required Product and Release Work

3. **Finish or remove the advertised admin workflows.** The inquiries, content, media, and analytics routes currently show explanatory text and inert buttons. Inquiry handling is the critical business workflow: implement list/detail/status updates first, or remove the promise/navigation and arrange a separate monitored process for incoming submissions. See [AdminInquiriesPage.tsx](src/pages/admin/AdminInquiriesPage.tsx#L8), [AdminContentPage.tsx](src/pages/admin/AdminContentPage.tsx#L8), [AdminMediaPage.tsx](src/pages/admin/AdminMediaPage.tsx#L8), and [AdminAnalyticsPage.tsx](src/pages/admin/AdminAnalyticsPage.tsx#L8).

4. **Add automated tests and a CI release gate.** There are no test/spec files, no test script in `package.json`, and no GitHub Actions workflow. Add coverage for inquiry mapping and errors, course registration, admin sign-in and denial paths, and direct loading of nested routes. CI should run install from lockfile, lint, tests, and production build on every proposed release.

5. **Configure production environment and admin access.** Configure the actual Supabase URL and publishable/anon key in the hosting environment. Disable public sign-ups if unnecessary, provision only intended admin accounts, and replace the seeded admin row if it is not intentional. Never put a service-role key in a `VITE_` variable. See [supabase.ts](src/lib/supabase.ts#L3) and [README.md](README.md).

## P2: Complete Before or Shortly After Launch

6. **Replace deployment-specific SEO URLs and supply the social image.** The canonical URL and Open Graph URLs point at a Vercel preview-style hostname, and the configured `/og-image.jpg` path does not resolve to an asset. Set the final canonical and social URLs, add a real share image, and verify the resulting links from the production domain. See [index.html](index.html#L14).

7. **Add hosting security headers and confirm SPA behavior.** `vercel.json` only configures the SPA rewrite. Configure and verify appropriate security headers (including a considered CSP, HSTS, and MIME/content-sniffing protections) at the host, and smoke-test direct navigation and refresh on every nested route, including `/admin/login` and `/packages/:packageId`.

8. **Set privacy and operational procedures for collected personal data.** Forms collect names, email addresses, phone numbers, event and delivery locations, dates, and dietary requirements. Publish an accurate privacy notice, define retention/deletion and access procedures, review applicable local data-protection requirements, configure database backups, and test a restore. Decide how staff receive timely alerts for new inquiries; database storage alone does not guarantee a response.

## Checks Run (Current Worktree)

- `npm run lint`: **passed**.
- `npm run build`: **passed**; route-level chunks emit successfully, with the largest shared main chunk about 488 kB (142 kB gzip).
- `npm audit --omit=dev`: **passed**, zero vulnerabilities.
- Production Supabase, admin/guest RLS, live submissions, domain metadata, and host security settings remain unverified.

## Launch Gate

- [x] Production dependency audit, lint, and local production build pass.
- [ ] Tests and required checks pass in CI.
- [ ] Production Supabase has all migrations applied in order; effective RLS policies and admin/guest access tests pass.
- [ ] Production environment variables and domain/SEO metadata are correct.
- [ ] Public inquiry flows have been tested end to end, including error states and abuse controls.
- [ ] Required admin workflow is implemented and usable by the operators who will handle incoming inquiries.
- [ ] Backups, restore, privacy/retention, and inquiry notification procedures are confirmed.
- [ ] Production smoke test passes on desktop and mobile, including direct route loads and refresh.