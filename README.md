# Rowe Law Office, LLC

A responsive, fully static Astro + Tailwind CSS website prepared for Cloudflare Pages. Includes the homepage, About page, all eight Wisconsin practice pages, the Legal Services and Mediation hubs, dual-path Contact & Intake, and a custom 404 page. Shared components provide navigation, SEO, footer disclaimers, photography placeholders, buttons, and independent Turnstile widgets.

## Development and build

Use Node 24 (minimum supported version: 22.12.0).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Development opens a local Astro server. `npm run check` validates TypeScript and Astro components separately. `npm run build` runs exactly `astro build` and writes production HTML, CSS, JavaScript, and public assets to `dist/`. The preview command serves that build locally. If Astro telemetry cannot access your local configuration directory, prefix commands with `ASTRO_TELEMETRY_DISABLED=1`.

`astro.config.mjs` sets `output: 'static'`, `trailingSlash: 'never'`, and `build.format: 'file'`. Cloudflare Pages serves files such as `contact.html` at `/contact`; this matches the site's extensionless canonical URLs. No server adapter or client framework is required. Tailwind 4 loads the requested brand definitions in `tailwind.config.mjs` through `@config` in `src/styles/global.css`. Google Fonts load Playfair Display and Plus Jakarta Sans with `display=swap` and system fallbacks.

## Connect GitHub to Cloudflare Pages

1. Create a GitHub repository and commit this project's source, public assets, configuration, README, and `package-lock.json`. Do not commit `node_modules/`, `.astro/`, local `.env` files, or secret keys. Cloudflare builds `dist/` itself.
2. In the Cloudflare dashboard, open **Workers & Pages**, create a Pages application, and choose the option to connect/import a Git repository.
3. Authorize the GitHub account, select your repository, and choose its production branch (usually `main`). If the project is nested, set the root directory to the folder containing this `package.json`.
4. Configure the build:

   | Setting | Value |
   | --- | --- |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node environment variable | `NODE_VERSION=24` |

5. Set `PUBLIC_SITE_URL` to the final HTTPS production origin, such as your approved custom domain. Do not include a path. With no value, Pages builds can fall back to `CF_PAGES_URL`; local builds omit canonical/OpenGraph URLs rather than inventing a domain.
6. Save and deploy. Open the generated Pages URL and verify the homepage, `/contact`, `/legal-services`, the practice pages, `/mediation`, and the 404 page. Subsequent pushes to the production branch trigger new builds; other branches can generate previews.
7. Add your custom domain through the Pages project's custom-domain settings, then update `PUBLIC_SITE_URL` and redeploy if needed. Set preview and production environment variables separately when they should differ.

Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

### Security headers and redirects

