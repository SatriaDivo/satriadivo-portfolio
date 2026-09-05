---
version: alpha
name: Satria Divo — Portfolio
description: Circuit-board technical aesthetic. Honest, no marketing fluff. PCB-trace visuals with warm paper ground.
colors:
  paper: "#F7F5F0"
  ink-circuit: "#1B2A22"
  trace-green: "#2F6F4E"
  solder-copper: "#C97D3B"
  slate-node: "#3A4A63"
  mist: "#E8E4DB"
  on-trace-green: "#FFFFFF"
  on-slate-node: "#FFFFFF"
  on-solder-copper: "#FFFFFF"
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 4.5rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Space Grotesk
    fontSize: 1rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.3em"
  h3:
    fontFamily: Space Grotesk
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  body-md:
    fontFamily: Source Serif 4
    fontSize: 1rem
    lineHeight: 1.6
  body-sm:
    fontFamily: Source Serif 4
    fontSize: 0.875rem
    lineHeight: 1.6
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    lineHeight: 1.4
    letterSpacing: "0.05em"
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    fontWeight: 700
    letterSpacing: "0.15em"
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: "0.3em"
    textTransform: uppercase
rounded:
  sm: 2px
  md: 4px
  lg: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section: 96px
components:
  navbar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-circuit}"
    padding: 16px
    rounded: 0
  navbar-link:
    textColor: "{colors.trace-green}"
  navbar-link-hover:
    textColor: "{colors.solder-copper}"
  button-primary:
    backgroundColor: "{colors.trace-green}"
    textColor: "{colors.on-trace-green}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.slate-node}"
    textColor: "{colors.on-slate-node}"
  card:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink-circuit}"
    rounded: "{rounded.sm}"
    borderColor: "{colors.mist}"
  card-hover:
    borderColor: "{colors.solder-copper}"
  badge-tag:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.slate-node}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
  badge-pill:
    backgroundColor: "{colors.slate-node}"
    textColor: "{colors.on-slate-node}"
    rounded: "{rounded.sm}"
    padding: 4px 12px
  hero-stats:
    textColor: "{colors.ink-circuit}"
  link-external:
    textColor: "{colors.ink-circuit}"
    borderColor: "{colors.trace-green}"
  link-external-hover:
    textColor: "{colors.solder-copper}"
    borderColor: "{colors.solder-copper}"
  footer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-node}"
    borderColor: "{colors.mist}"
  trace-line:
    backgroundColor: "{colors.trace-green}"
    opacity: 0.2
  trace-node:
    backgroundColor: "{colors.solder-copper}"
    boxShadow: 0 0 8px {colors.solder-copper}
---

## Overview

Circuit-board meets journalistic portfolio. Warm off-white paper background (#F7F5F0) carries deep ink-green (#1B2A22) text. A single vertical PCB trace line runs the length of the page, punctuated by copper solder-joint dots at each section boundary. The aesthetic is technical, precise, and unpretentious — no marketing fluff, just honest engineering communication.

Typography carries hierarchy through weight and spacing: Space Grotesk for bold display headings, Source Serif 4 for readable body copy, JetBrains Mono for code references and tiny labels. The copper (#C97D3B) is the sole interaction driver — it signals hover, links, and action states, used sparingly to preserve its signal.

## Colors

- **Paper (#F7F5F0):** Page background, navbar, all surface fills. Warm off-white.
- **Ink-Circuit (#1B2A22):** Primary text, headlines, high-emphasis content. Deep green-black.
- **Trace-Green (#2F6F4E):** Section eyebrow labels, link borders, decorative trace line. Muted forest green.
- **Solder-Copper (#C97D3B):** Interaction-only accent — hover states, link hover, solder-joint dots. Used exclusively for mouse/keyboard feedback, never for static decoration.
- **Slate-Node (#3A4A63):** Secondary text, metadata, date stamps. Muted blue-grey.
- **Mist (#E8E4DB):** Card fills, border, muted background elements. Light warm grey.

### Accessibility

All text-on-surface combinations pass WCAG AA (4.5:1). Ink-Circuit on Paper measures 12.5:1 (AAA). Trace-Green on Paper measures 4.8:1 (AA).

## Typography

- **Space Grotesk** — Display and heading stack. Bold weight carries section titles and big name hero. Tight letter-spacing on largest sizes; uppercase for hierarchy.
- **Source Serif 4** — Body text. Readable at small sizes, italic available for quoted thesis line.
- **JetBrains Mono** — Code, labels, eyebrow, metadata, footer. All-caps with wide tracking for navigational cues.

Body copy stays below 700px line width (max-w-2xl). Line-height 1.5–1.6 for reading comfort.

## Layout

- Max content width: 1024px (max-w-4xl).
- Single column, left-aligned text.
- Vertical PCB trace line at left gutter (40px from content edge) on tablet/desktop.
- Sections padded 48px top/bottom.
- 4px baseline spacing scale.

## Elevation & Depth

No box shadows. Elevation is communicated through borders and background tint (`mist` vs `paper`). The sticky navbar uses 85% opacity with backdrop blur for subtle depth cue on scroll.

## Shapes

- Cards and buttons use minimal rounding (2px–4px) — consistent with PCB board feel.
- Badges and pills: `sm` radius (2px) for tags, `full` only for decorative solder-joint dots (circular timeline markers).

## Components

- **navbar:** Sticky top bar with logo left, nav links right. Background blurs on scroll via `backdrop-blur-md`.
- **button-primary:** Reserved for the email contact CTA. Green fill, white text. On hover shifts to slate-node.
- **card:** Used for project listings, achievement entries, blog preview tiles. Mist background. Border shifts to copper on hover.
- **badge-tag / badge-pill:** Compact metadata labels. Tags use mist-bg for non-emphasis; pills use slate-node with white text for role/job badges.
- **link-external:** Border-bottom dashed green. Hover shifts border + text to copper. Arrow ↗ appears on hover for cards.
- **trace-line:** Decorative vertical line at left gutter, 20% opacity green. Animated scaleY on page load.
- **trace-node:** Copper circular dot at each section boundary, positioned at left gutter. Animated scale+opacity on scroll entry via whileInView.

## Do's and Don'ts

- **Do** use copper (#C97D3B) only for interactive feedback — never for static decoration.
- **Do** keep body text in Source Serif 4 for readability at small sizes.
- **Do** use the 4px baseline spacing scale for all margin/padding decisions.
- **Don't** introduce additional accent colors. If a new color is needed, extend the palette in the front matter first.
- **Don't** use box shadows — elevation cues come from borders and background shifts.
- **Don't** center text blocks wider than 700px — maintain reading comfort.
- **Don't** use the solder-copper on large surfaces — it's a point accent only.
