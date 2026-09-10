import type { Linter } from 'eslint';
import { base, ignores, node, sorted, stylistic, typescript } from './src/index.js';

const config: Linter.Config[] = [
  ...base,
  ...typescript,
  ...ignores,
  ...node,
  ...stylistic,
  ...sorted,
  {
    name: 'ignores',
    ignores: ['test/fixtures/**', '_totest/**']
  }
];

export default config;