`public/_headers` is copied to `dist/_headers` and includes:

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: document-domain=(), geolocation=(), microphone=(), camera=()
```

Hashed `/_astro/*` assets additionally receive immutable caching. The microphone/camera policy applies to this static website; external video services use their own permissions. These Pages rules apply to static responses; a separate intake backend must supply its own security and CORS headers.

`public/_redirects` supplies 301 aliases for `/intake` and `/consultation` to `/contact`, and `/virtual-mediation` to `/mediation`. Cloudflare's native HTML handling supplies extensionless routes; no catch-all SPA rewrite or blanket trailing-slash redirect is used. A local Astro preview does not implement Cloudflare-specific header and alias rules; verify them after deployment.

## Contact forms, Turnstile, and booking

The default contact page is an interactive **demo**: required fields and email validation work, confirmations clearly state that the inquiry was not sent, and no form data is transmitted. Unconfigured booking buttons show an availability message. JavaScript is required; submit buttons remain disabled when it is unavailable. No office contact details, calendar links, or intake backend have been invented.

Copy `.env.example` to `.env` for local configuration, or set these values in Cloudflare Pages build settings. Rebuild after changing them:

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_URL` | Production HTTPS origin for SEO URLs |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public widget key registered for your domain |
| `PUBLIC_LEGAL_INTAKE_ENDPOINT` | HTTPS POST endpoint for Wisconsin legal intake |
| `PUBLIC_MEDIATION_INTAKE_ENDPOINT` | HTTPS POST endpoint for neutral mediation intake |
| `PUBLIC_LEGAL_CALENDAR_URL` | Approved attorney consultation booking URL |
| `PUBLIC_MEDIATION_CALENDAR_URL` | Approved mediation booking URL |

An intake form becomes live only when both its endpoint and a real public Turnstile key are configured. Each form has its own verification token and widget action (`legal-intake` or `mediation-intake`); the API script loads once per page. Compact widgets are used where available width is below 300px. Tokens clear on expiration/error and reset after a submission attempt. Missing verification blocks submission. The script handles pending, success, rejected, and network-error states without claiming receipt until the endpoint returns success. Florida jurisdiction limits the dispute selector to Family Law.

**A widget alone is insufficient protection.** Supply an external secure intake service or independently deployed backend that:

- Accepts a multipart `POST` with the form field names in `src/pages/contact.astro`, including `intake_type` and `cf-turnstile-response`.
- Verifies the token using Cloudflare Siteverify and a **server-only** Turnstile secret. Checks the approved hostname and expected action. Never place a secret in a `PUBLIC_*` variable or source code.
- Validates and limits every field, enforces Wisconsin representation / Florida family-law restrictions, and handles conflict checking and data retention appropriately.
- Allows the intended website origin through CORS when cross-origin (including failure responses). The client sends no credentials/cookies. Applies appropriate rate limiting and secure storage.
- Returns a successful 2xx status only after verification and durable acceptance of the inquiry; returns a failure status otherwise. Avoid redirects to a generic success HTML page that could conceal a rejected submission.

No backend, notification email delivery, or calendar scheduling system is included in this static build. Keep the demo state until these services exist. Use Cloudflare test keys only on development/preview environments, never production. Official verification guidance: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

## Add Patrick Rowe's headshot

Place the approved headshot at:

```text
public/images/patrick-rowe-headshot.jpg
```

In `src/pages/about.astro`, replace the portrait `ImagePlaceholder` with an image using the actual image dimensions, for example:

```astro
<img
  src="/images/patrick-rowe-headshot.jpg"
  alt="Patrick Rowe, founder of Rowe Law Office, LLC"
  width="900"
  height="1200"
  class="aspect-[3/4] w-full object-cover"
  decoding="async"
/>
```

Adjust the dimensions to match the source file. Retain the existing caption, compress photography for the web, and use descriptive alt text. Replace other `ImagePlaceholder` instances with approved images as they become available; retain their aspect ratios to prevent layout shift. Replace `public/favicon.svg` with the final approved favicon. OpenGraph text defaults exist; add an image tag once an approved social image is supplied.

## Components and content

- `BaseLayout.astro`: typed `title`, `description`, and `canonicalPath`; shared SEO head, skip link, navigation, footer, and optional named head slot.
- `Navigation.astro`: desktop disclosure and mobile modal drawer with keyboard closure, focus restoration, and scroll management. Desktop begins at 1280px to accommodate the long labels.
- `LegalServiceLayout.astro`: breadcrumbs, consistent practice-page hero, and bottom contact CTA.
- `CTAButton.astro`: navigation links with primary, secondary, or outline styling and standard anchor attributes. Forms use real submit buttons.
- `ImagePlaceholder.astro`: typed square, portrait, or landscape placeholder with label/subtext/classes.
- `TurnstileWidget.astro`: optional siteKey/action/classes; inert placeholder until configured, typed shared client loader, independent instances.
- `Footer.astro`: complete firm/service links and the supplied mandatory disclaimer.

Legal and marketing descriptions follow the supplied brief; qualifications and official legal references are documented in `LEGAL_COPY_SOURCES.md`. Credential claims and by-appointment office hours should be confirmed against approved firm information before launch. Vaults and video conferencing described on service pages refer to the intended practice workflow; this website does not implement those systems.

## Validation

All 14 production pages build successfully. Astro component/type checks report zero errors, warnings, or hints. Earlier page checks covered widths 320, 375, 768, 1280, and 1440px, internal links, metadata, breadcrumbs, mobile navigation, and absence of horizontal overflow. The final contact checks cover responsive layout, required-field validation, isolated form states, demo confirmations, booking availability, and Florida dispute restrictions. Configured-build checks with simulated Cloudflare and intake APIs also confirmed one script load, two independent verification tokens, compact mobile widgets, expiration/error clearing, missing-verification blocking, duplicate-submit prevention, success/failure handling, and configured calendar links. All 13 unique internal navigation destinations resolved. Cloudflare headers/aliases and real intake delivery require verification in their deployment environments.
