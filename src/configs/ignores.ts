import type { Ruleset } from '../utils/types.js';
import { GLOB_EXCLUDED } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';

/**
 * Global ignore patterns for generated output, dependencies and lock files.
 *
 * Spread this first so every later configuration inherits the exclusions.
 */
export const ignores: Ruleset = [
  {
    name: buildConfigName('ignores'),
    ignores: [...GLOB_EXCLUDED]
  }
];

export default ignores;
