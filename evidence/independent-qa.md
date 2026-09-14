# PartPacket independent journey QA

**Result:** Pass for the local static storytelling candidate. No unresolved functional, visual, accessibility, or scope blocker remained after the small-screen modal fix described below.

**Tested:** 2026-09-14 SGT with headless Chromium and Playwright against local Vite at `http://127.0.0.1:4177/`. Viewports were 1440×900, 390×844, and 320×568.

## Journey and interaction

- All four CTA entry points passed: header **Start with an idea**, hero **Start with an idea**, card **Explore the handoff**, and closing **Start with an idea**. Every opener reset the dialog to **01 Ask**, hid Back, and focused the labelled close button.
- The complete **Ask → Approve → Make** journey passed. Each step updated its heading, primary action, active progress item, and `aria-current="step"` as expected.
- Back passed from Make to Approve and from Approve to Ask; Back was hidden on Ask. The final **Back to the story** action closed the dialog and returned focus to its opener.
- The labelled close button and Escape both closed the dialog. Escape returned focus to the opener in the 320×568 retest.
- The 320×568 modal intentionally scrolls because its content is taller than the available viewport. After the fix, advancing and going back reset `dialog.scrollTop` to `0`, so each new step begins at its heading.

## Visual comparison

- The current page follows the supplied reference's editorial sequence and visual language: restrained header, split text/photo hero, three conversation cards, five-stage process strip, dark unboxing feature, and centered closing CTA.
- Typography, cream/brown palette, warm lamp imagery, thin borders, compact labels, and generous whitespace form a coherent interpretation of the reference. The extracted process panels retain their proportions; no stretched source sheet remained. The final desktop unboxing crop transitions cleanly into its dark text panel.
- Desktop and mobile pages had no horizontal overflow. At 390px and 320px, the hero, cards, process grid, unboxing image, closing copy, and footer remained legible without collisions or clipped controls.
- The page appropriately departs from the reference where the reference implies a live service: pricing and customer-testimonial claims are absent, while concept, placeholder, and no-order language is visible. The story consistently presents PartPacket as a proposed fulfillment handoff for CAD produced with existing AI/design tools.

## Accessibility and runtime

- Axe reported zero WCAG A/AA violations on the closed page and open dialog in the tested runs.
- The document has English language metadata, header/nav/main/footer landmarks, a keyboard skip link, labelled imagery, visible focus styling, a labelled modal close control, an `aria-live` step region, and current-step semantics.
- Tab traversal reached the modal close and current action without reaching background controls, and focus restoration passed on close. Headless Chromium reported `BODY` as an intermediate `activeElement` when wrapping past the last modal control; the modal background still remained inert. This is a nonblocking reason to include a manual keyboard/screen-reader spot check before any later public release.
- All page images loaded at non-zero natural dimensions. There were no console errors, uncaught page errors, failed requests, HTTP responses at 400+, or horizontal overflow.

## Scope and data safety

- The rendered page contains zero forms and zero input, select, or textarea fields. The example uses only placeholder CAD and destination text.
- Observed requests were limited to the loopback page, local JavaScript/CSS/images, and Vite's local development client. No external links, contact submission, address capture, payment flow, order creation, backend call, or publication path was present.
- Visible copy states that the flow is a demo, images are illustrative concept imagery, and nothing was uploaded, manufactured, purchased, sent, or ordered.

## Resolved finding

`QA-01` — At 320×568, reaching the next button scrolled the dialog; the original step renderer preserved that offset, so the next step began with its title and introductory content above the visible area. The implementation now sets `dialog.scrollTop = 0` during render. Independent retest passed at all three steps and on Back, with scroll position `0` after every transition.

## Evidence

[Desktop](desktop.png), [mobile](mobile.png), [small mobile](small-mobile.png), and [example walkthrough](mobile-example.png).

This review covered the local static candidate only. No deployment or public URL was tested in this journey review.
