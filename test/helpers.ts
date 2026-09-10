import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import type { Linter } from 'eslint';
import type { Ruleset } from '../src/index.js';

export const FIXTURES_DIR: string = fileURLToPath(new URL('fixtures', import.meta.url));

/**
 * Overrides that only make sense inside the fixture project, which has no
 * dependencies of its own and is not a published package.
 */
const FIXTURE_OVERRIDES: Linter.Config = {
  name: 'fixtures/overrides',
  rules: {
    'import-x/no-extraneous-dependencies': 'off'
  }
};

export const createLinter = (config: Ruleset): ESLint => new ESLint({
  cwd: FIXTURES_DIR,
  overrideConfig: [...config, FIXTURE_OVERRIDES],
  overrideConfigFile: true
});

export interface LintOutcome {
  messages: Linter.LintMessage[];
  ruleIds: string[];
}

/**
 * Lint one fixture, given a path relative to the fixture project root, and
 * return both its messages and the rule ids they came from.
 */
export const lintFixture = async (config: Ruleset, fixture: string): Promise<LintOutcome> => {
  const [result] = await createLinter(config).lintFiles([path.join(FIXTURES_DIR, fixture)]);
  const messages = result?.messages ?? [];
  const ruleIds = messages
    .map((message) => message.ruleId)
    .filter((ruleId): ruleId is string => ruleId !== null);

  return {
    messages,
    ruleIds: [...new Set(ruleIds)]
  };
};

/** Render lint messages as a single readable string for assertion failures. */
export const format = (messages: Linter.LintMessage[]): string => messages
  .map((message) => `${String(message.line)}:${String(message.column)} ${message.ruleId ?? 'fatal'} ${message.message}`)
  .join('\n');
