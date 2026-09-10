import n from 'eslint-plugin-n';
import globals from 'globals';
import { GLOB_COMMONJS, GLOB_SRC } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import type { Ruleset } from '../utils/types.js';

/**
 * Node.js environment rules: globals, module resolution, and the runtime
 * pitfalls that `eslint-plugin-n` catches.
 *
 * Compose this with `base` (and optionally `typescript`).
 */
export const node: Ruleset = [
  {
    name: buildConfigName('node/setup'),
    files: GLOB_SRC,
    plugins: { n },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.nodeBuiltin
      }
    }
  },
  {
    name: buildConfigName('node/rules'),
    files: GLOB_SRC,
    rules: {
      'n/callback-return': ['error', ['callback', 'cb', 'next', 'done']],
      'n/exports-style': ['error', 'module.exports', { allowBatchAssign: false }],
      'n/handle-callback-err': ['error', '^(err|error)$'],
      'n/no-callback-literal': 'error',
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-extraneous-import': 'error',
      'n/no-extraneous-require': 'error',
      'n/no-mixed-requires': ['error', { allowCall: false, grouping: true }],
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/no-process-exit': 'error',
      'n/no-sync': ['error', { allowAtRootLevel: true, ignores: [] }],
      'n/no-unpublished-bin': 'error',
      'n/no-unsupported-features/es-builtins': 'error',
      'n/no-unsupported-features/es-syntax': 'error',
      'n/no-unsupported-features/node-builtins': 'error',
      'n/prefer-global/buffer': ['error', 'never'],
      'n/prefer-global/console': ['error', 'always'],
      'n/prefer-global/process': ['error', 'never'],
      'n/prefer-global/text-decoder': ['error', 'never'],
      'n/prefer-global/text-encoder': ['error', 'never'],
      'n/prefer-global/url': ['error', 'always'],
      'n/prefer-global/url-search-params': ['error', 'always'],
      'n/prefer-node-protocol': 'error',
      'n/prefer-promises/dns': 'error',
      'n/prefer-promises/fs': 'error',
      'n/process-exit-as-throw': 'error',

      // Resolution rules are left to `import-x`, which understands TypeScript
      // path mappings and bundler conditions.
      'n/no-missing-import': 'off',
      'n/no-missing-require': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-unpublished-require': 'off',

      // Left off: valid in scripts, and covered elsewhere.
      'n/global-require': 'off',
      'n/no-process-env': 'off',
      'n/no-top-level-await': 'off'
    }
  },
  {
    name: buildConfigName('node/commonjs'),
    files: GLOB_COMMONJS,
    rules: {
      'n/prefer-node-protocol': 'error',
      'no-implicit-globals': 'off'
    }
  },
  {
    name: buildConfigName('node/bin'),
    files: ['**/bin/**/*.?([cm])[jt]s', '**/scripts/**/*.?([cm])[jt]s'],
    rules: {
      'n/hashbang': 'error',
      'n/no-process-exit': 'off',
      'n/no-sync': 'off',
      'no-console': 'off'
    }
  }
];

export default node;
