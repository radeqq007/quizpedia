# Contributing to Quizpedia

Thanks for your interest in contributing! This document covers everything you need to get started.

## Getting Started

**Prerequisites:** Node.js 18+, pnpm

```sh
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/quizpedia.git
cd quizpedia

# Install dependencies
pnpm install

# Set up enviorment variables
cp .env.example .env
# Edit .env and set VITE_BACKEND_URL to your backend URL
# See https://github.com/radeqq007/quizpedia-backend for backend setup

# Start the dev server
pnpm dev
```

The app will be running at `http://localhost:5173`.

## Development Workflow

1. Create a branch for your change:
```sh
git switch -c fix/my-bug-fix
#or
git switch -c feat/my-new-feature
```

2. Make your changes and verify everything works:

```sh
pnpm dev      # check it in the browser
pnpm build    # make sure it compiles
pnpm lint     # check for lint errors
```

3. Commit your changes (see [commit conventions](#commit-conventions) below).

4. Push your branch and open a pull request against main

### Commit Conventions

This project uses a simple conventional commits style:
 
| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `refactor:` | Code changes that aren't features or fixes |
| `style:` | Formatting, whitespace, CSS tweaks |
| `docs:` | Documentation only |
| `chore:` | Tooling, dependencies, config |
 
Example: `feat: add German Wikipedia language support`

For more, see the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)

## Code Style
Formatting and linting are handled by [Biome](https://biomejs.dev). A pre-commit hook (via Husky + lint-staged) runs automatically on staged files, so you don't need to think about it too much.

To check and fix manually:
 
```sh
pnpm lint    # check for issues
pnpm fix     # auto-fix lint issues
pnpm format  # format files
```

A few conventions used in the codebase worth following:

- Components live in `src/components/`, grouped by feature (e.g. `quiz/`, `search/`, `share/`)
- Pages live in `src/pages/`
- Custom hooks live in `src/hooks/`
- Shared types are in `src/types/index.ts`
- Prefer small, focused components and hooks over large files
- Use Tailwind utility classes for styling; avoid inline `style` props unless necessary (e.g. dynamic values)
- Use shadcn/ui for components

  
## Submitting Changes
 
When opening a pull request:
 
- Give it a clear title following the commit convention (e.g. `feat: add Dark/Light mode toggle`)
- Briefly describe what changed and why
- If it fixes an open issue, reference it with `Closes #123`
- Keep PRs focused — one feature or fix per PR makes review much faster

## Reporting Bugs
 
Open an issue on [GitHub](https://github.com/radeqq007/quizpedia/issues) and include:
 
- A clear description of the problem
- Steps to reproduce it
- What you expected to happen vs. what actually happened
- Browser and OS if it looks like a rendering or compatibility issue
## Suggesting Features
 
Feature requests are welcome — open an issue and describe:
 
- What you'd like to see
- Why it would be useful
- Any ideas on how it could work
---
 
Questions? Reach out at [radoslaw.kaczmarczyk@proton.me](mailto:radoslaw.kaczmarczyk@proton.me) or open an issue.

