---
id: TASK-023
title: Rename package ui-kit → cre-web-ui
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/architecture.md
doc-impact:
  - docs/architecture.md
  - docs/context/cre-web-ui-package.md
export-impact: []
---

## Description

Rename the published library package from `@cre/ui-kit` (at `packages/ui-kit/`) to `@cre/cre-web-ui` (at `packages/cre-web-ui/`). This is a pure mechanical rename — no logic changes.

The package directory itself must be renamed so the workspace path matches the new name. All internal references across the monorepo must be updated to point to the new name/path.

## Acceptance Criteria

- [ ] Directory `packages/ui-kit/` is renamed to `packages/cre-web-ui/` (use `git mv` to preserve history)
- [ ] `packages/cre-web-ui/package.json` has `"name": "@cre/cre-web-ui"`
- [ ] Root `package.json` build script references `@cre/cre-web-ui`
- [ ] `apps/sandbox/package.json` dependency is `"@cre/cre-web-ui": "workspace:*"`
- [ ] `apps/storybook/package.json` dependency is `"@cre/cre-web-ui": "workspace:*"`
- [ ] `apps/sandbox/next.config.ts` transpilePackages entry is `@cre/cre-web-ui`
- [ ] Both `tailwind.config.ts` files (sandbox and storybook) reference `../../packages/cre-web-ui/...`
- [ ] `apps/storybook/.storybook/preview.tsx` CSS import is `@cre/cre-web-ui/src/styles/globals.css`
- [ ] All 13 story + app files import from `@cre/cre-web-ui` instead of `@cre/ui-kit`
- [ ] `pnpm install` runs successfully and `pnpm-lock.yaml` is updated
- [ ] `pnpm build` (root) succeeds
- [ ] Old file `docs/context/ui-kit-package.md` is renamed to `docs/context/cre-web-ui-package.md` with all internal references updated to `@cre/cre-web-ui` / `packages/cre-web-ui/`

## Relevant Data

### Files to change

#### Directory rename (do first)
```
git mv packages/ui-kit packages/cre-web-ui
```

#### packages/cre-web-ui/package.json — line 2
```json
"name": "@cre/cre-web-ui",
```

#### packages/cre-web-ui/src/index.ts — line 1 comment
```ts
// Ponto de entrada público do @cre/cre-web-ui
```

#### package.json (root) — build script
```json
"build": "pnpm --filter @cre/cre-web-ui build",
```

#### apps/sandbox/package.json — dependencies
```json
"@cre/cre-web-ui": "workspace:*",
```
(remove `"@cre/ui-kit"` entry)

#### apps/storybook/package.json — dependencies
```json
"@cre/cre-web-ui": "workspace:*",
```
(remove `"@cre/ui-kit"` entry)

#### apps/sandbox/next.config.ts
```ts
transpilePackages: ['@cre/cre-web-ui'],
```

#### apps/storybook/tailwind.config.ts
Change path references from `../../packages/ui-kit/...` to `../../packages/cre-web-ui/...`

#### apps/sandbox/tailwind.config.ts
Change path references from `../../packages/ui-kit/...` to `../../packages/cre-web-ui/...`

#### apps/storybook/.storybook/preview.tsx
```ts
import '@cre/cre-web-ui/src/styles/globals.css'
```

#### Story/app files — change all `from '@cre/ui-kit'` → `from '@cre/cre-web-ui'`
- `apps/storybook/src/stories/layout/Surface.stories.tsx`
- `apps/storybook/src/stories/layout/Stack.stories.tsx`
- `apps/storybook/src/stories/layout/Grid.stories.tsx`
- `apps/storybook/src/stories/layout/Container.stories.tsx`
- `apps/storybook/src/stories/layout/Box.stories.tsx`
- `apps/storybook/src/stories/components/ActionButton.stories.tsx`
- `apps/storybook/src/stories/components/Alert.stories.tsx`
- `apps/storybook/src/stories/components/Input.stories.tsx`
- `apps/storybook/src/stories/components/Button.stories.tsx`
- `apps/storybook/src/stories/blocks/Modal.stories.tsx`
- `apps/storybook/src/stories/blocks/Table.stories.tsx`
- `apps/storybook/src/stories/blocks/Sidebar.stories.tsx`
- `apps/storybook/src/stories/blocks/HierarchicalTable.stories.tsx`
- `apps/sandbox/app/page.tsx`

#### Docs rename
```
git mv docs/context/ui-kit-package.md docs/context/cre-web-ui-package.md
```
Then do a global find-replace inside that file: `@cre/ui-kit` → `@cre/cre-web-ui`, `packages/ui-kit/` → `packages/cre-web-ui/`.

### After all edits
Run:
```
pnpm install
pnpm build
```
Both must succeed.
