# Agent Instructions

## Project Overview

This repository is a static personal portfolio site for Xavier Chong. It is built with plain HTML, CSS, JavaScript, and local image/SVG assets. There is no package manager, bundler, framework, or build step.

Primary files:

- `index.html` - home/about/contact page.
- `provision.html` - tax provision experience page.
- `tax.html` - tax compliance experience page.
- `automation.html` - process improvement page.
- `styles.css` - shared visual system, layout, responsive styles, animations, and card states.
- `site.js` - shared behavior for nav scroll state, reveal animations, and expandable cards.
- `*.png` and `*.svg` - local visual assets used by the pages.

## Local Workflow

Preview the site with a simple static server from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

Because this is a static site, most edits can also be checked by opening an HTML file directly, but use the local server when validating linked assets, navigation, and browser behavior.

## Editing Guidelines

- Keep the site dependency-free unless the user explicitly asks for a framework or build tooling.
- Preserve the existing visual language: warm off-white background, rust accent, Fraunces headings, Inter body text, JetBrains Mono labels, restrained editorial spacing, and subtle motion.
- Reuse existing classes and patterns before adding new ones. The main patterns are `.hero`, `.section-label`, `.section-title`, `.page-card`, `.project`, `.cycle-card`, `.tile`, `.tag`, `.project-bullets`, and `.reveal`.
- Keep shared styling in `styles.css` and shared interactions in `site.js`.
- When adding a new page, copy the existing document structure: font preconnects, shared stylesheet, deferred `site.js`, fixed nav, hero, content sections, contact/footer pattern where appropriate.
- Update the nav on every page when adding, removing, or renaming a top-level page. Make sure the current page has the `active` class.
- Use local assets with meaningful `alt` text. Do not hotlink remote images for core page visuals.
- Keep inline styles to a minimum. Existing inline styles may remain, but prefer reusable CSS for new layout or visual behavior.
- Keep content polished, specific, and credible. This portfolio emphasizes tax provision, compliance, process improvement, review support, and reliable reporting.

## JavaScript Behavior

`site.js` intentionally stays small and framework-free.

- `.reveal` elements are animated into view with `IntersectionObserver`.
- Motion is disabled for users who prefer reduced motion.
- `.project`, `.cycle-card`, and `.tile` cards are made keyboard accessible and expandable.
- Detail panels should use `.project-detail`, `.cycle-detail`, or `.tile-detail` so the shared expansion logic continues to work.
- Do not add page-specific JavaScript unless the behavior cannot reasonably live in the shared script.

## CSS And Responsive Notes

- Check desktop and mobile after layout changes. Important breakpoints currently include `1024px`, `768px`, `640px`, `520px`, and `480px`.
- Avoid fixed heights for text-heavy cards unless paired with responsive overflow handling.
- Keep hover behavior matched with `.is-open` states so mouse, touch, and keyboard interactions remain consistent.
- Preserve focus-visible styles and keyboard affordances for expandable cards.
- Respect `prefers-reduced-motion`.

## Verification

Before finishing meaningful UI changes:

1. Start a static server with `python3 -m http.server 8000`.
2. Visit each touched page in a browser.
3. Check navigation links, active nav state, local images/SVGs, hover/tap expansion, keyboard expansion, and mobile layout.
4. Confirm the browser console has no obvious errors.

For content-only changes, at minimum review the affected HTML in a browser or with a quick source read.

## Git Hygiene

- The working tree may contain user changes. Do not revert unrelated edits.
- Keep changes scoped to the requested work.
- Do not rename assets or pages unless the request requires it.
- Do not introduce generated build artifacts, dependency folders, or formatting churn.
