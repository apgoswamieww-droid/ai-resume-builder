# Development TODO

## Purpose

This document tracks the current development work for the AI Resume Builder project.

It serves as a centralized task list for planning, prioritization, and progress tracking.

Unlike other documentation, this document is expected to change frequently as development progresses.

---

# Task Status

Each task should have one of the following statuses:

- ⏳ Planned
- 🚧 In Progress
- ✅ Completed
- ⏸ On Hold
- ❌ Cancelled

Only one status should be assigned to each task.

---

# Current Sprint

## High Priority

### Authentication & Database Foundation

- ✅ Set up Auth.js (NextAuth v5) + GitHub OAuth Provider
- ✅ Connect PostgreSQL database & sync schema (`npx prisma db push`)
- ✅ Define complete Resume data schema (`Resume`, `PersonalInfo`, `WorkExperience`, `Education`, `Skill`, `Project`, `Certification`, `CustomSection`)
- ✅ Create global Prisma singleton & TypeScript type definitions
- ⏳ Session management & Protected Routes

---

### Resume Management & Dashboard

- ✅ Create resume (Server Action + Modal)
- ✅ Resume dashboard (`/dashboard`)
- ✅ Delete resume (Server Action + Card context menu)
- ✅ Duplicate resume (Server Action + Card context menu)
- ⏳ Resume Editor / Builder UI (`/builder/[id]`)

---

### Resume Builder

- ⏳ Resume editor
- ⏳ Section management
- ⏳ Drag-and-drop section ordering
- ⏳ Live preview

---

# Medium Priority

### Templates

- ⏳ Default resume templates
- ⏳ Template switching
- ⏳ Template preview

---

### AI Features

- ⏳ Resume summary generation
- ⏳ Experience improvement
- ⏳ Skills suggestions
- ⏳ Grammar improvements

---

### Export

- ⏳ PDF generation
- ⏳ Print optimization

---

# Low Priority

- ⏳ Dark mode
- ⏳ Multi-language support
- ⏳ Keyboard shortcuts
- ⏳ Accessibility improvements

---

# Technical Improvements

- ⏳ Improve project structure
- ⏳ Reduce code duplication
- ⏳ Improve performance
- ⏳ Increase test coverage
- ⏳ Improve error handling
- ⏳ Optimize bundle size

---

# Documentation Tasks

- ⏳ Keep documentation updated
- ⏳ Document major decisions
- ⏳ Review outdated documentation

---

# Bug Tracking

Record bugs using the following format:

| ID | Priority | Description | Status |
|----|----------|-------------|--------|
| BUG-001 | High | Example bug description | Planned |

---

# Future Ideas

Icebox

These ideas have potential but are intentionally not prioritized.

They should only move into active development after business evaluation.

---

# Definition of Done

A task should only be marked as **Completed** when:

- Requirements are fully implemented.
- The solution has been tested.
- No known critical issues remain.
- Documentation has been updated where necessary.
- The implementation is ready for production use.

---

# Maintenance

This document should be reviewed regularly.

Completed tasks should be marked accordingly, obsolete tasks removed, and priorities adjusted as project requirements evolve.

---

# Scope

This document is intended solely for tracking active development work.

Project vision, feature definitions, architecture, coding standards, and implementation guidelines are documented separately.