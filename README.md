# Challenge 01 — Insurance Plan Comparison Page

A responsive insurance comparison experience built with **Next.js (App Router) + TypeScript** and a separate **NestJS REST API**. The supplied plan data is served by NestJS and rendered by the Next.js server component.

## Architecture

- `apps/web`: Next.js frontend, responsive comparison UI, metadata and plan formatting.
- `apps/api`: NestJS API exposing plan data and a health endpoint.
- `GET /api/plans`: returns all three plans.
- `GET /api/plans/:name`: returns Bronze, Silver or Gold (case-insensitive).
- `GET /api/health`: health check.

## Requirements

- Node.js 20 or newer recommended.
- npm 10 or compatible workspace-aware npm.

## Run locally

From the repository root:

```bash
npm install
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:4000/api/plans
- Health: http://localhost:4000/api/health

The web app calls `http://localhost:4000/api` by default. To point to a deployed API, set `API_URL` for the web app (for example `https://your-api.example.com/api`). Configure `WEB_ORIGIN` for the NestJS CORS allowlist (comma-separated origins).

## Production build

```bash
npm run build
npm run start:api
npm run start:web
```

Set `PORT` for the API service and `API_URL` for the web service in your hosting environment. Deploy the API and frontend as separate services. Make sure the API's `WEB_ORIGIN` allows the frontend's production domain.

## Design notes

- The page compares monthly premium, annual limit, outpatient and inpatient limits, dental and maternity benefits, copay, and waiting period.
- `-1` is rendered as **Unlimited**, as defined in the challenge.
- Missing dental/maternity benefits are explicitly shown as not included.
- Best-in-category markers are derived from plan data. Silver is marked “Recommended” as a qualitative balance of premium and coverage, not as a mathematically proven optimal plan.
- Desktop uses a side-by-side comparison table. On mobile, plan cards stack vertically; the table is hidden to avoid horizontal scrolling.
- “Explore” links open an email draft as a demo CTA; replace `hello@example.com` with the real contact address or connect it to a quote flow before production.

## Suggested timeline (2–3 hours)

1. Requirements and data modeling — 20 minutes.
2. NestJS endpoint and Next.js page — 60–75 minutes.
3. Responsive styling and best-value indicators — 35–45 minutes.
4. Manual checks, build and deployment — 30–40 minutes.

## Deployment

Deploy `apps/api` as a Node service and `apps/web` as a Next.js service on a free-tier host that currently supports them. Set `API_URL` and `WEB_ORIGIN` to the deployed URLs. This repository has not been deployed; no live URL is claimed.

## Jenkins + PM2 deployment to `https://ihnonomiru.fun/`

This repository includes a `Jenkinsfile` and `ecosystem.config.cjs` for the existing VPS layout:

- Next.js: `127.0.0.1:13001`, proxied by Nginx to `https://ihnonomiru.fun/`.
- NestJS API: `127.0.0.1:4000`, intended for server-side requests from Next.js only.
- Runtime directory: `/var/www/ihnonomiru`.
- PM2 runs as the Linux user `jenkins`, with `PM2_HOME=/var/lib/jenkins/.pm2`.

### One-time VPS setup

Run on the VPS as an administrator:

```bash
sudo mkdir -p /var/www/ihnonomiru
sudo chown -R jenkins:jenkins /var/www/ihnonomiru
sudo mkdir -p /var/lib/jenkins/.pm2
sudo chown -R jenkins:jenkins /var/lib/jenkins/.pm2
sudo -u jenkins -H /usr/bin/node --version
sudo -u jenkins -H /usr/bin/npm --version
sudo -u jenkins -H /usr/bin/pm2 --version
```

If the Node command returns `EACCES`, fix the executable/path permissions before deploying; do not use `chmod 777`. Ensure `rsync` and `curl` are installed on the VPS and that Jenkins has permission to write `/var/www/ihnonomiru` and use PM2.

### Jenkins job

1. Push this project to a Git repository and create a Jenkins **Pipeline** job pointing to that repository.
2. Ensure the Jenkins agent runs on the VPS/Linux host and has Node.js, npm, PM2, rsync and curl available at the paths used by the pipeline (`/usr/bin/node`, `/usr/bin/npm`, `/usr/bin/pm2`).
3. Select **Pipeline script from SCM**, choose the repository/branch, and set script path to `Jenkinsfile`.
4. Run **Build Now**. The pipeline checks out, installs, builds, syncs the release files, installs production dependencies, reloads both PM2 apps, and checks both local endpoints.

### Nginx

Nginx should proxy `ihnonomiru.fun` to `http://127.0.0.1:13001`. Inspect the current config before editing, and preserve the existing Certbot HTTPS configuration. See `deployment-nginx.conf.example` for the proxy directives. After editing, run `sudo nginx -t` before `sudo systemctl reload nginx`.

### Useful diagnostics

```bash
sudo -u jenkins -H env PM2_HOME=/var/lib/jenkins/.pm2 /usr/bin/pm2 status
sudo -u jenkins -H env PM2_HOME=/var/lib/jenkins/.pm2 /usr/bin/pm2 logs ihnonomiru-api --lines 100
sudo -u jenkins -H env PM2_HOME=/var/lib/jenkins/.pm2 /usr/bin/pm2 logs ihnonomiru-web --lines 100
curl -i http://127.0.0.1:4000/api/health
curl -I http://127.0.0.1:13001/
curl -I https://ihnonomiru.fun/
```

The pipeline is prepared but has not been run against the live VPS. Confirm the repository is pushed and the Jenkins agent has the required permissions before running it.
