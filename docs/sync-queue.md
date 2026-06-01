# Sync Queue

Claude reads this file at the start of every session. If there are pending entries, Claude updates the listed files and then removes the entries before creating new tasks.

**Windsurf writes here. Claude reads and clears.**

---

## Pending Updates

<!-- Format: - `path/to/file.md` — what changed and why (from TASK-XXX) -->

- `docs/context/storybook.md` — TokenUsage component added to storybook-utils, update conventions if needed (from TASK-009)
- `docs/context/storybook.md` — Foundation token stories created, verify structure is accurate (from TASK-010)
