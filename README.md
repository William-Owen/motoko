# Motoko

**Please note:** This project is very new; and work in progress. It is unlikely to be suitable for your project at this time.

A collection of React component and utilities that I find useful in post projects.

The name Motoko is drawn from Major Motoko Kusanagi, the iconic cyborg protagonist from the Manga and Anime Ghost in the Shell.

## Quick Start

This project prefers PNPM as the package manager.

```bash
pnpm install github:william-owen/motoko
```

```tsx
import { Page, PageTitle } from 'motoko'

const App = () => (
  <Page>
    <PageTitle title="Homepage" description="Welcome to the example webpage" />
  </Page>
)
```

## Development

```bash
pnpm run dev      # Start development (build + Storybook)
pnpm test         # Run tests in watch mode
pnpm run build    # Production build
```

## Tech Stack

**Core**: React 19, TypeScript 5, CSS Modules
**Build**: Tsup 8, Lightning CSS, Vite
**Quality**: Biome 2, Vitest 3, Cypress 14
**Docs**: Storybook 9, TypeDoc

## Project Structure

```
src/
├── components/          # Component implementations
│   └── Button/
│       ├── Button.tsx
│       ├── Button.module.scss
│       ├── Button.test.tsx
│       └── index.ts
├── styles/              # Design tokens
├── utils/               # Utilities
└── index.ts             # Main exports
```

## Component Standards

### API Pattern

```tsx
interface ComponentProps {
  /** Primary content */
  children: React.ReactNode
  /** Visual variant */
  variant?: 'primary' | 'secondary'
  /** Size preset */
  size?: 'small' | 'medium' | 'large'
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  )
)

Component.displayName = 'Component'
```

### Requirements

- **Accessibility**: WCAG 2.1 AA compliance
- **TypeScript**: Explicit types with JSDoc
- **Testing**: 85%+ coverage target
- **Styling**: CSS Modules with design tokens

## Available Scripts

### Development

- `pnpm run dev` - Start development environment
- `pnpm run storybook` - Component documentation
- `pnpm test` - Run tests in watch mode
- `pnpm run test:ui` - Visual test interface

### Quality

- `pnpm run check:fix` - Format and lint
- `pnpm run type-check` - TypeScript validation
- `pnpm run validate` - Package validation

### Build & Release

- `pnpm run build` - Production build
- `pnpm run changeset` - Create release changeset
- `pnpm run changeset:publish` - Publish to pnpm

## Development Workflow

You can scaffold new components with `pnpm gen` which triggers a Plop generation script.

1. **Create Component**: `src/components/ComponentName/`
2. **Implement Tests**: `ComponentName.test.tsx`
3. **Add Stories**: `stories/ComponentName.stories.tsx`
4. **Export**: Add to `src/index.ts`

### Git Conventions

- **Branches**: `feature/component-name`, `fix/issue-description`
- **Commits**: Conventional commits format
- **Pre-commit**: Automatic linting, formatting, type checking

## Package Configuration

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

## Testing Strategy

- **Unit**: Vitest with React Testing Library
- **Visual**: Storybook + Chromatic
- **Integration**: Cypress for workflows
- **Performance**: Bundle size validation

## Performance Features

- Tree-shaking friendly exports
- ESM/CJS dual package support
- External React dependencies
- Lightning CSS optimization
- Vitest (15-25x faster than Jest)

## Known Issues

### TypeScript 5.8

**Issue**: Storybook compatibility
**Workaround**: Using TypeScript 5.7.2

### CSS Modules in Tsup

**Issue**: Experimental support
**Workaround**: `@os023/tsup-css-module` plugin

## Contributing

### Code Review Checklist

- [ ] TypeScript types are explicit
- [ ] Tests cover behavior and edge cases
- [ ] Storybook stories show all variants
- [ ] Accessibility requirements met
- [ ] Documentation complete

### Requirements

- **Junior**: HTML/CSS/JS fundamentals, basic React
- **Mid-level**: TypeScript proficiency, testing experience
- **Senior**: Build tooling, performance optimization

## License

MIT © William Owen - [WO.DEV](http://WO.DEV)

---

## Detailed Documentation

<details>
<summary>Advanced Configuration</summary>

### Tsup Configuration

```typescript
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: {
    '.module.scss': 'local-css',
    '.scss': 'css'
  }
})
```

### Design System Integration

- Design tokens via CSS custom properties
- 4px base spacing scale
- Typography scale with rem units
- Semantic color naming
- Responsive breakpoint support

</details>

<details>

<summary>CI/CD Pipeline</summary>

### Pull Request Checks
1. Code Quality (Biome)
2. Type Safety (TypeScript)
3. Full test suite
4. Successful build
5. Package validation

### Release Process
1. Changeset creation
2. Automated versioning
3. Changelog generation
4. pnpm publication
5. GitHub release

</details>

<details>

<summary>Security & Dependencies</summary>

### Security Measures

- Automated dependency updates
- pnpm audit in CI
- GitHub security advisories
- CodeQL analysis
- Verified package signatures

### Dependency Management

- Renovate/Dependabot integration
- License compliance checking
- Supply chain security
- Scoped pnpm tokens

</details>
