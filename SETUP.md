# Connect ToneZero's AI research

The interface is hosted by GitHub Pages. A small Cloudflare Worker handles source-linked AI research without exposing your Google API key. Visitors use your shared service; they do not need to sign in.

## 1. Create the free accounts

Open [Google AI Studio API keys](https://aistudio.google.com/apikey) and sign in to your Google account. Complete any eligibility or terms steps yourself. Create a new project and API key if needed. Keep the project on the free tier; do not activate billing. Restrict the key to the Generative Language API when the key settings offer that option. Keep the key private.

Open [Cloudflare](https://dash.cloudflare.com/sign-up), create a free account and verify your email. Complete any terms or verification yourself. You do not need to buy a domain or add a payment method for the intended setup.

## 2. Create the verification widget

In Cloudflare, open **Turnstile → Add widget**:

- Name: `ToneZero`
- Hostname: `wulfrm.github.io`
- Mode: Managed

Keep the **secret key** private. The **site key** is public and belongs in the frontend configuration. Add a custom domain to the widget if you later change hosting. For local testing, add the exact local hostname separately and use a separate development Worker configuration; do not broaden the production origin.

## 3. Deploy the Worker

The simplest repeatable route uses Cloudflare's official Wrangler CLI. Use Node.js 22 or later with npm installed. In the repository root:

```sh
npx wrangler@latest login
npx wrangler@latest deploy --config worker/wrangler.jsonc
npx wrangler@latest secret put GEMINI_API_KEY --config worker/wrangler.jsonc
npx wrangler@latest secret put TURNSTILE_SECRET_KEY --config worker/wrangler.jsonc
```

Enter each secret into its interactive terminal prompt. Do not put it in the command text. Keep the account on Workers Free. `wrangler.jsonc` contains public configuration only; the rate-limiting namespace `1001` should be changed if already used by another app in your account.

The deployed Worker remains closed until both secrets, Turnstile hostname and rate-limiter binding are present. Wrangler configures the public variables and binding. Copy the Worker URL it reports, such as `https://tonezero-research.YOUR-SUBDOMAIN.workers.dev`.

### Dashboard alternative

If you prefer the Cloudflare dashboard, `node scripts/bundle-worker.mjs` produces a standalone `worker/deploy.js` module for the Worker editor. Create a Worker, replace its starter code with that file, add the two secret bindings above, add text variables `ALLOWED_ORIGIN=https://wulfrm.github.io` and `TURNSTILE_HOSTNAME=wulfrm.github.io`, and add a rate-limiter binding named `TONE_RATE_LIMITER` with 3 requests per 60 seconds. If your dashboard does not expose rate-limit bindings, use Wrangler with the supplied config instead. Do not omit the binding: the API fails closed without it.

## 4. Connect the public website once

Edit `dist/config.js`:

```js
export const CONFIG = Object.freeze({
  apiBase: 'https://YOUR-DEPLOYED-WORKER.workers.dev',
  turnstileSiteKey: 'YOUR_PUBLIC_TURNSTILE_SITE_KEY',
  version: '1.0.0'
});
```

These two values are public. Never add a Gemini key or Turnstile secret here. Push the change to `main`. Change the `VERSION` value in `dist/sw.js` whenever you release new app assets so installed clients receive a coherent update after reopening. App settings can override the public configuration for testing on one device, but that does not configure it for everyone.

## 5. Verify live research

After the Pages and Worker deployments succeed, open the hosted app. Go to **My rig**, choose **Guitar**, enter an exact manufacturer/model/year and choose **Research this model with AI**. Complete the managed verification if prompted.

Check that:

- A specific model with specifications, uncertainty and real source links appears.
- Google Search Suggestions appear beneath the result.
- The original answer and source-linked excerpts can be opened.
- Adding the researched gear updates the rig and available controls.
- No key appears in browser requests, public config or repository files.
- When the provider returns a rate limit, the app shows a clear retry message and still supports local matching.

Then test one song and section, one amp and one pedal. Do not describe live AI as working until a real provider request has succeeded.

## Free-tier limits and privacy

Google currently lists free input/output for Gemini 2.5 Flash and a free allowance for Search grounding. The actual model/project rate limit may be lower, and quotas and model availability can change. Search requests can be rate-limited or unavailable. Google's free-tier data may be used to improve its products. Avoid including private information in queries. [Google pricing](https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-flash) · [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)

Cloudflare Workers Free currently allows 100,000 requests per day. The included rate limiter is an abuse control per network location, not a precise global daily counter. Free provider quotas, with billing left disabled, are the intended cost boundary. Connecting a paid Google project can incur charges; the application cannot inspect the billing status of your key. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) · [Rate limiter](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)

AI results are not collected into a shared database. The user can explicitly save an individual displayed result locally. Requests are `no-store` and bypass PWA caching. Source links and search suggestions remain attached to retained results. [Grounding terms](https://ai.google.dev/gemini-api/terms#grounding-with-google-search)
