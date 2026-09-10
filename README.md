# @moonstar-x/eslint-config

Strict, composable ESLint 10 flat configurations for JavaScript, TypeScript, Node.js and React projects.

Instead of shipping one monolithic preset, this package exposes a set of small modules that you spread into your own
`eslint.config.js`. You pick the environment (Node, browser), the language (JavaScript, TypeScript), and how opinionated
you want to be about layout (`stylistic`, `sorted`) — nothing is bundled in that you did not ask for.

- **Strict by default.** Every rule that upstream presets ship as `warn` is escalated to `error`. A lint run either
  passes or it does not.
- **Correctness and formatting are separate.** `base` contains only correctness, safety and modern-syntax rules, so a
  project using a dedicated formatter can skip `stylistic` entirely.
- **Every block is named.** All config objects are namespaced under `moonstar-x/`, so `eslint --inspect-config` and
  error output tell you exactly which module turned a rule on.

## Requirements

|            |                                                       |
|------------|-------------------------------------------------------|
| Node.js    | `^20.19.0 \|\| ^22.13.0 \|\| >=24`                    |
| ESLint     | `^10.0.0` (flat config only)                          |
| TypeScript | `>=5.0.0` — optional, only for the TypeScript modules |

## Installation

```shell
npm install --save-dev @moonstar-x/eslint-config eslint
```

Every plugin the configs depend on is a direct dependency of this package, with two optional exceptions:

```shell
# Only if you use the a11y module.
npm install --save-dev eslint-plugin-jsx-a11y

# Only if you write your ESLint config in TypeScript.
npm install --save-dev jiti
```

## Quick start

### Node.js + TypeScript

```javascript
// eslint.config.js
import { base, ignores, node, sorted, stylistic, typescript } from '@moonstar-x/eslint-config';

export default [
  ...ignores,
  ...base,
  ...typescript,
  ...node,
  ...stylistic,
  ...sorted
];
```

### React + TypeScript

```javascript
// eslint.config.js
import {
  a11y,
  base,
  browser,
  ignores,
  react,
  sorted,
  stylistic,
  stylisticJsx,
  typescript
} from '@moonstar-x/eslint-config';

export default [
  ...ignores,
  ...base,
  ...typescript,
  ...browser,
  ...react,
  ...a11y(),
  ...stylistic,
  ...stylisticJsx,
  ...sorted
];
```

### Plain JavaScript

```javascript
// eslint.config.js
import { base, ignores, sorted, stylistic } from '@moonstar-x/eslint-config';

export default [...ignores, ...base, ...stylistic, ...sorted];
```

### Default export

Every module is also reachable through the default export, which is convenient when you would rather not import a dozen
names:

```javascript
import moonstar from '@moonstar-x/eslint-config';

export default [
  ...moonstar.ignores,
  ...moonstar.base,
  ...moonstar.typescript,
  ...moonstar.node
];
```

## Modules

| Module | Applies to | What it does |
| --- | --- | --- |
| `ignores` | — | Global ignores for `node_modules`, build output, coverage, framework caches and lock files. Spread it first. |
| `base` | all source files | The strict JavaScript foundation: core ESLint rules plus `unicorn`, `promise`, `regexp` and `import-x`. Everything else builds on this. |
| `typescript` | `.ts` / `.tsx` | Fully type-aware rules built on `strictTypeChecked`. Requires a `tsconfig.json`. |
| `typescriptSyntaxOnly` | `.ts` / `.tsx` | The same rules minus everything that needs the type checker, for files no `tsconfig.json` covers. |
| `node` | all source files | Node globals and `eslint-plugin-n`, with relaxations for `bin/` and `scripts/`. |
| `browser` | all source files | DOM globals, plus restrictions that only make sense for code shipped to a user agent. |
| `react` | all source files | `@eslint-react` correctness rules and the official `react-hooks` rules. |
| `a11y()` | all source files | `eslint-plugin-jsx-a11y` on its `strict` preset. A **function**, not an array — see below. |
| `jest` | test files | `eslint-plugin-jest`, scoped to tests only. |
| `stylistic` | all source files | Formatting and layout, via `@stylistic`. Skip it if you use a formatter. |
| `stylisticJsx` | `.jsx` / `.tsx` | JSX formatting. Kept separate so non-JSX projects never load it. |
| `sorted` | all source files | Deterministic ordering of imports, exports, class members and type constituents, via `perfectionist`. |

