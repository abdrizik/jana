# TypeScript Package Template

A minimal TypeScript package template with ES modules support.

## Features

- ✅ TypeScript with strict mode
- ✅ ES Modules only (no CommonJS)
- ✅ Build with tsdown
- ✅ GitHub Actions CI/CD
- ✅ Auto-publish on npm

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Type check
pnpm typecheck

# Watch mode
pnpm dev
```

## Publishing

### First Time Setup

1. **Manual publish** (first time only):
   ```bash
   pnpm publish
   ```

2. **Connect GitHub to npm**:
   - Go to `https://www.npmjs.com/package/<your-package-name>/access`
   - Connect your GitHub repository
   - Enable trusted publishing

### Future Releases

After the first setup, releases are automated:

```bash
# Create a version tag
git tag v1.0.0
git push --tags

# GitHub Actions will automatically:
# - Build the package
# - Publish to npm
```

## License

MIT
