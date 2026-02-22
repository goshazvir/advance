# Research: Project README & Cleanup

**Feature**: 006-readme-cleanup
**Date**: 2026-02-22

## Research Tasks

### R1: Current README content analysis

**Decision**: Complete rewrite required
**Rationale**: Current README explicitly references "Interview Assignment" in the title, contains task descriptions with evaluation criteria, and embeds internal reference screenshots. None of this content is appropriate for a production-ready repository.
**Alternatives considered**:
- Partial edit (remove only assignment language) — rejected because the entire structure is organized around "Tasks" rather than features
- Keep screenshots in a `/docs` folder — rejected per user requirement to delete them entirely

### R2: README structure best practices

**Decision**: Follow a concise structure: project name + description, live demo link, pages & user flows, architecture overview, specs reference, getting started
**Rationale**: Industry-standard open-source README patterns prioritize: what it does, how to see it, how it's built, how to run it. This order matches the user's requirements.
**Alternatives considered**:
- Detailed API documentation in README — rejected (already in specs/ and Swagger docs)
- Screenshots in README — rejected (user requested image deletion; live demo link serves this purpose)

### R3: Assignment-related language audit

**Decision**: Only README.md contains assignment language; CLAUDE.md references are internal tooling and acceptable
**Rationale**: Searched for terms: "interview", "assignment", "task evaluating", "evaluated", "homework", "challenge". Found in README.md lines 1, 65-89. CLAUDE.md has "UI Reference Screenshots" section referencing the images but this is internal dev tooling not visible to casual visitors.
**Alternatives considered**:
- Also clean CLAUDE.md — rejected per spec FR-010 (CLAUDE.md must remain unchanged)

### R4: Image reference audit

**Decision**: Only README.md references the root-level images
**Rationale**: The 5 images (img.png through img_4.png) are referenced only in README.md via markdown image syntax. CLAUDE.md references them by description in a table but doesn't embed them. No source code files reference these images.
**Alternatives considered**: N/A — straightforward file deletion

### R5: Specs directory content for README reference

**Decision**: Reference all 5 feature specs with 1-2 line descriptions
**Rationale**: Each spec folder represents a completed feature. Brief descriptions help developers find relevant documentation.

| Folder | Description |
|--------|-------------|
| `001-account-drawer` | Account detail drawer with transaction history, opened by clicking an account row |
| `002-create-account` | Account creation form with validation, accessible from accounts dashboard |
| `003-move-money` | Money transfer between accounts with confirmation flow |
| `004-transactions-dashboard` | Global transactions view with search, sorting, and pagination |
| `005-home-dashboard` | Home dashboard with portfolio overview and financial summary widgets |

## Resolved Unknowns

No NEEDS CLARIFICATION items existed in the spec. All decisions are straightforward.
