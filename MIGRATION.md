# Migration: Cloudflare Pages → Cloudflare Workers

Moving `dibster.dev` from the Cloudflare **Pages** project `personal-website` (static export,
`output: 'export'`) to a Cloudflare **Worker** named `dibster-dev` running Next.js via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

Based on:
- <https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/>
- <https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/>

---

## Facts

| Thing | Value |
|---|---|
| Cloudflare account | `DIBSTER` / `62fd0c293788a67fb7fb9b75fe19efeb` |
| Current Pages project | `personal-website` |
| Pages domains | `personal-website-217.pages.dev`, `dibster.dev` |
| Target Worker name | `dibster-dev` (must match `name` in `wrangler.jsonc`) |
| Target workers.dev host | `dibster-dev.<your-subdomain>.workers.dev` |
| GitHub repo | `DEV-DIBSTER/Personal-Website` |
| Production branch | `master` |
| Migration branch | `migrate/opennext-workers-typescript` |

### Ordering rule

Two constraints drive the whole sequence:

1. A hostname cannot be attached to a Pages project and a Worker at the same time. Cloudflare
   refuses to create a Worker Custom Domain **on a hostname that already has a CNAME record**, and
   the Pages custom domain owns exactly that record. Pages must release `dibster.dev` first.
2. Pages auto-deploy is disabled **before** the merge, so merging does not kick off a Pages build of
   a tree that no longer produces `out/`.

Disabling the Pages Git integration does **not** take the site down — Pages keeps serving its last
successful deployment. That is the rollback.

---

## Phase 0 — Pre-flight (read-only)

```bash
# Confirm tooling and identity
npx wrangler --version
npx wrangler whoami                      # expect account DIBSTER / 62fd0c29...
gh --version && gh auth status           # expect DEV-DIBSTER, scope 'repo'

# Snapshot current state for rollback
npx wrangler pages project list
npx wrangler pages deployment list --project-name personal-website | head -20
dig +short dibster.dev
curl -sI https://dibster.dev | head -20
```

Record the current live Pages deployment ID from the deployment list. That is what you roll back to.

---

## Phase 1 — Repo changes on the migration branch

Three edits. None of them touch the domain yet.

### 1.1 — `wrangler.jsonc`: drop the unused self-reference binding

`WORKER_SELF_REFERENCE` is only required for the R2 incremental cache, the D1 tag cache, or Pages
Router `res.revalidate`. This project uses `staticAssetsIncrementalCache`, which OpenNext documents
as not needing it. Leaving it in risks a first-deploy failure, because it is a service binding
pointing at a Worker that does not exist yet.

Remove:

```jsonc
"services": [
  {
    "binding": "WORKER_SELF_REFERENCE",
    "service": "dibster-dev"
  }
],
```

### 1.2 — `wrangler.jsonc`: pin `workers_dev` and `preview_urls`

Both default to enabled, but the dashboard and the config file can drift — toggling either in the
dashboard without matching the Wrangler file silently reverts on the next deploy. Pin them:

```jsonc
"workers_dev": true,
"preview_urls": true,
```

Resulting `wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "dibster-dev",
  "compatibility_date": "2026-08-05",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "images": {
    "binding": "IMAGES"
  },
  "workers_dev": true,
  "preview_urls": true,
  "observability": {
    "enabled": true
  }
}
```

Deliberately **not** set:

- `assets.not_found_handling` — leaving it unset lets unmatched requests fall through to the Worker,
  which is what OpenNext's `/_not-found` route needs. Setting `single-page-application` or
  `404-page` would break it.
- `assets.run_worker_first` — Pages ran Functions before assets; Workers serves assets first. That
  reversal is only a problem if an asset path shadows a route, and nothing here does: assets are
  `BUILD_ID`, `favicon.ico`, `pgp/`, `_next/`, `_headers`; routes are `/`, `/blog`, `/blog/[id]`,
  `/certifications`, `/contact`, `/projects`, `/sitemap`. No overlap.
