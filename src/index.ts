import { base } from './configs/base.js'
import { node } from './configs/node.js';
import { typescript, typescriptSyntaxOnly } from './configs/typescript.js';
import type { Ruleset } from './utils/types.js';

// Named Exports
export {
  base,
  node,
  typescript,
  typescriptSyntaxOnly,
  type Ruleset
}

// Config Interface
export interface MoonstarESLint {
  base: Ruleset;
  node: Ruleset;
  typescript: Ruleset;
  typescriptSyntaxOnly: Ruleset;
}

// Single Default Export
const config: MoonstarESLint = {
  base,
  node,
  typescript,
  typescriptSyntaxOnly
};

export default config;
