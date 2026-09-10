import { base } from './configs/base.js'
import { typescript, typescriptSyntaxOnly } from './configs/typescript.js';
import type { Ruleset } from './utils/types.js';

// Named Exports
export {
  base,
  typescript,
  typescriptSyntaxOnly,
  type Ruleset
}

// Config Interface
export interface MoonstarESLint {
  base: Ruleset;
  typescript: Ruleset;
  typescriptSyntaxOnly: Ruleset;
}

// Single Default Export
const config: MoonstarESLint = {
  base,
  typescript,
  typescriptSyntaxOnly
};

export default config;
