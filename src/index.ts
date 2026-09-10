import { a11y } from './configs/a11y.js';
import { base } from './configs/base.js';
import { browser } from './configs/browser.js';
import { ignores } from './configs/ignores.js';
import { jest } from './configs/jest.js';
import { node } from './configs/node.js';
import { react } from './configs/react.js';
import { sorted } from './configs/sorted.js';
import { stylisticJsx } from './configs/stylistic-jsx.js';
import { stylistic } from './configs/stylistic.js';
import { typescript, typescriptSyntaxOnly } from './configs/typescript.js';
import type { Ruleset } from './utils/types.js';

// Named Exports
export {
  a11y,
  base,
  browser,
  ignores,
  jest,
  node,
  react,
  sorted,
  stylistic,
  stylisticJsx,
  typescript,
  typescriptSyntaxOnly,
  type Ruleset
};
export * from './utils/globs.js';

// Config Interface
export interface MoonstarESLint {
  a11y: () => Ruleset;
  base: Ruleset;
  browser: Ruleset;
  ignores: Ruleset;
  jest: Ruleset;
  node: Ruleset;
  react: Ruleset;
  sorted: Ruleset;
  stylistic: Ruleset;
  stylisticJsx: Ruleset;
  typescript: Ruleset;
  typescriptSyntaxOnly: Ruleset;
}

// Single Default Export
const config: MoonstarESLint = {
  base,
  node,
  react,
  sorted,
  typescript,
  ignores,
  typescriptSyntaxOnly,
  stylistic,
  stylisticJsx,
  browser,
  jest,
  a11y
};

export default config;
