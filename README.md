# Structra Innovations website

Next.js 16 (App Router) site with a three.js hero scene, GSAP scroll motion and a glass UI.

## Run

```sh
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Edit content

All business copy lives in `src/content/site.ts`. Anything still marked `[Founder input required]` shows up highlighted on the page until you replace it.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and robots |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email (optional) |
| `CONTACT_WEBHOOK_URL` | Where contact-form submissions are POSTed as JSON (for example an n8n webhook) |
| `CONTACT_WEBHOOK_SECRET` | Optional value sent as `x-webhook-secret` |
