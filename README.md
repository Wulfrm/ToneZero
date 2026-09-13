# ToneZero

A free, installable guitar tone workspace for Android, tablets and desktop browsers. Original interface inspired by the atmosphere and interaction design of Why Zero; product workflow inspired by ToneAdapt. No proprietary code, paywalled presets, artwork or logos were copied.

## What works

- 16 original song-section starting recipes, local song/artist search and tone filters.
- Adjustable amp controls, pickup-output corrections, effect-chain guidance and missing-effect notices.
- Manual guitar/amp/pedal setup; manual custom song recipes.
- Amp profiles for BOSS Katana-50 Gen 3, Fender Mustang LT25, Marshall DSL40CR, Orange Crush 35RT and a generic amp. Model-specific control limitations are linked to official sources.
- Local saved presets with their rig snapshots, copyable settings, validated backup import/export and split exports for large libraries.
- Installable PWA shell with local fonts, app icons, subpath-safe URLs, offline caching, reduced-motion support and responsive layouts.
- AI web research UI and a complete Cloudflare Worker implementation for songs, guitars, amps and pedals. **Live AI is disabled until the owner deploys the Worker and connects the required keys.** There are no fake AI results.

## Important limits

Recipes are estimated starting positions, not calibrated amp transfers, measured audio matching, audio processing, exact studio settings or guaranteed recreations. The moving waveform is illustrative. Guitar specifications inform pickup choice and available controls; they cannot establish the exact recorded tone of an instrument. Device saves do not automatically sync. AI requires an internet connection, provider availability and available free-tier quota.

## Run locally

Install Node.js 20 or newer, then from this folder:

```sh
node scripts/serve.mjs
```

Open the printed URL, normally `http://127.0.0.1:4173/tonezero/`. No npm install is needed for the frontend, tests or packaging. Opening `index.html` directly with `file://` does not support the modules or PWA.

```sh
node --experimental-vm-modules scripts/check.mjs
node tests/run.mjs
```

The first command uses Node's experimental VM parser only for offline syntax validation; the shipped browser app does not use experimental VM APIs.

## GitHub Pages

Target repository: [Wulfrm/ToneZero](https://github.com/Wulfrm/ToneZero).

1. Push these files to `main`.
2. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Open **Actions → Deploy ToneZero to GitHub Pages** and run the workflow if it did not start automatically.
4. Use the URL shown by the successful deployment. The expected project URL is `https://wulfrm.github.io/ToneZero/`; it is not live merely because it is listed here.

Only `dist/` is published. Server code and private secrets are never part of the Pages artifact. Public repositories are eligible for GitHub Free Pages, subject to GitHub's limits. See [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Connect free AI research

Follow [SETUP.md](SETUP.md). The public frontend configuration in `dist/config.js` contains only the Worker origin and the public Turnstile site key. `GEMINI_API_KEY` and `TURNSTILE_SECRET_KEY` belong in Cloudflare's secret store. Do not put secrets in this repository, GitHub Pages, localStorage, query strings or chat.

The app owner connects one service for all visitors. Visitors do not need Google accounts or their own keys. Keep the Google API project and Cloudflare account on their free tiers without billing enabled if zero charges are required. A rate limiter discourages abuse; it is not a financial spending cap. There is no automatic paid fallback.

## Install on Samsung devices

Open the deployed HTTPS URL in Chrome or Samsung Internet on each device. Use the browser menu's **Install app** / **Add to Home screen**, or the app's Install button if the browser offers an install prompt. On desktop, Chrome and Edge offer installation through the address bar or browser menu. This is a PWA, not an APK or Play Store listing.

Visit once while online so offline caching can complete. AI research and source links need internet access. New app versions activate after old tabs and installed-app windows close. Export a backup before clearing browser data or moving between origins/devices.

## Architecture

`dist/app.js` handles the UI, `dist/core.js` contains shared validation/matching, and `dist/data.js` holds original recipes and source context. `worker/index.js` is the API proxy. Google Search grounding sources are taken from provider metadata, not invented model URLs. The original response, source support excerpts and Search Suggestions are retained when a user explicitly saves a researched result. API requests and third-party responses never enter the service-worker cache.

Two optional WebMCP tools expose built-in recipe search and selection to supporting browsers. They make no AI requests and do not save presets.

## Verification

See [VALIDATION.md](VALIDATION.md) for what was actually checked and what still needs a live provider/device check.

## License

Project code and original recipe data are provided under the MIT license. Song titles and equipment names identify the relevant sounds and products; they remain the property of their respective owners. External sources and AI provider output are subject to their own terms. ToneZero is independent and unaffiliated with ToneAdapt, Why Zero, artists or manufacturers.
