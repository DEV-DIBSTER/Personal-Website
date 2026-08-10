# DIBSTER Portfolio

Personal portfolio site built with Next.js, Tailwind CSS, and shadcn/ui. Deployed on **Cloudflare Workers** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js local development (Turbopack) |
| `npm run build` | Next.js production build |
| `npm run preview` | Build with OpenNext and preview in the Workers runtime |
| `npm run deploy` | Build with OpenNext and deploy to Cloudflare Workers |
| `npm run upload` | Build and upload a new Worker version (no traffic shift) |
| `npm run cf-typegen` | Generate `cloudflare-env.d.ts` from `wrangler.jsonc` |
| `npm run lint` | Run ESLint |

## Environment

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://dibster.dev`) for absolute metadata and sitemap URLs.

- Local: `.env` or `.env.local` (gitignored)
- Preview/deploy: Cloudflare Workers dashboard / Workers Builds env vars

`.dev.vars` sets `NEXTJS_ENV=development` so Wrangler loads the correct Next.js env files.

## Cloudflare Workers

This project uses Workers (not Pages). Worker name: `dibster-dev`.

If you previously deployed via Cloudflare Pages, switch the Git integration to **Workers Builds**:

- **Build command:** `npx opennextjs-cloudflare build`
- **Deploy command:** `npx wrangler deploy`
- **Non-production branch deploy command:** `npx wrangler versions upload`
- **Build variable:** `NEXT_PUBLIC_SITE_URL=https://dibster.dev`

`NEXT_PUBLIC_SITE_URL` must be a *build* variable, not a runtime one — Next inlines `NEXT_PUBLIC_*`
at build time. See [MIGRATION.md](./MIGRATION.md).

Or deploy from your machine:

```bash
npm run deploy
```

## Blog

Markdown posts live in `src/app/blog/posts/`. See [BLOG_README.md](./BLOG_README.md).
