# Immersive Developer Portfolio

A cinematic, responsive developer portfolio with a real-time Three.js hero and a password-protected content studio powered by Netlify Functions and Netlify Blobs.

## Routes

- `/` — public portfolio
- `/admin` — authenticated content editor with image uploads and JSON import/export

## Architecture

```text
app/                      Route composition and metadata
components/
  admin/                  Content Studio feature
  content/                Shared portfolio state provider
  portfolio/              Public portfolio presentation
  scene/                  Isolated WebGL / Three.js experience
  ui/                     Accessible interface primitives
data/                     Default editable content
domain/portfolio/         Framework-independent content types
lib/                      Client storage and infrastructure adapters
netlify/functions/        Public content, asset upload and admin session APIs
netlify/lib/              Function authentication and validation helpers
public/                   Static brand assets
```

Content flows in one direction: `Netlify Blobs → provider → portfolio/admin`. IndexedDB remains a development fallback and a local cache. Images are optimized in the browser, stored as separate blobs, and referenced by the shared portfolio document.

## Local development

```bash
npm run dev
```

## Production build

```bash
npm run build:netlify
```

## Netlify configuration

Add these variables in **Site configuration → Environment variables** before deploying:

```text
PORTFOLIO_ADMIN_PASSWORD=<a strong private password>
PORTFOLIO_SESSION_SECRET=<a long random secret>
```

Generate a suitable session secret locally with:

```bash
openssl rand -hex 32
```

Never prefix either value with `NEXT_PUBLIC_` and never commit real values to Git. After adding or changing the variables, trigger a new Netlify deploy.

## Content workflow

1. Open `/admin`.
2. Sign in with `PORTFOLIO_ADMIN_PASSWORD`.
3. Edit profile, projects, experience, education and skills.
4. Press **Saqlash** to publish the same content to every device.
5. Preview the portfolio in another tab and optionally export a JSON backup.

On the first deploy, the public site uses the default content until the admin saves once. If the previous version already contains edited content in this browser, opening the deployed admin on that same browser loads the local copy so it can be published to Netlify Blobs with one save.
