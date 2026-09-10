import { base, typescript } from './src/index.js';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  ...base,
  ...typescript,
  {
    name: 'ignores',
    ignores: ['test/fixtures/**', '_totest/**']
  }
];

export default config;
