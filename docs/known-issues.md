# Known Issues

> Open bugs, limitations, and tech debt only — delete an entry once its fix is verified. Don't read this file in full: list the headings with a search for `^## `, then read only the entries you need. Format and rules are in `pipeline/skills/architect.md`.

---

## KI-001 · packaging · Published package ships no CSS or design tokens
Severity: high · 2026-10-30
Where: `packages/cre-web-ui/package.json`, `packages/cre-web-ui/tsup.config.ts`
Impact: `files: ["dist"]` excludes `src/`, yet the `exports` map points at `./src/styles/globals.css`, and tsup only builds `src/index.ts`. `tailwind.config.ts` doesn't ship either. A consumer outside this monorepo can't get the styles or tokens. Sandbox doesn't catch this because it loads the Tailwind preset by relative path.
Workaround: Consume the package only from inside this workspace until packaging is fixed.

## KI-002 · tokens · `radius-32` is documented but missing from the Tailwind config
Severity: medium · 2026-10-30
Where: `packages/cre-web-ui/tailwind.config.ts`, `packages/storybook-utils/src/token-registry.ts`
Impact: The registry marks `radius-32` as confirmed and the Foundation/BorderRadius story references it, but `rounded-radius-32` generates no CSS.
Workaround: Don't use `rounded-radius-32` until the token is added.

## KI-003 · tokens · Shadow CSS values are provisional
Severity: medium · 2026-10-30
Where: `packages/cre-web-ui/tailwind.config.ts`
Impact: The `level-1/2/3` names are confirmed, but the values are approximate until replaced with exact X/Y/Blur/Spread/Color values from Figma's effect panels.
Workaround: Use the `shadow-level-*` classes so the values can change in one place.

## KI-004 · tokens · Color token migration is deferred
Severity: medium · 2026-10-30
Where: `packages/cre-web-ui/tailwind.config.ts`
Impact: Only `brand` and `neutral-400` are confirmed. The `surface/text/action/border/feedback` tier system isn't implemented and needs a design+dev alignment session.
Workaround: Use the current color tokens, and don't make breaking color changes before that session.

## KI-005 · tokens · Brand color status is contradictory
Severity: low · 2026-10-30
Where: `packages/cre-web-ui/tailwind.config.ts`, `packages/storybook-utils/src/token-registry.ts`
Impact: A config comment calls `brand` a placeholder awaiting Figma confirmation, while the registry and design docs mark it confirmed. One of them is out of date.
Workaround: Treat the registry as current until design confirms the value.

## KI-006 · tokens · Border-width names aren't in the DS glossary
Severity: low · 2026-10-30
Where: `packages/cre-web-ui/tailwind.config.ts`
Impact: `small/medium/large/xlarge` are dev-side names that the design team hasn't addressed, and they differ from the numeric convention used elsewhere.
Workaround: Keep the current names until the design team decides.

## KI-007 · components · Button `destructive` variant is non-DS
Severity: medium · 2026-10-30
Where: `packages/cre-web-ui/src/components/Button/Button.tsx`
Impact: The dev team added the variant for admin panel needs. It isn't in DS PUCPR and could be changed or removed by design review.
Workaround: Usable, but it needs explicit design team approval before the component is considered stable.

## KI-008 · components · Surface variant names are appearance-based
Severity: medium · 2026-10-30
Where: `packages/cre-web-ui/src/layout/Surface/Surface.tsx`
Impact: `raised`, `sunken`, `overlay`, and similar names conflict with the DS semantic naming rule. Renaming them later is a breaking API change.
Workaround: Rename only after the design team proposes semantic equivalents.

## KI-009 · repo · Pre-monorepo scaffold remains at the repo root
Severity: low · 2026-10-30
Where: `src/`, `.storybook/`, `public/`, `index.html`, `vite.config.ts`, `tailwind.config.ts`, `README.md`, `debug-storybook.log`
Impact: Tracked leftovers from before the monorepo include a second Tailwind config that differs from the package's and duplicate primitives and stories. `README.md` is still the Vite template, so it says nothing about this project.
Workaround: Work only in `apps/` and `packages/`, and use `docs/architecture.md` as the entry point instead of the README.

## KI-010 · repo · Old package name remains in sandbox and Tailwind config text
Severity: low · 2026-10-30
Where: `apps/sandbox/app/layout.tsx`, `apps/sandbox/app/page.tsx`, `apps/sandbox/tailwind.config.ts`, `apps/storybook/tailwind.config.ts`
Impact: TASK-023 left `@cre/ui-kit` or `ui-kit` in the sandbox page metadata and visible text, and in two config comments. Behavior isn't affected.
Workaround: None needed.

## KI-011 · pipeline · Obsolete Windsurf wrappers are still tracked
Severity: low · 2026-10-30
Where: `.windsurf/skills/`
Impact: The pipeline upgrade replaced these wrappers with `.agents/skills/`, and `pipeline/skills/bootstrap.md` says to delete the folder. It can mislead a reader about which tools are in use.
Workaround: Ignore the folder.

## KI-012 · conventions · Code comments are in Portuguese despite the English rule
Severity: low · 2026-10-30
Where: `packages/cre-web-ui/src/`, `packages/cre-web-ui/tailwind.config.ts`
Impact: `docs/context/storybook.md` requires code comments in English, but many existing comments, including JSDoc shown in Storybook's Props tables, are in PT-BR.
Workaround: Follow the rule in new code, and don't translate existing comments outside a dedicated task.
