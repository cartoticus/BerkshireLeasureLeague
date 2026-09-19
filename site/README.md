# Berkshire Leisure League — Website

A static site for the league: current standings, rules, and a "join next season" sign-up form. Built for GitHub Pages — no server, no build step, just plain HTML/CSS/JS.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one) and push all files in this folder to it (`index.html`, `rules.html`, `join.html`, `assets/`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to "Deploy from a branch," pick your default branch (e.g. `main`) and the `/ (root)` folder, then Save.
4. GitHub will give you a URL like `https://yourusername.github.io/your-repo-name/` within a minute or two.

## The sign-up form (already set up)

The Join page posts to [Formspree](https://formspree.io) — already wired to your form at `https://formspree.io/f/meaoeqrn`. Submissions show up in your Formspree dashboard and get emailed to you automatically. No further setup needed; the free tier covers 50 submissions/month, which is plenty for a league sign-up list.

If you ever need to point it at a different Formspree form, just change the `action` attribute on the `<form id="join-form">` tag in `join.html`.

## Updating standings each week

`index.html` shows the current week's results and season standings. It's static HTML, so it needs to be regenerated and re-deployed when new weeks are entered — the same Claude conversation that keeps your season tracker spreadsheet can regenerate this page from it each week; just ask, and push the updated `index.html` to your repo (or re-download the whole site folder and replace it).

## Installable as an app (PWA)

The site is a Progressive Web App — visitors can install it to their phone or desktop home screen and it'll open full-screen like a native app, with basic offline support for pages already visited.

- **Android / Chrome / Edge:** open the site, then use the browser menu → "Install app" (or a banner may offer it automatically).
- **iPhone / iPad (Safari):** open the site, tap the Share icon, then "Add to Home Screen."
- **Desktop Chrome/Edge:** an install icon appears in the address bar.

This requires the site to be served over HTTPS — GitHub Pages does this automatically, no setup needed. The three files that make this work are `manifest.webmanifest`, `sw.js` (service worker), and the icon set in `assets/icons/`. If you ever add more pages, add them to the `PRECACHE_URLS` list near the top of `sw.js` so they're available offline too, and bump `CACHE_NAME` (e.g. `bll-cache-v2`) whenever you update the site's own files, so returning visitors get the fresh version instead of a stale cached one.

## What's intentionally NOT on this site

No financial information — dues status, prize fund balances, and payout info stay in the private season tracker spreadsheet only. This public site only shows game results and standings.

## Files

- `index.html` — home page: this week's results + season standings
- `rules.html` — official league rules (house rules + USGA rules applied)
- `join.html` — "interested in next season" sign-up form
- `assets/style.css` — shared site styling
- `assets/logo.png` — league crest
- `manifest.webmanifest` — PWA app metadata (name, icons, colors)
- `sw.js` — service worker (offline caching, install support)
- `assets/icons/` — generated app icon set (standard + maskable + favicon + Apple touch icon)
