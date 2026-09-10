import { base } from './configs/base.js'
import { node } from './configs/node.js';
import { react } from './configs/react.js';
import { sorted } from './configs/sorted.js';
import { ignores } from './configs/ignores.js';
import { typescript, typescriptSyntaxOnly } from './configs/typescript.js';
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
  typescriptSyntaxOnly
};

export default config;
