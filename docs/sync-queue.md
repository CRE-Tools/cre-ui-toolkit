# Sync Queue

The architect reads this file at the start of every session. If there are pending entries, update the listed files and remove the entries before creating new tasks.

**Executor writes here. Architect reads and clears.**

---

## Pending Updates

<!-- Format: - `path/to/file.md` — what changed and why (from TASK-XXX) -->
