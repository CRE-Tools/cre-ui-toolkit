# Context: Design System — V1 Decisions

This file captures the official decisions made by the design team (task resolved 2026-05-27) that govern naming, structure, and token conventions across the entire design system. Both design and dev must use these conventions.

These decisions apply to: Figma component names, code component names, Storybook titles, token names, and documentation.

**Source:** Design team task "Nomenclatura oficial — foundations, primitivas e variações visuais" (resolved 2026-05-27, authored by design team, reviewed by Gemini). Dev team validation on web-specific needs is still pending for some items — those are flagged below.

---

## Strategic Decisions

### Language
100% English. No translations, no Portuguese naming in code, tokens, or Storybook. `Surface`, `Grid`, `Container` are treated as proper names, not translated. This eliminates cognitive overhead and ensures clean integration with Tailwind CSS and game engines.

### Design ↔ Code relationship
1:1 mapping. What appears in Figma is used directly in code. No separate "design name" vs. "code name." What is in Figma JSON is consumed directly by web or engine.

### Variant naming: use/semantics over appearance
Name variants by **what they do**, not how they look.

- Correct: `action/primary/default`, `surface/background`, `card`, `modal`
- Wrong: `raised`, `flat`, `outlined` (appearance-based — these break platform-agnosticity)

Reason: A `Card` on web may be flat, but in VR may need depth. Semantic names survive across platforms; appearance names do not.

---

## Glossary — Design System Hierarchy

This replaces Atomic Design terminology (atom/molecule/organism) to avoid theoretical debates.

| Level | Name | Definition | Examples |
|---|---|---|---|
| 1 | **Tokens** | Smallest, indivisible design values | color, spacing value, font size |
| 2 | **Elements** | Smallest graphic pieces with no isolated function | icon, standalone text node |
| 3 | **Components** | Unions of base elements that create an interactive function | Button, Input, Badge |
| 4 | **Blocks** | Complete interface blocks formed by components; one or more interactions | Modal, Card, Sidebar, Header, Footer |

**Important:** Layout utilities (Grid, Container, Box, Stack, Surface) sit outside this hierarchy — they are spatial/structural primitives, not Components or Blocks. In Storybook they live under `Layout/`.

---

## Structural Glossary (Named Concepts)

These are the named structural concepts of the design system. When building a new component, check if it maps to one of these before inventing a new name.

| Concept | Role |
|---|---|
| `Grid` | Column layout system. 12-column standard for large screens (4/8/12 responsive). |
| `Breakpoint` | Screen widths where layout reflows. Uses custom Figma variables, not pre-defined tokens. |
| `Gutter` | Space between grid columns only. Uses spacing tokens. |
| `Container` | Constrains content width and applies horizontal margins. |
| `Section` | Semantic grouping of content within a page. |
| `Layout` | Overall page/screen structure. |
| `Surface` | Base visual background area. |
| `Card` / `Panel` | Isolated content containers (map to `Blocks`). |
| `Sidebar` / `Modal` | Navigation/interaction blocks (map to `Blocks`). |
| `Overlay` | Overlaid layer (e.g., scrim). Secondary priority — not required now. |

---

## Token Naming Conventions

### Spacing
Direct numeric values in CSS/engine. No semantic names.

`spacing-4`, `spacing-8`, `spacing-16`, `spacing-24`, `spacing-32`, `spacing-40`, `spacing-48`, `spacing-64`

All are multiples of 4 and 8.

### Border Radius
Numeric system — value in the name. Tailwind class prefix: `rounded-`.

| Token | Value | Tailwind class | Status |
|---|---|---|---|
| `radius-0` | 0px | `rounded-radius-0` | DS confirmed |
| `radius-4` | 4px | `rounded-radius-4` | DS confirmed |
| `radius-8` | 8px | `rounded-radius-8` | DS confirmed |
| `radius-12` | 12px | `rounded-radius-12` | Dev addition — design sign-off pending |
| `radius-16` | 16px | `rounded-radius-16` | DS confirmed |
| `radius-32` | 32px | `rounded-radius-32` | DS confirmed |
| `radius-full` | 9999px | `rounded-radius-full` | DS confirmed (pill shape) |

`radius-12` was added by the dev team because Surface uses 12px for card/panel variants. It is a multiple of 4 and fits the numeric convention. Needs design team confirmation in the glossary.

Old semantic names (`xsmall`, `small`, `medium`, `pill`, etc.) are removed — do not use them in new code.

### Typography
Weights: `weight-regular400` (400), `weight-medium500` (500), `weight-bold700` (700)

Sizes: `size-12`, `size-14`, `size-16`, `size-32` etc. (numeric, in px)

