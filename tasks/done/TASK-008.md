---
id: TASK-008
title: Fix incorrect story title categories (Feedback, Forms, Surfaces)
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/context/design-system-decisions.md
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

Three story files currently use categories (`Feedback/`, `Forms/`, `Surfaces/`) that are not part of the DS hierarchy. These are context-based groupings that conflict with the design team's structural classification.

Change their `title` field to match the canonical category from the DS glossary. No file moves are needed — the files are already in the correct folder.

| File | Current title | Correct title | Reason |
|---|---|---|---|
| `apps/storybook/src/stories/components/Alert.stories.tsx` | `'Feedback/Alert'` | `'Components/Alert'` | Alert is a single display unit — a Component |
| `apps/storybook/src/stories/components/Input.stories.tsx` | `'Forms/Input'` | `'Components/Input'` | Form inputs are Components; "Forms" groups by context, not structure |
| `apps/storybook/src/stories/layout/Surface.stories.tsx` | `'Surfaces/Surface'` | `'Layout/Surface'` | Surface is explicitly a spatial/structural primitive — Layout |

## Acceptance Criteria

- [ ] `Alert.stories.tsx` `title` is `'Components/Alert'`
- [ ] `Input.stories.tsx` `title` is `'Components/Input'`
- [ ] `Surface.stories.tsx` `title` is `'Layout/Surface'`
- [ ] No other changes made to these files
- [ ] Storybook sidebar no longer shows `Feedback`, `Forms`, or `Surfaces` top-level categories

## Relevant Data

Valid Storybook categories (from `docs/context/storybook.md`):

```
Layout/<Name>      — spatial/structural primitives
Components/<Name>  — interactive and display components
Blocks/<Name>      — complex multi-component blocks
Foundation/<Name>  — token demonstrations only
```

Never nest deeper than one level (`Components/Button`, not `Components/Forms/Button`).
