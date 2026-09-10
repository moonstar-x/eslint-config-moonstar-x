import { base } from './configs/base.js'
import { node } from './configs/node.js';
import { react } from './configs/react.js';
import { sorted } from './configs/sorted.js';
import { ignores } from './configs/ignores.js';
import { browser } from './configs/browser.js';
import { jest } from './configs/jest.js';
import { a11y } from './configs/a11y.js';
import { typescript, typescriptSyntaxOnly } from './configs/typescript.js';
import { stylisticJsx } from './configs/stylistic-jsx.js';
import { stylistic } from './configs/stylistic.js';
import type { Ruleset } from './utils/types.js';

// Named Exports
export {
  base,
  node,
  react,
  sorted,
  ignores,
  typescript,
  typescriptSyntaxOnly,
  stylistic,
  stylisticJsx,
  browser,
  jest,
  a11y,
  type Ruleset
}
export * from './utils/globs.js';

// Config Interface
export interface MoonstarESLint {
  base: Ruleset;
  node: Ruleset;
  react: Ruleset;
  sorted: Ruleset;
  ignores: Ruleset;
  typescript: Ruleset;
  stylistic: Ruleset;
  stylisticJsx: Ruleset;
  typescriptSyntaxOnly: Ruleset;
  browser: Ruleset;
  jest: Ruleset;
  a11y: () => Ruleset;
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
