# Project rules

- Framework is TanStack Start (file routes in `src/routes/`, root shell/head in `src/routes/__root.tsx`); never reintroduce react-router-dom, index.html or main.tsx — the deploy pipeline is TanStack-only.
- Legacy components import routing helpers from `@/lib/router-compat` (react-router-style API over TanStack Router) so existing call sites keep working; new code may use `@tanstack/react-router` directly.
- Per-page title/description/canonical/robots are server-rendered via route `head()` using `src/lib/seo.ts` (`staticHead`/`pageHead`); `SEOHead` only acts as client fallback when a route has no head — keeps tags in the HTML crawlers read.
- App-internal backend logic runs as server functions in `src/lib/<name>.functions.ts`, with the ported handler bodies in `src/lib/edge/<name>.server.ts`; call them from the client through `invokeServer()` which preserves the `{ data, error }` shape.
- Server-function auth: `attachSupabaseAuth` (functionMiddleware in `src/start.ts`) attaches the user's Supabase token; each handler verifies the caller itself — keep both.
- Read `process.env[...]` only inside handlers, never at module scope (Workers inject env per request).
- Supabase edge functions still used by DB triggers/cron (`forward-order-to-webshop`, `keep-alive`) or with unknown external callers (`sitemap`, `send-login-credentials`) stay on Supabase because their URLs are load-bearing.
- Reseller custom domains are detected in `src/routes/index.tsx` `beforeLoad` (server via forwarded host, client via window) and redirected to `/af/kund/login`.
- Design tokens live in `src/styles.css` (Tailwind v4, HSL channel variables wrapped by `@theme inline`); there is no tailwind.config.ts.
- tsconfig is strict; fix type errors at the call site, never with @ts-nocheck/@ts-ignore or by loosening tsconfig.
