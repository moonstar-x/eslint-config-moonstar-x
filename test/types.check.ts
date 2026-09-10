/**
 * Compile-time check that the public API describes a usable configuration.
 * `npm run typecheck` fails if the shape of the exported rulesets regresses.
 */

import type { Linter } from 'eslint';
import thisConfig, { a11y, base, GLOB_SRC, ignores, node, react, stylistic, typescript } from '../src/index.js';
import type { Ruleset } from '../src/index.js';

const composed: Ruleset = [
  ...ignores,
  ...base,
  ...node,
  ...typescript,
  ...react,
  ...a11y(),
  ...stylistic
];

const { base: namespacedBase, ignores: namespacedIgnores } = thisConfig;

const viaNamespace: Linter.Config[] = [...namespacedIgnores, ...namespacedBase];

const globs: string[] = GLOB_SRC;

export { composed, globs, viaNamespace };
