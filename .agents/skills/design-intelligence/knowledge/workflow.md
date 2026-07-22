# Workflow Contract

This file defines how to use the design-intelligence skill without bloating `SKILL.md`.

## Request Modes

| Mode | When to use | Output shape |
| --- | --- | --- |
| `design` | Create a new UI direction or redesign an existing one | `DESIGN DNA` + implementation guidance + `DESIGN QUALITY SCORE` |
| `audit` | Review a screenshot, mockup, or implementation | Findings with `Issue`, `Evidence`, `Impact`, `Fix` + `DESIGN QUALITY SCORE` |
| `iterate` | Refine a direction that already exists | Delta-oriented adjustments + `DESIGN QUALITY SCORE` |
| `handoff` | Translate a design direction into build guidance | Tokens, components, spacing, states, and `DESIGN QUALITY SCORE` |

## Loading Order

1. Load the scoring template.
2. Load all anti-slop rules.
3. Load one primary visual pattern that matches the product.
4. Load only the design principles relevant to the request:
   - `design-principles/typography.md`
   - `design-principles/color.md`
   - `design-principles/spacing.md`
   - `design-principles/hierarchy.md`
   - `design-principles/accessibility.md`
   - `design-principles/distinctiveness.md`
5. Load reference material only when the task needs art direction, component architecture, or icon guidance.

## Default Domain Selection

- SaaS or B2B dashboard -> use `visual-patterns/saas.md`
- Premium marketing or editorial landing page -> use `visual-patterns/premium.md`
- Fintech or data-heavy product -> use `visual-patterns/fintech.md`
- Healthcare or trust-sensitive product -> use `visual-patterns/healthcare.md`
- Ecommerce or product-led page -> use `visual-patterns/ecommerce.md`
- Unknown domain -> default to `visual-patterns/premium.md`

## Response Sequence

1. State assumptions or ask at most 2 clarifying questions.
2. Choose a distinctive product-appropriate direction and emit one `DESIGN DNA` block.
3. Give recommendations, critique, or implementation guidance.
4. End with the canonical `DESIGN QUALITY SCORE` block.

## Distinctiveness Rule

- Do not reuse the same visual answer by habit. Select the most appropriate archetype for the brief.
- Change at least one major axis from the common landing-page template: composition, type scale,
  imagery role, motion, or density.
- Include one signature move that makes the result feel authored rather than assembled.
- If the result still feels generic, revise the direction before answering.

## Audit Checklist

- The hierarchy is obvious within the first screen.
- Spacing and grouping support scanning.
- Palette and surfaces match the product mood.
- Components feel consistent and non-generic.
- Card addiction, gradient abuse, and emoji UI are absent.
- Contrast, line length, and touch targets are acceptable.
- Responsive behavior is plausible on desktop and mobile.
- The design has one clear signature move without becoming gimmicky.
