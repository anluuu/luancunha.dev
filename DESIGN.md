# Design

## Visual Theme

Cyber-terminal portfolio with a restrained Matrix influence and a purple-first identity. The interface should feel like a live system console built by a senior full stack / AI engineering practitioner: dark, precise, luminous, and readable.

## Color

Use OKLCH-based tokens in CSS. The palette is anchored by near-black violet backgrounds, luminous purple accents, soft lavender highlights, and a small amount of amber/green terminal signal for contrast. Avoid a flat single-purple page by mixing neutral ink, violet surfaces, warm operational accents, and sparse hacker-green details.

## Typography

Use the project fonts: Geist for interface and Geist Mono for terminal, labels, metrics, and code-like fragments. Headings should be large but capped below 6rem, with balanced wrapping and no aggressive negative tracking.

## Layout

Single-page brand portfolio. First viewport must immediately show the name, full stack role, AI engineering fluency, consolidated experience, and a WhatsApp CTA. Follow with proof bands for stack, services, process, availability, and selected outcomes. Use full-width sections and framed terminal panels instead of generic card grids.

## Components

- Matrix-rain background layer with reduced-motion fallback.
- Terminal hero with status lines and command-style proof.
- Controlled text effects inspired by React Bits: split text, text type, shiny text, decrypted text, and command loops.
- Compact navigation with anchor links.
- System panels for services, stack, process, and credibility.
- Persistent WhatsApp conversion affordance.

## Motion

Subtle scanlines, background rain, and small status pulses are allowed. Respect `prefers-reduced-motion: reduce` by disabling continuous animation.
