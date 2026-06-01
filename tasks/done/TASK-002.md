---
id: TASK-002
title: Extract storybook dev utilities out of packages/ui-kit
status: done
model: medium
model-name: GPT-5.2
context:
  - docs/architecture.md
  - docs/context/ui-kit-package.md
doc-impact:
  - docs/context/ui-kit-package.md
export-impact: []
---

## Description

`packages/ui-kit/src/storybook/PendingReview.tsx` is a Storybook-specific dev utility living inside the publishable library's source tree. While it is not exposed in the public API (it is not re-exported from `src/index.ts`), it is a storybook concern, not a library concern.

Additionally, `packages/ui-kit/src/styles/globals.css` and `apps/storybook/src/styles/globals.css` are identical files. The storybook app imports its own copy (`apps/storybook/.storybook/preview.tsx` → `../src/styles/globals.css`) while the package's copy sits unused internally. This is a duplication that creates a drift risk.

This task addresses both issues:

1. **Create `packages/storybook-utils/`** — a new private workspace package that owns all storybook-specific dev utilities. Move `PendingReview` there.
2. **Update all story file imports** — story files in `packages/ui-kit/src/` currently import `PendingReview` from a relative path (`../../storybook/PendingReview`). Update them to import from `@cre/storybook-utils`.
3. **Consolidate globals.css** — update `apps/storybook/.storybook/preview.tsx` to import `globals.css` from the package source instead of the storybook app's own copy. Delete the storybook app's duplicate.

## Acceptance Criteria

- [x] `packages/storybook-utils/` exists with a valid `package.json` (`name: "@cre/storybook-utils"`, `private: true`) and `src/index.ts` that exports `PendingReview`
- [x] `PendingReview.tsx` is moved to `packages/storybook-utils/src/PendingReview.tsx` with no changes to its interface or behavior
- [x] `packages/ui-kit/src/storybook/` folder is deleted
- [x] All `*.stories.tsx` files in `packages/ui-kit/` import `PendingReview` from `@cre/storybook-utils`
- [x] `@cre/storybook-utils` is listed as a devDependency in `packages/ui-kit/package.json`
- [x] `@cre/storybook-utils` is listed as a devDependency in `apps/storybook/package.json`
- [x] `apps/storybook/.storybook/preview.tsx` imports `globals.css` from `@cre/ui-kit/src/styles/globals.css` (workspace path) instead of `../src/styles/globals.css`
- [x] `apps/storybook/src/styles/globals.css` is deleted
- [x] Storybook builds and runs without errors
- [x] TypeScript compiles without errors in all packages

## Relevant Data

### Current import pattern in story files
```ts
import { PendingReview } from '../../storybook/PendingReview'
```

### Target import pattern
```ts
import { PendingReview } from '@cre/storybook-utils'
```

### Current preview.tsx import
```ts
// apps/storybook/.storybook/preview.tsx
import '../src/styles/globals.css'
```

### Target preview.tsx import
```ts
// apps/storybook/.storybook/preview.tsx
import '@cre/ui-kit/src/styles/globals.css'
```

### New package structure
```
packages/storybook-utils/
├── package.json        (name: "@cre/storybook-utils", private: true, type: module)
├── tsconfig.json       (extend from root tsconfig if it exists, or basic react tsconfig)
└── src/
    ├── index.ts        (export * from './PendingReview')
    └── PendingReview.tsx
```

### Story files that need import updates (all in packages/ui-kit/src/primitives/)
- ActionButton/ActionButton.stories.tsx
- Alert/Alert.stories.tsx
- Badge/Badge.stories.tsx
- Box/Box.stories.tsx
- Button/Button.stories.tsx
- Container/Container.stories.tsx
- Grid/Grid.stories.tsx
- HierarchicalTable/HierarchicalTable.stories.tsx
- Input/Input.stories.tsx
- Modal/Modal.stories.tsx
- Sidebar/Sidebar.stories.tsx
- Stack/Stack.stories.tsx
- Surface/Surface.stories.tsx
- Table/Table.stories.tsx

### PendingReview interface (do not change)
```ts
interface PendingReviewProps {
  component: string
  items: string[]
  notes?: string
  children?: ReactNode
}
```