### Composition order

Later blocks win, so order matters:

1. `ignores` first, so every later block inherits the exclusions.
2. `base` next — it is the foundation the rest assume.
3. Language and environment modules (`typescript`, `node`, `browser`, `react`, `jest`).
4. Layout modules (`stylistic`, `stylisticJsx`, `sorted`) last.
5. Your own overrides after all of it.

### TypeScript: type-aware or not

`typescript` enables rules that need type information (`no-unsafe-argument`, `no-floating-promises`, and friends). It
relies on the TypeScript project service, which discovers the nearest `tsconfig.json` from each linted file — no
`parserOptions.project` wiring needed.

If some files are not part of any TypeScript project, use `typescriptSyntaxOnly` instead. It trades the type-aware
checks for the ability to lint anything.

```javascript
import { base, ignores, typescriptSyntaxOnly } from '@moonstar-x/eslint-config';

export default [...ignores, ...base, ...typescriptSyntaxOnly];
```

### Accessibility is opt-in

`a11y` is a function because `eslint-plugin-jsx-a11y` is an optional peer dependency — calling it is what triggers the
load, so projects that skip accessibility linting never need the package installed:

```javascript
import { a11y } from '@moonstar-x/eslint-config';

export default [...a11y()];
```

It throws a descriptive error if the plugin is not installed. The lookup checks this package's own dependencies first
and then the project being linted, which is what makes it work under pnpm and inside monorepos.

## Overriding rules

Append your own flat config blocks after the spread modules:

```javascript
import { base, ignores, node, typescript } from '@moonstar-x/eslint-config';

export default [
  ...ignores,
  ...base,
  ...typescript,
  ...node,
  {
    name: 'my-project/overrides',
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    name: 'my-project/scripts',
    files: ['scripts/**/*.ts'],
    rules: {
      'n/no-process-exit': 'off'
    }
  }
];
```

### Glob helpers

The globs the modules use internally are exported too, so your overrides can target the same file sets:

```javascript
import { GLOB_JSX_ALL, GLOB_SRC, GLOB_TESTS, GLOB_TYPESCRIPT } from '@moonstar-x/eslint-config';
```

Available: `GLOB_JS`, `GLOB_JSX`, `GLOB_TS`, `GLOB_TSX`, `GLOB_JAVASCRIPT`, `GLOB_TYPESCRIPT`, `GLOB_JSX_ALL`,
`GLOB_SRC`, `GLOB_MODULE`, `GLOB_DTS`, `GLOB_COMMONJS`, `GLOB_CONFIG_FILES`, `GLOB_TESTS`, `GLOB_EXCLUDED`.

### TypeScript types

The package is written in TypeScript and ships its declarations. Each module is a `Ruleset` (an alias for
`Linter.Config[]`), which is also exported:

```typescript
import type { Linter } from 'eslint';
import { base, ignores, type Ruleset } from '@moonstar-x/eslint-config';

const config: Ruleset = [...ignores, ...base];

export default config satisfies Linter.Config[];
```

## Style conventions

For the record, what `stylistic` and `sorted` enforce:

- Two-space indentation, single quotes (double in JSX attributes), semicolons always, 1TBS braces.
- No trailing commas.
- A 180-character line limit, ignoring strings, template literals, regular expressions and URLs.
- Imports and exports sorted naturally and case-insensitively, grouped builtin → external → internal → relative.
- Object literals are **not** sorted — reordering them reads worse than the order the author chose.
