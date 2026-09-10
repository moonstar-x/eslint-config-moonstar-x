import { base } from './configs/base.js'
import { node } from './configs/node.js';
import { react } from './configs/react.js';
import { typescript, typescriptSyntaxOnly } from './configs/typescript.js';
import type { Ruleset } from './utils/types.js';

// Named Exports
export {
  base,
  node,
  react,
  typescript,
  typescriptSyntaxOnly,
  type Ruleset
}

// Config Interface
export interface MoonstarESLint {
  base: Ruleset;
  node: Ruleset;
  react: Ruleset;
  typescript: Ruleset;
  typescriptSyntaxOnly: Ruleset;
}

// Single Default Export
const config: MoonstarESLint = {
  base,
  node,
  react,
  typescript,
  typescriptSyntaxOnly
};

export default config;
