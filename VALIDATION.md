# Verification record

## Completed locally

- JavaScript parsed for all frontend, Worker, test and utility modules.
- All HTML local assets and all precached service-worker assets exist.
- Manifest uses relative start URL/scope for GitHub project paths. PNG icons are the declared 192px / 512px sizes, including a maskable icon.
- 11 automated tests pass: all recipe/amp combinations, hardware control omissions, clean-channel gain behavior, pickup adjustments, missing effects, backup validation and split exports, malformed AI input, origin restrictions, verification failures, provider limits and missing grounding.
- Provider calls in tests use controlled fixtures. They verify the request/response integration and failure handling, **not a live Gemini account or real web research**.
- Browser checks: local song filtering, selecting a tone, keyboard gain adjustment, save and reload persistence, amp changes, absence of the Mustang Presence control, presence of its menu Middle control, and honest unconfigured-AI feedback.
- WebMCP registration, read-only recipe search, valid selection and invalid-ID rejection verified in a supporting browser.
- Layout inspected at 412px phone width, 800px tablet width and 1440px desktop width. No horizontal document overflow observed in the phone/tablet checks. Oversized catalog SVG icons and checkbox styling found during tablet QA were corrected.
- No browser error/warning logs observed in the inspected app preview.
- Browser offline fallback verified by stopping the local server, reloading the installed service-worker scope, and successfully searching the local catalog. The preview server was then restarted. AI stays network-dependent.

## Verified on GitHub Pages

- GitHub Actions deployment succeeded and the app was opened at https://wulfrm.github.io/ToneZero/ on 14 September 2026.
- Hosted song search returned both Nirvana recipes. The earlier branch-based README deployment was replaced by the app workflow; Pages now uses GitHub Actions.

## Still requires the owner’s connected accounts / devices

- Cloudflare Worker deployment, real Turnstile verification and real Gemini research must be verified after account setup and secrets are connected.
- Actual installation and interaction on the user’s Galaxy S26 Ultra and Tab S10 have not been tested. Responsive browser testing does not replace physical-device verification.
- This application does not measure or process audio; no audio-matching accuracy claim has been tested or made.

Re-run `node --experimental-vm-modules scripts/check.mjs` and `node tests/run.mjs` after code changes. After deploying the AI service, follow the live checks in SETUP.md.
