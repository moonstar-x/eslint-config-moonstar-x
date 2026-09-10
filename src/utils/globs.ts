export const GLOB_JS: string[] = ['**/*.js', '**/*.cjs', '**/*.mjs'];
export const GLOB_JSX: string[] = ['**/*.jsx'];
export const GLOB_TS: string[] = ['**/*.ts', '**/*.cts', '**/*.mts'];
export const GLOB_TSX: string[] = ['**/*.tsx'];

export const GLOB_JAVASCRIPT: string[] = [...GLOB_JS, ...GLOB_JSX];
export const GLOB_TYPESCRIPT: string[] = [...GLOB_TS, ...GLOB_TSX];
export const GLOB_JSX_ALL: string[] = [...GLOB_JSX, ...GLOB_TSX];
export const GLOB_SRC: string[] = [...GLOB_JAVASCRIPT, ...GLOB_TYPESCRIPT];

export const GLOB_MODULE: string[] = ['**/*.mjs', '**/*.mts'];
export const GLOB_DTS: string[] = ['**/*.d.ts', '**/*.d.cts', '**/*.d.mts'];

export const GLOB_COMMONJS: string[] = ['**/*.cjs'];
export const GLOB_CONFIG_FILES: string[] = [
  '**/*.config.?([cm])[jt]s',
  '**/*.config.*.?([cm])[jt]s',
  '**/.*rc.?([cm])[jt]s'
];

export const GLOB_TESTS: string[] = [
  '**/*.{test,spec}.?([cm])[jt]s?(x)',
  '**/__tests__/**/*.?([cm])[jt]s?(x)',
  '**/__mocks__/**/*.?([cm])[jt]s?(x)',
  '**/test/**/*.?([cm])[jt]s?(x)',
  '**/tests/**/*.?([cm])[jt]s?(x)'
];

export const GLOB_EXCLUDED: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/out/**',
  '**/coverage/**',
  '**/.next/**',
  '**/.nuxt/**',
  '**/.svelte-kit/**',
  '**/.astro/**',
  '**/.vercel/**',
  '**/.netlify/**',
  '**/.turbo/**',
  '**/.yarn/**',
  '**/.pnp.*',
  '**/vendor/**',
  '**/*.min.js',
  '**/CHANGELOG.md',
  '**/LICENSE*',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  '**/bun.lock?(b)'
];
