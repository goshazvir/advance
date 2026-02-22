# Quickstart: Project README & Cleanup

**Branch**: `006-readme-cleanup`

## What This Feature Does

Cleans up the repository for production-ready presentation:
1. Deletes 5 internal reference screenshots from root directory
2. Rewrites README.md as a professional project overview

## Implementation Checklist

- [ ] Delete `img.png`, `img_1.png`, `img_2.png`, `img_3.png`, `img_4.png` from root
- [ ] Write new README.md with sections:
  - Project name and description
  - Live demo link: https://advance-orpin.vercel.app/home
  - Pages & User Flows (Home, Accounts, Transactions)
  - Architecture & Project Structure
  - Feature Specifications reference (specs/ directory)
  - Getting Started (prerequisites, install, dev)
- [ ] Verify no assignment-related language in README
- [ ] Verify no broken image references remain

## Key Constraints

- README ~80-120 lines, concise and scannable
- No "interview", "assignment", "task evaluating", "evaluated" language
- CLAUDE.md stays unchanged
- Professional tone throughout

## Files Changed

| File | Action |
|------|--------|
| `README.md` | Complete rewrite |
| `img.png` | Delete |
| `img_1.png` | Delete |
| `img_2.png` | Delete |
| `img_3.png` | Delete |
| `img_4.png` | Delete |

## Verification

```bash
# Check no images remain
ls img*.png 2>/dev/null  # Should return nothing

# Check no assignment language
grep -i "interview\|assignment\|evaluated\|homework\|challenge" README.md  # Should return nothing

# Ensure project still builds
yarn build
```
