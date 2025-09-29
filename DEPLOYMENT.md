# Deployment Guidelines

## Pre-Commit Checklist

Before pushing any changes to GitHub (which triggers Netlify deployment), always run:

```bash
npm run precommit
```

This command will:
1. **Type Check** - Verify all TypeScript types are correct
2. **Lint** - Check for any ESLint errors or warnings
3. **Build** - Ensure the production build compiles successfully

## Individual Commands

You can also run checks individually:

```bash
# TypeScript type checking
npm run typecheck

# ESLint linting
npm run lint

# Production build
npm run build
```

## Quick Fix Commands

If you encounter issues:

```bash
# Auto-fix ESLint issues (when possible)
npx eslint . --fix

# Check for TypeScript errors with details
npx tsc --noEmit --pretty
```

## Netlify Deploy Requirements

Netlify will fail deployment if:
- TypeScript compilation errors exist
- Build process fails
- Runtime errors in production build

Always ensure `npm run build` succeeds locally before pushing to GitHub.