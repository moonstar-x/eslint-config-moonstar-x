import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import { GLOB_SRC } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import type { Ruleset } from '../utils/types.js';

/**
 * Browser environment: DOM globals plus the restrictions that only make sense
 * for code shipped to a user agent.
 */
export const browser: Ruleset = [
  {
    name: buildConfigName('browser'),
    files: GLOB_SRC,
    plugins: { unicorn },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-alert': 'error',
      'no-restricted-globals': ['error',
        { name: 'event', message: 'Use the event argument passed to the handler instead of the global `event`.' },
        { name: 'name', message: 'Use `globalThis.name` if the window name is really what you want.' },
        { name: 'length', message: 'Use `globalThis.length` if the frame count is really what you want.' },
        { name: 'self', message: 'Use `globalThis` instead.' },
        { name: 'top', message: 'Use `globalThis.top` instead.' },
        { name: 'parent', message: 'Use `globalThis.parent` instead.' }
      ],
      'no-restricted-properties': ['error',
        { object: 'document', property: 'write', message: '`document.write` blocks parsing and breaks streamed documents.' },
        { object: 'document', property: 'writeln', message: '`document.writeln` blocks parsing and breaks streamed documents.' }
      ],
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-text-content': 'error'
    }
  }
];

export default browser;
