# Sync Queue

Claude reads this file at the start of every session. If there are pending entries, Claude updates the listed files and then removes the entries before creating new tasks.

**Windsurf writes here. Claude reads and clears.**

---

## Pending Updates

<!-- Format: - `path/to/file.md` — what changed and why (from TASK-XXX) -->

- `docs/architecture.md` — package renamed from @cre/ui-kit to @cre/cre-web-ui, directory path updated (from TASK-023)
- `docs/context/cre-web-ui-package.md` — file renamed from ui-kit-package.md, package name references updated (from TASK-023)
