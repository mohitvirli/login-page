# Login Page (Next.js + NextAuth)

This is a small demo Next.js application showcasing an authentication flow using NextAuth (credentials + OAuth providers) and a polished login UI built with Tailwind-like classes and custom styles.

<img width="2364" height="1806" alt="image" src="https://github.com/user-attachments/assets/999c198e-76f1-4bad-bc37-63ff254c52ca" />

### Key points
- Next.js 14+ app router (app/ directory).
- Authentication handled by NextAuth in `app/api/auth/[...nextauth]/route.ts`.
- A mock credentials provider is included for local testing (email: `test@gmail.com`, password: `password`).
- OAuth providers configured (Google, GitHub, Spotify) — these require environment variables / client IDs.
- Signup page is a placeholder and does not persist users.

### Contents
- `app/layout.tsx` — root layout, fonts, and global providers.
- `app/providers.tsx` — NextAuth SessionProvider wrapper.
- `app/page.tsx` — protected home page that redirects to `/login` when unauthenticated.
- `app/login/page.tsx` and `app/login/styles.css` — login form with social buttons and client-side validation.
- `app/signup/page.tsx` — placeholder signup page.
- `app/api/auth/[...nextauth]/route.ts` — NextAuth configuration and providers.

## Getting started

### Prerequisites
- Node.js 18+ (recommended) and npm/yarn/pnpm.

### Install

1. Install dependencies:
```
npm install
```
2. Create a `.env.local` in the project root with the following variables (only the ones you need):
```
   AUTH_SECRET=some-random-secret
   # OAuth providers (optional)
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GITHUB_CLIENT_ID=...
   GITHUB_CLIENT_SECRET=...
   SPOTIFY_CLIENT_ID=...
   SPOTIFY_CLIENT_SECRET=...
```

Notes
- The app includes a CredentialsProvider in NextAuth that uses a hard-coded mock user. This is intentionally simple for local testing; replace the authorize() logic with a real database lookup in production.
- The signup page is not implemented and will not create users. To test login, use the mock credentials above.
- NextAuth session strategy is set to `jwt` in the config (`route.ts`). If you want database-backed sessions, add a database adapter.
- Images from OAuth providers (Google, GitHub, Spotify) are allowed via `next.config.ts` domains.

## Usage

Start the dev server:
```
npm run dev
```
Open http://localhost:3000 in your browser. If not authenticated you'll be redirected to `/login`.

Testing credentials
- Email: test@gmail.com
- Password: password

Social logins
- Clicking the social provider buttons triggers NextAuth signIn for the respective provider. To use these, set the provider env vars and configure OAuth redirect URIs in each provider dashboard (e.g. http://localhost:3000/api/auth/callback/google).

Callback URLs (example for local dev):

   - Google:  http://localhost:3000/api/auth/callback/google
   - GitHub:  http://localhost:3000/api/auth/callback/github
   - Spotify: http://localhost:3000/api/auth/callback/spotify

If you run into issues with callbacks not matching, double-check the redirect URIs configured in each provider's developer console and ensure they exactly match the URLs used by NextAuth.

## Accessibility and UX notes
- Login form includes basic client-side validation and accessible labels and aria attributes for error messages.
- The password field has an accessible show/hide toggle.
