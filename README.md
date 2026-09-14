# PartPacket

**Your next side project doesn’t have to live on a screen.**

A storytelling landing page for software builders who use AI and want to branch into hardware. You design something with your existing AI and tools, then hand off the CAD and delivery destination to PartPacket. The concept is a harness from conversation to doorstep, not a new AI CAD model.

This is an interactive concept, not a manufacturing or ordering service. It collects no CAD uploads, addresses or payments, and places no orders.

## Run locally

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev -- --port 5173
```

Open http://127.0.0.1:5173. To build and preview:

```sh
npm run build
npm run preview -- --port 4173
```

The static output is in `dist/`. The page uses semantic HTML, CSS and JavaScript with Vite. All imagery is bundled locally; no backend, environment variables, account or API keys are needed.

## Explore and verify

The navigation leads through three conversation cards, a five-stage process and a photographic unboxing story. CTAs open an Ask → Approve → Make example with back, close and keyboard controls.

With the dev server running on port 5173:

```sh
npx playwright install chromium
npm run qa
```

Checks cover desktop and mobile layouts, the example journey, runtime errors, horizontal overflow and automated accessibility. [Independent QA](evidence/independent-qa.md) records the visual/journey review and fixed small-screen issue.

[Desktop screenshot](evidence/desktop.png) · [Mobile screenshot](evidence/mobile.png) · [Example walkthrough](evidence/mobile-example.png)

## Project history and scope

Created September 14, 2026 for the Convex All Gas Hackathon. Earlier PartPacket website/pilot work exists separately and was not copied into this repository. A supplied design reference guided this page’s art direction; new source and AI-generated lamp imagery were created for this workspace. The reference itself is not redistributed. [Image provenance and prompts](design/IMAGE-PROMPTS.md).

Source repository: https://github.com/fraylabs/partpacket-hackathon

The website is not deployed. The intended later frontend host is convex.site. Convex plugin skills and a live MCP response were verified during development; no Convex project, backend, auth or component is implemented. See [setup facts](SETUP.md) and the evidence-based [hackathon log](hackathon.md). This source publication is not a hackathon submission or a claim of eligibility.

## Licensing

No license for the original project code or artwork has been selected. Public source availability does not add an MIT license. Third-party dependencies retain their respective licenses; they are installed through the lockfile and are not vendored here.

Anonymous repository page, API, raw README and source archive access were verified on September 14, 2026. This verifies public source availability; the website is not deployed.
