# Implementation Plan: Project README & Cleanup

**Branch**: `006-readme-cleanup` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-readme-cleanup/spec.md`

## Summary

Clean up the repository for production-ready presentation: delete internal reference screenshots from root, rewrite README.md as a professional project overview with pages/flows, architecture, specs reference, and live demo link. No application code changes — documentation and file cleanup only.

## Technical Context

**Language/Version**: N/A (documentation changes only — Markdown files)
**Primary Dependencies**: N/A
**Storage**: N/A
**Testing**: Manual review — verify no broken links, no assignment language, no orphaned image references
**Target Platform**: GitHub repository (rendered Markdown)
**Project Type**: Web application (Next.js) — this feature is documentation-only
**Performance Goals**: N/A
**Constraints**: README should be ~80-120 lines, concise and scannable
**Scale/Scope**: 2 files modified (README.md rewritten, images deleted), 0 source code files changed

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Applies? | Status | Notes |
|-----------|----------|--------|-------|
| I. Two-Hop API Proxy | No | PASS | No API changes |
| II. Server-Authoritative Financial Data | No | PASS | No mutations or data changes |
| III. Flexx Component Library First | No | PASS | No UI component changes |
| IV. React Query v3 Conventions | No | PASS | No query changes |
| V. Type Safety & Lint Compliance | No | PASS | No TypeScript changes; README is Markdown only |
| VI. Simplicity & YAGNI | Yes | PASS | Minimal changes — only what's needed (delete images, rewrite README) |

**Gate result**: PASS — all principles satisfied or not applicable.

## Project Structure

### Documentation (this feature)

```text
specs/006-readme-cleanup/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0: content research
├── quickstart.md        # Phase 1: implementation quick reference
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
# Files to DELETE:
img.png                  # Account drawer screenshot (internal reference)
img_1.png                # Account drawer full view screenshot
img_2.png                # Create account drawer screenshot
img_3.png                # Move money drawer screenshot
img_4.png                # Transactions dashboard screenshot

# Files to REWRITE:
README.md                # Complete rewrite — professional project overview

# Files UNCHANGED:
CLAUDE.md                # Internal development tooling — no changes
specs/                   # All existing feature specs — no changes
src/                     # All source code — no changes
```

**Structure Decision**: No new files or directories in source code. Only root-level cleanup (image deletion) and README rewrite.

## Complexity Tracking

No constitution violations. No complexity justification needed.