Named styles (use these for semantic roles):
- `Heading/H1` through `Heading/H6`
- `Body/Main`
- `Action/Button`
- `Caption`

### Colors *(V1 — pending web dev validation)*
These are the V1 color token names. The web-specific needs still need to be validated against what the dev team found necessary. Do not implement as breaking changes until alignment is complete.

| Tier | Token examples |
|---|---|
| Surface | `surface/background`, `surface/element` |
| Text | `text/main`, `text/muted` |
| Action | `action/primary/default`, `action/primary/hover` |
| Border | `border/divider` |
| Feedback | `feedback/success`, `feedback/error`, `feedback/warning`, `feedback/info` |

**Current state in code:** `brand.DEFAULT = #7B1234`, `neutral.400 = #B5A8AD`. The mapping from current names to the new tier system needs a design+dev session.

### VR Scales *(not applicable to web)*
`scale-quest3-1x`, `scale-quest3-1.25x`, `scale-pico3-1x` — for VR targets only, do not implement in web tokens.

---

## Storybook Category Structure

| Category | What goes here |
|---|---|
| `Layout/<Name>` | Spatial/structural primitives: Grid, Container, Box, Stack, Surface |
| `Components/<Name>` | Interactive and display components: Button, Badge, Alert, Input, ActionButton |
| `Blocks/<Name>` | Complex multi-component blocks: Modal, Sidebar, Table, HierarchicalTable |
| `Foundation/<Name>` | Token demonstrations only (no interactive component) |

`Admin/` is not a valid category — it names components by use context (admin panel) instead of by structural role. Modal/Sidebar/Table are `Blocks`, not `Admin`.

---

---

## Enforced Code Patterns

These rules apply to every component in `packages/ui-kit/src/`. They are derived from the token decisions above and must be followed in all new code and task implementations.

### Token usage — always use the token, never the raw value

**Colors:** Use the Tailwind token name, not the hex.
- `neutral-400` → `border-neutral-400`, `text-neutral-400`, `bg-neutral-400`, `placeholder:text-neutral-400`
- `brand` → `text-brand`, `bg-brand`, `ring-brand`, `border-brand`
- Never: `border-[#B5A8AD]`, `text-[#B5A8AD]`, `ring-[#7B1234]`
- Exception: SVG `fill` attributes that require a literal hex — use a named JS constant (`const BRAND_COLOR = '#7B1234'`), never an inline string

**Border radius:** Use `rounded-radius-*` classes. Never use old semantic names.
- Correct: `rounded-radius-8`, `rounded-radius-16`, `rounded-radius-full`
- Never: `rounded-xsmall`, `rounded-small`, `rounded-pill`

**Focus rings:** Use `ring` (resolves to 3px via `ringWidth.DEFAULT`). Never use `ring-[3px]` arbitrary values.
- Standard interactive: `focus-visible:outline-none focus-visible:ring focus-visible:ring-brand/40 focus-visible:ring-offset-2`
- On-brand (dark bg): `focus-visible:outline-none focus-visible:ring focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand`
- Compact (2px ring): `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30`
- Never: `ring-[3px]`, `ring-[2px]`, `ring-large`

**Shadows:** Use `shadow-level-1`, `shadow-level-2`, `shadow-level-3`. Do not use Tailwind default shadows.

**Typography:** Always use `font-heading` or `font-body` — never `font-sans`, `font-serif`, or raw font-family values.

### Naming new variants

Always use semantic/use-based naming, not appearance-based:
- Wrong: `raised`, `flat`, `outlined`, `sunken`, `dark`
- Right: `card`, `overlay`, `filled`, `recessed`, `on-brand`

### When a token doesn't exist yet

Do not use arbitrary Tailwind values (`w-[37px]`, `text-[13px]`) for anything that should be a token. If the token is missing:
1. Add it to `tailwind.config.ts` following the numeric naming convention
2. Note it as provisional if the value hasn't been confirmed from Figma
3. Do not inline the raw value

---

## What Is Explicitly Deferred

- `Overlay` component — not needed now, revisit later
- Complete color token migration — pending design+dev alignment session (`brand`/`neutral-400` are confirmed; the full `surface/text/action/border/feedback` tier system is not yet implemented)
- Spacing token rename — Tailwind's default numeric scale is compatible with the DS direction; explicit `spacing-*` token names not yet added to config
- Border-width token naming — `small/medium/large/xlarge` in the config but not yet in DS glossary; keep current names until design team addresses them
- Surface variant renaming — current `raised/sunken/overlay/interactive` names are appearance-based (violates the semantic naming rule); rename deferred until design team proposes semantic equivalents
- VR-specific tokens — out of scope for web package