- `.assetsignore` — `.open-next/assets` contains no `node_modules` or stray files.
- `routes` / `custom_domain` — added later, in Phase 6, after Pages releases the hostname.

### 1.3 — `README.md`: fix the Workers Builds section

The current text says "Build command: leave empty / Deploy command: `npm run deploy`". That works
for production but breaks preview branches, because the non-production default is
`npx wrangler versions upload`, which would run with no build output. Replace lines 39–42 with:

```markdown
If you previously deployed via Cloudflare Pages, switch the Git integration to **Workers Builds**:

- **Build command:** `npx opennextjs-cloudflare build`
- **Deploy command:** `npx wrangler deploy`
- **Non-production branch deploy command:** `npx wrangler versions upload`
- **Build variable:** `NEXT_PUBLIC_SITE_URL=https://dibster.dev`
```

### 1.4 — Commit and push

```bash
git checkout migrate/opennext-workers-typescript
git add wrangler.jsonc README.md MIGRATION.md
git commit -m "chore(cloudflare): finalize workers config for pages migration"
git push -u origin migrate/opennext-workers-typescript
```

---

## Phase 2 — Verify the build locally

```bash
npm ci
npx opennextjs-cloudflare build

# Sanity-check the generated assets
ls .open-next/assets

# CRITICAL: confirm the sitemap baked the real origin, not localhost.
# NEXT_PUBLIC_SITE_URL is read at BUILD time and comes from .env, which is gitignored.
grep -o 'https\?://[^<]*' .open-next/cache/*/sitemap.xml.cache | head -5
# expect https://dibster.dev/... — if you see localhost:3000, .env is missing

# Run it in the real workerd runtime on http://localhost:8787
npm run preview
```

Note the port change: `wrangler pages dev` was 8788, `wrangler dev` is 8787.

---

## Phase 3 — First deploy from the CLI, test on workers.dev

This creates the Worker. It is completely safe: `dibster.dev` is still served by Pages, and this
only publishes to the `workers.dev` hostname.

```bash
npm run deploy          # opennextjs-cloudflare build && opennextjs-cloudflare deploy

npx wrangler deployments list --name dibster-dev
```

Test the workers.dev URL end to end before going any further:

```bash
WORKER_URL="https://dibster-dev.<your-subdomain>.workers.dev"

curl -sI "$WORKER_URL/"                    | head -20
curl -s  "$WORKER_URL/sitemap.xml"         | head -20   # must contain https://dibster.dev
curl -sI "$WORKER_URL/_next/static/"       | grep -i cache-control   # immutable, from public/_headers
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/blog"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/blog/same-node-equal-access"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/blog/building-modern-web-apps"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/certifications"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/contact"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/projects"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/sitemap"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/pgp/dibster@danbot.host.asc"
curl -so /dev/null -w '%{http_code}\n' "$WORKER_URL/this-does-not-exist"   # expect 404, not 200
```

In a browser, check the things curl cannot: navigation (this is where the redirect loop lived —
see commit `30403a5`), dark/light theme toggle, and the mobile sheet nav.

Stream logs while poking at it:

```bash
npx wrangler tail dibster-dev --format pretty
```

---

## Phase 4 — Disable Pages auto-deploy (dashboard)

Do this **before** merging, so the merge does not trigger a Pages build of a tree that no longer
emits `out/`. There is no `wrangler pages` subcommand for the Git integration — dashboard only.

> Workers & Pages → **personal-website** → Settings → Builds & deployments →
> **Disconnect** the Git repository (or pause automatic deployments)

Do **not** delete the project. It keeps serving the live site until Phase 6, and it is the rollback.

---

## Phase 5 — Merge to master, then connect Workers Builds

### 5.1 — Open and merge the PR

```bash
gh pr create \
  --base master \
  --head migrate/opennext-workers-typescript \
  --title "Migrate to OpenNext Cloudflare Workers and TypeScript" \
  --body "Replaces the static-export Cloudflare Pages deployment with a Cloudflare Worker running Next.js via @opennextjs/cloudflare. See MIGRATION.md."

gh pr view --web          # review the diff
gh pr merge --merge       # preserves the migration commits
git checkout master && git pull
```

### 5.2 — Connect Workers Builds (dashboard)

Also dashboard-only; Wrangler has no command to create a Git integration.

> Workers & Pages → **dibster-dev** → Settings → Builds → **Connect** →
> GitHub → `DEV-DIBSTER/Personal-Website`

Settings:

| Setting | Value |
|---|---|
| Production branch | `master` |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Root directory | *(empty)* |

**Build variables and secrets** — under *Build*, not runtime *Variables & Secrets*:

```
NEXT_PUBLIC_SITE_URL = https://dibster.dev
```

This one matters more than it looks. `NEXT_PUBLIC_*` is inlined by Next at build time and `.env` is
gitignored, so without it the CI build ships a `sitemap.xml` and a `metadataBase` full of
`http://localhost:3000`. A runtime variable will **not** work — it has to be a build variable.

No Node version pin is needed; the build image defaults to Node 24.18.0. `package-lock.json` is now
committed, so CI gets a reproducible `npm ci`.

### 5.3 — Trigger and verify a CI build

```bash
git commit --allow-empty -m "chore: trigger first workers build"
git push
```

Watch it in the dashboard, then re-run the Phase 3 curl checks against the workers.dev URL to
confirm the CI build matches what you deployed by hand — especially the sitemap origin.

---

## Phase 6 — Domain cutover

The only step with user-visible downtime. Expect seconds to a couple of minutes. Do it during low
traffic.

### 6.1 — Release `dibster.dev` from Pages

No Wrangler command exists for Pages custom domains. Use the dashboard:

> Workers & Pages → **personal-website** → Custom domains → remove `dibster.dev`

Or the REST API, with a token that has *Pages → Edit*:

```bash
export CLOUDFLARE_API_TOKEN="<token with Pages:Edit>"
export ACCOUNT_ID="62fd0c293788a67fb7fb9b75fe19efeb"

curl -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/personal-website/domains/dibster.dev" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Confirm the CNAME is actually gone before continuing — the Worker Custom Domain will be rejected if
a CNAME still exists on the hostname:

```bash
dig +short dibster.dev
npx wrangler pages project list      # dibster.dev should no longer be listed
```

If a stale record lingers, delete it under the `dibster.dev` zone → DNS.

### 6.2 — Attach `dibster.dev` to the Worker

Add to `wrangler.jsonc`:

```jsonc
"routes": [
  { "pattern": "dibster.dev", "custom_domain": true }
]
```

Then deploy. `wrangler deploy` creates the DNS record and issues the certificate for you:

```bash
git add wrangler.jsonc
git commit -m "feat(cloudflare): attach dibster.dev custom domain to worker"
git push                    # Workers Builds deploys and provisions the domain
```

Or, to cut over immediately without waiting on CI:

```bash
npm run deploy
```

Certificate issuance can take a few minutes. Expect TLS errors in that window.

### 6.3 — Verify production

```bash
dig +short dibster.dev
curl -sI https://dibster.dev | head -20
curl -s  https://dibster.dev/sitemap.xml | head -20
for p in / /blog /blog/same-node-equal-access /certifications /contact /projects /sitemap; do
  printf '%s -> ' "$p"
  curl -so /dev/null -w '%{http_code}\n' "https://dibster.dev$p"
done
curl -so /dev/null -w '%{http_code}\n' https://dibster.dev/this-does-not-exist   # expect 404
```

Then check the zone for leftovers pointing at Pages: any Redirect Rules, Transform Rules, or a
`www.dibster.dev` record still aimed at `personal-website-217.pages.dev`.

```bash
npx wrangler tail dibster-dev --format pretty
```

---

## Rollback

The Pages project is untouched through the entire plan, so rollback is just reversing 6.2 and 6.1:

1. Worker → Settings → Domains & Routes → remove the `dibster.dev` Custom Domain
   (and drop the `routes` block from `wrangler.jsonc`).
2. Pages project `personal-website` → Custom domains → re-add `dibster.dev`.
3. If needed, reconnect the Pages Git integration.

Note that deleting a Worker Custom Domain does **not** delete its Advanced Certificate. Clean that
up manually so it does not confuse a later certificate audit.

Within Workers, you also now have rollbacks that Pages did not offer at version granularity:

```bash
npx wrangler deployments list --name dibster-dev
npx wrangler rollback --name dibster-dev
```

---

## Cleanup (only once you are confident — days, not minutes)

```bash
npx wrangler pages project delete personal-website
```

Optional afterwards: delete `MIGRATION.md`, and drop the "If you previously deployed via Cloudflare
Pages" paragraph from `README.md`.

---

## Behavior differences to expect

**`public/_headers` only applies to responses from the asset server.** Custom headers are never
applied to responses generated by Worker code, even when the request URL matches a rule. The current
`/_next/static/*` immutable rule is fine, because those are genuine static assets. Anything added
there for an HTML route will silently do nothing — set those headers in Worker code instead.
`_redirects` works, with the same caveat.

**ISR and on-demand revalidation do not work.** `staticAssetsIncrementalCache` is read-only:
no time-based ISR, no `revalidateTag`, no `revalidatePath`. Irrelevant today, since every route is
Static or SSG, but it is a wall the moment a revalidating route is added. The fix at that point is
`r2IncrementalCache` with an R2 bucket bound as `NEXT_INC_CACHE_R2_BUCKET` — and *that* is when
`WORKER_SELF_REFERENCE` gets added back.

**`next/image` is currently inert.** Both posts have `image: ""` and the render is guarded by
`post.image ?`. The first time a post gets a real image: remote URLs need `images.remotePatterns` in
`next.config.ts`, and optimization runs through the `IMAGES` binding, which is billed via Cloudflare
Images. Only PNG, JPEG, WEBP, AVIF, GIF and SVG are transformed; anything else passes through
unoptimized.

**Preview builds carry production URLs.** Workers does not support different bindings for production
versus non-production builds, so `NEXT_PUBLIC_SITE_URL=https://dibster.dev` applies to preview
branches too. Preview deployments will emit a sitemap and `metadataBase` pointing at production.
Harmless, but do not be surprised. Wrangler Environments are the workaround if it ever matters.

**Lost relative to Pages:**
- *Early Hints* — Pages had it on by default; on Workers it requires a zone-level setting.
- *Custom branch aliases* — Pages gave `<branch>.personal-website-217.pages.dev`. Not supported yet
  on Workers; the nearest equivalent is `npx wrangler versions upload --preview-alias <name>`.
- *Branch deploy controls* are less configurable than Pages'.

**Gained relative to Pages:** Workers Logs, Logpush, Tail Workers, source maps (`observability` is
already enabled in `wrangler.jsonc`), gradual deployments, Cron Triggers, Durable Objects, and the
`IMAGES` binding.

---

## Quick checklist

- [ ] Phase 0 — pre-flight snapshot taken, live Pages deployment ID recorded
- [ ] 1.1 — `WORKER_SELF_REFERENCE` removed
- [ ] 1.2 — `workers_dev` + `preview_urls` pinned
- [ ] 1.3 — README build commands corrected
- [ ] 1.4 — committed and pushed
- [ ] Phase 2 — local build clean, sitemap shows `https://dibster.dev`
- [ ] Phase 3 — `npm run deploy`, all routes verified on workers.dev, nav has no redirect loop
- [ ] Phase 4 — Pages Git integration disconnected (project kept)
- [ ] 5.1 — PR merged to `master`
- [ ] 5.2 — Workers Builds connected, build/deploy commands set, `NEXT_PUBLIC_SITE_URL` set as a **build** variable
- [ ] 5.3 — CI build verified on workers.dev
- [ ] 6.1 — `dibster.dev` removed from Pages, CNAME confirmed gone
- [ ] 6.2 — `routes` + `custom_domain` added, deployed, certificate issued
- [ ] 6.3 — production verified, zone checked for stale rules and `www` records
- [ ] Cleanup — Pages project deleted only after a confident soak period
