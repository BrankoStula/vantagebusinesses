# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Quantara** — a Webflow-exported static HTML marketing website template for an AI SaaS platform. There is no build system, package manager, or compilation step. Files are served as-is.

## Development

**Serving locally:** Any static file server works:
```bash
python3 -m http.server 8080
# or
npx serve .
```

**No build, lint, or test commands exist** — this is a pure static site.

## Architecture

### Key Files

- `index.html` — Main landing page (all content and inline `<script>` tags with GSAP animations)
- `css/brankos-five-star-site-b39d2e.webflow.css` — Primary stylesheet (3,565 lines); all design tokens live here as CSS custom properties
- `js/webflow.js` — Minified Webflow runtime (do not edit)
- `utilities/instruction.html` — GSAP code examples for all three interaction patterns used on the site

### CSS Design Tokens

All spacing, typography, and color values are CSS custom properties defined at the top of the main stylesheet. Sizes use `vw` units for fluid scaling. Key variables:
- Colors: `--color--blue: #229eff`, `--color--dark-blue: #002b4d`
- Typography: `--heading--h1-size: 10vw`, `--text-typography--base-size: 1vw`
- Spacing: `--layout--section-spacing: 2.4vw`, `--gap--gap-Nx` pattern

### JavaScript / Animations

All custom JavaScript lives as inline `<script>` tags at the bottom of `index.html`. Three GSAP interaction patterns are used:

1. **Scramble Text** — `.scramble` elements loop through character sequences using `ScrambleTextPlugin`
2. **Scroll-Driven Rotation** — `.content-feature` sections animate `.radial-mask` rotation, opacity, blur, and a 0→100 counter via `ScrollTrigger`
3. **Hover Font Weight Shift** — `.button-secondary` transitions font-weight 300↔600 on hover via GSAP

External dependencies are loaded via CDN: GSAP 3.14.2 (+ ScrollTrigger, SplitText, ScrambleTextPlugin), jQuery 3.5.1, Google Fonts (Inter Tight, IBM Plex Mono, Material Icons).

### Lottie Animations

Two `.lottie` files in `documents/` are referenced inline: scroll indicator and glitch effect. These are JSON-based animation files rendered client-side.
