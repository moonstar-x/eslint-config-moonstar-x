import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import type { ESLint, Linter } from 'eslint';
import type { Ruleset } from '../utils/types.js';
import { GLOB_SRC } from '../utils/globs.js';
import { escalate } from '../utils/severity.js';
import { buildConfigName } from '../utils/naming.js';

/**
 * The shape of `eslint-plugin-jsx-a11y` that this configuration relies on.
 *
 * Declared here rather than imported: the plugin ships no declarations, and it
 * is an optional peer dependency, so it may not be installed at all.
 */
interface JsxA11yPlugin extends ESLint.Plugin {
  flatConfigs: Record<string, { rules?: Linter.RulesRecord }>;
}

const MISSING_PLUGIN_MESSAGE = [
  'The a11y configuration needs `eslint-plugin-jsx-a11y`, which is an optional peer dependency.',
  '',
  '  npm install --save-dev eslint-plugin-jsx-a11y',
  '',
  'The plugin has not published an ESLint 10 peer range yet, so npm may reject the install.',
  'It works with ESLint 10; tell npm so by adding this to your package.json:',
  '',
  '  "overrides": { "eslint-plugin-jsx-a11y": { "eslint": "$eslint" } }'
].join('\n');

const isJsxA11yPlugin = (value: unknown): value is JsxA11yPlugin => typeof value === 'object' && value !== null && 'flatConfigs' in value;

/**
 * Load the plugin from this package first, then from the project being linted.
 *
 * The second lookup matters when the config is hoisted somewhere that cannot
 * see the project's own dependencies, which is the norm under pnpm and inside
 * monorepos.
 *
 * Throws when the plugin is not installed anywhere reachable.
 */
const loadPlugin = (): JsxA11yPlugin => {
  const requirers = [
    createRequire(import.meta.url),
    createRequire(path.join(process.cwd(), 'noop.js'))
  ];

  let lastFailure: unknown;

  for (const requirer of requirers) {
    try {
      const loaded: unknown = requirer('eslint-plugin-jsx-a11y');

      if (isJsxA11yPlugin(loaded)) {
        return loaded;
      }
    } catch (error) {
      lastFailure = error;
    }
  }

  throw new Error(MISSING_PLUGIN_MESSAGE, { cause: lastFailure });
};

/**
 * Accessibility rules for JSX, built on the `strict` preset of
 * `eslint-plugin-jsx-a11y`.
 *
 * This is a function rather than an array because the plugin is an optional
 * peer dependency: calling it is what triggers the (synchronous) load, so
 * projects that skip accessibility linting never need the package installed.
 *
 * Throws when `eslint-plugin-jsx-a11y` is not installed.
 */
export const a11y = (): Ruleset => {
  const plugin = loadPlugin();

  return [
    {
      name: buildConfigName('a11y'),
      files: GLOB_SRC,
      plugins: {
        'jsx-a11y': plugin
      },
      rules: {
        ...escalate(plugin.flatConfigs['strict']?.rules),

        // Enabled on top of `strict`, which leaves these opt-in.
        'jsx-a11y/anchor-ambiguous-text': 'error',
        'jsx-a11y/control-has-associated-label': ['error', {
          ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
          ignoreRoles: ['grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'row', 'tablist', 'toolbar', 'tree', 'treegrid'],
          includeRoles: ['alert', 'dialog']
        }],
        'jsx-a11y/lang': 'error',
        'jsx-a11y/no-aria-hidden-on-focusable': 'error',
        'jsx-a11y/prefer-tag-over-role': 'error',

        // Deprecated upstream in favour of `label-has-associated-control`.
        'jsx-a11y/accessible-emoji': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/no-onchange': 'off'
      }
    }
  ];
};

export default a11y;
