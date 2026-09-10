import type { Linter } from 'eslint';
import { base, ignores, node, sorted, stylistic, typescript } from './src/index.js';

const config: Linter.Config[] = [
  ...ignores,
  ...base,
  ...typescript,
  ...node,
  ...stylistic,
  ...sorted,
  {
    name: 'tests',
    files: ['test/**/*.ts'],
    rules: {
      'max-nested-callbacks': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off'
    }
  },
  {
    name: 'ignores',
    ignores: ['test/fixtures/**', '_totest/**']
  }
];

export default config;
