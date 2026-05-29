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
Numeric system — value in the name.

| Token | Value |
|---|---|
| `radius-0` | 0px |
| `radius-4` | 4px |
| `radius-8` | 8px |
| `radius-16` | 16px |
| `radius-32` | 32px |
| `radius-full` | 9999px (pill) |

**Dev note:** The current codebase has additional radius values (12px, 20px, 24px, 50%) that have no equivalent in this list. These need to be resolved with the design team before renaming — see TASK-005.

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

## What Is Explicitly Deferred

- `Overlay` component — not needed now, revisit later
- Complete color token migration — pending design+dev alignment session
- Spacing token rename — current Tailwind numeric system is compatible; migration timing TBD
- VR-specific tokens — out of scope for web package
