---
id: TASK-004
title: Export Textarea from @cre/ui-kit public API
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/ui-kit-package.md
doc-impact:
  - docs/context/ui-kit-package.md
export-impact: []
---

## Description

`Textarea` is fully implemented inside `packages/ui-kit/src/primitives/Input/Input.tsx` and exported from `packages/ui-kit/src/primitives/Input/index.ts`, but it is missing from the git commit history notes and the package was referenced as missing. Verify whether `Textarea` is actually exported from the package's public entry point and, if not, add the export.

## Acceptance Criteria

- [ ] Verify `src/primitives/Input/index.ts` — confirm `Textarea` is exported
- [ ] Verify `src/primitives/index.ts` — confirm `Input` (which re-exports `Textarea`) is listed
- [ ] If either export is missing, add it
- [ ] Verify `@cre/ui-kit` public API exports `Textarea` by checking `dist/index.d.ts` after `pnpm build`
- [ ] `Input.stories.tsx` — confirm `Textarea` has its own story; if not, add a minimal one following the PendingReview pattern in `docs/context/storybook.md`
- [ ] No other files changed

## Relevant Data

Current `src/primitives/Input/Input.tsx` exports:
- `Input` component
- `Textarea` component
- `InputStatus` type
- `InputProps` interface
- `TextareaProps` interface

Check `src/primitives/Input/index.ts` to see what is currently re-exported.

`Textarea` props surface:
```ts
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  status?: InputStatus
  showCount?: boolean   // requires maxLength
  fullWidth?: boolean
}
```

**Note:** If completing TASK-003 first, the file paths above will have changed to `src/components/Input/`. Update paths accordingly.
