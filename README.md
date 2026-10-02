# Immersive Developer Portfolio

A cinematic, responsive developer portfolio with a real-time Three.js hero and a local-first content studio.

## Routes

- `/` — public portfolio
- `/admin` — content editor with live browser persistence and JSON import/export

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
lib/                      Storage and infrastructure adapters
public/                   Static brand assets
```

Content flows in one direction: `data → provider → portfolio/admin`. Browser persistence is isolated in `lib/portfolio-storage.ts`, so a future CMS or API can replace it without rewriting the UI.

## Local development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Content workflow

1. Open `/admin`.
2. Edit profile, projects, experience, education and skills.
3. Preview the portfolio in another tab.
4. Export `portfolio-content.json` as a portable backup.

The current studio intentionally has no authentication or server storage. Drafts live only in the current browser. This keeps hosting simple and free of backend maintenance. A Git-based CMS can later replace the storage adapter while preserving the rest of the application.
