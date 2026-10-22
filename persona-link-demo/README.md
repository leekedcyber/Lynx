# Persona — Link-in-bio demo

A deployable Next.js demo for Vercel. It includes a landing page, email/password sign-up and login, a protected-by-RLS editing dashboard, and public profile URLs like `https://your-project.vercel.app/u/alex`.

## Important: this is a real app, not a static HTML mockup
Accounts and profiles are stored in Supabase, so they persist across devices and users. The Vercel deployment itself does not store user data. Set up Supabase before deploying.

## 1. Create the database/auth backend
1. Create a project at [Supabase](https://supabase.com/).
2. In Supabase, open **SQL Editor**, paste all of `supabase.sql`, and run it.
3. In **Project Settings → API** (or API Keys), copy the Project URL and the publishable/anon key.
4. In **Authentication → URL Configuration**, set the Site URL to your eventual Vercel URL. Add `http://localhost:3000/**` and your Vercel URL to Redirect URLs if needed.
5. For easiest testing, you can temporarily disable email confirmation under Authentication settings. For a public launch, keep email confirmation enabled and configure email delivery.

## 2. Run locally
1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and fill in the real Supabase URL and anon/publishable key.
3. In this folder run:
   ```bash
   npm install
   npm run dev
   ```
4. Open `http://localhost:3000`.

## 3. Deploy on Vercel
1. Upload/push this folder to a GitHub repository.
2. Import that repository at [Vercel](https://vercel.com/).
3. In Vercel → Project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy after adding the environment variables.
5. Add the final `https://your-project.vercel.app` address to Supabase Authentication URL Configuration.

## Features in this demo
- Account creation with email, password and a unique username.
- Log in / log out.
- Edit display name, bio and up to 10 links.
- Public profile route `/u/username`.
- Supabase row-level security so users can only edit their own profile.
- Responsive dark design.

## Notes / limitations
- The public profile URL uses `/u/username`, so it works on Vercel's free `vercel.app` subdomain without wildcard DNS. It does **not** create a true subdomain such as `username.vercel.app`; that requires additional domain/routing configuration.
- Usernames are checked for format and database uniqueness. If a username is already taken, Supabase will reject the profile insert.
- This is a starter demo, not a fully audited production service. Add rate limiting, stronger validation, account deletion, moderation/reporting, privacy policy and a proper email provider before public launch.
- Never put a Supabase service-role key in a `NEXT_PUBLIC_` variable or in browser code. Only the anon/publishable key belongs here.
