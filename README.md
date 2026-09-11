# portfolio — Command-Prompt-inspired Portfolio

A clean, minimal personal portfolio built with **React + Vite**, styled like a
command prompt: black background, white/light-gray monospace text, and subtle
monochrome accents. Fully responsive (top navbar → hamburger menu on mobile),
with an auto-scrolling tool icons marquee on the homepage.

## Features

- **Tool icons marquee** — infinite right-to-left scroll of VirtualBox, AWS,
  Ubuntu, GNS3, Cisco Packet Tracer, and Git icons. Pauses on hover and
  respects `prefers-reduced-motion`.
- **Contact form** — sends messages straight to your inbox via
  [FormSubmit.co](https://formsubmit.co) (no backend required).
- **Hash routing** — `react-router-dom` with `HashRouter`, so it works on
  GitHub Pages without any server rewrite rules.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (http://localhost:5173)
npm run dev
```

Other useful scripts:

```bash
npm run build   # production build into dist/
npm run preview # preview the production build locally
npm run lint    # run the linter
```

## Project Structure

```
src/
├── main.jsx               # entry point (HashRouter config)
├── App.jsx                # layout shell + routes
├── index.css              # theme variables + all styles (edit colors at top)
├── components/
│   ├── Navbar.jsx         # responsive navbar (hamburger on mobile)
│   └── IconMarquee.jsx    # auto-scrolling tool icons
└── pages/
    ├── Home.jsx           # hero + marquee
    ├── About.jsx          # bio (edit here)
    ├── Skills.jsx         # skills list (edit here)
    ├── Projects.jsx       # project grid (edit here)
    └── Contact.jsx        # links + message form
```

## Making It Yours

- **Contact info** — `src/pages/Contact.jsx`.
- **Email address for the form** — the `FORM_ENDPOINT` constant in
  `src/pages/Contact.jsx`.
- **Content** (name, bio, skills, projects) — edit the top of each file in
  `src/pages/`.
- **Tools in the marquee** — the `tools` array in `src/components/IconMarquee.jsx`.
- **Theme** — the CSS variables at the top of `src/index.css`.
- **Navigation items** — the `links` array in `src/components/Navbar.jsx`.

## Activating FormSubmit for your email

1. Deploy the site first (see below).
2. Submit the contact form **once** with your real email address
   (`arjaydelosangeles88@gmail.com` is the target by default).
3. FormSubmit sends an **activation email** to that address — click the link
   inside it.
4. Thereafter, every form submission is forwarded to that inbox.

> Note: the form uses the honeypot field for spam protection. Without an
> additional CAPTCHA, FormSubmit may rate-limit if you receive many messages
> rapidly — `_captcha: "false"` is set in `src/pages/Contact.jsx`. You can
> enable FormSubmit's captcha later if needed.

## Deploying

### Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com), click **New Project** and import the repo.
3. Vercel auto-detects Vite — framework preset "Vite", build command `npm run build`,
   output directory `dist`. Click **Deploy**.

### GitHub Pages

Routing uses `HashRouter`, so no rewrites are needed.

1. Push to GitHub, then in the repo settings enable Pages via **GitHub Actions**.
2. Use this workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The `base: './'` in `vite.config.js` keeps asset paths correct under the
`https://<user>.github.io/<repo>/` subpath.