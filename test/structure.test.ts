import { describe, expect, it } from '@jest/globals';
import type { ESLint, Linter } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import thisConfig, { a11y } from '../src/index.js';
import type { Ruleset } from '../src/index.js';

const MODULES: Record<string, Ruleset> = { ...thisConfig, a11y: a11y() };

const MODULE_NAMES = [
  'a11y',
  'base',
  'browser',
  'ignores',
  'jest',
  'node',
  'react',
  'sorted',
  'stylistic',
  'stylisticJsx',
  'typescript',
  'typescriptSyntaxOnly'
];

interface NamedBlock {
  block: Linter.Config;
  moduleName: string;
}

const MODULE_ENTRIES: Array<[string, Ruleset]> = Object.entries(MODULES);

const ALL_BLOCKS: NamedBlock[] = MODULE_ENTRIES.flatMap(
  ([moduleName, blocks]) => blocks.map((block) => ({ block, moduleName }))
);

const ALL_PLUGINS = new Map<string, ESLint.Plugin>(
  ALL_BLOCKS.flatMap(({ block }) => Object.entries(block.plugins ?? {}))
);

const CORE_RULES = new Set(builtinRules.keys());

const isKnownRule = (ruleId: string): boolean => {
  const separator = ruleId.indexOf('/');

  if (separator === -1) {
    return CORE_RULES.has(ruleId);
  }

  const plugin = ALL_PLUGINS.get(ruleId.slice(0, separator));
  const rules = plugin?.rules;

  return rules !== undefined && Object.hasOwn(rules, ruleId.slice(separator + 1));
};

/** Severities the package is allowed to configure; numeric forms are rejected. */
const SEVERITIES: ReadonlySet<unknown> = new Set(['error', 'off', 'warn']);

const severityOf = (entry: Linter.RuleEntry | undefined): Linter.RuleSeverity | undefined => Array.isArray(entry) ? entry[0] : entry;

/** Blocks are always named, but the flat-config type leaves `name` optional. */
const nameOf = (block: Linter.Config): string => block.name ?? '';

/** Label a block by the module it came from, for readable assertion diffs. */
const labelOf = ({ block, moduleName }: NamedBlock): string => `${moduleName} → ${nameOf(block)}`;

describe('module shape', () => {
  it.each(MODULE_ENTRIES)('exports %s as a non-empty array of plain objects', (_moduleName, blocks) => {
    expect(Array.isArray(blocks)).toBe(true);
    expect(blocks.length).toBeGreaterThan(0);

    for (const block of blocks) {
      expect(typeof block).toBe('object');
      expect(block).not.toBeNull();
    }
  });

  it('names every block under the `moonstar-x/` namespace', () => {
    const misnamed = ALL_BLOCKS
      .filter(({ block }) => typeof block.name !== 'string' || !(/^moonstar-x\//u).test(block.name))
      .map(({ block, moduleName }) => `${moduleName} → ${JSON.stringify(block.name)}`);

    expect(misnamed).toStrictEqual([]);
  });

  it('uses a unique name for every block', () => {
    const names = ALL_BLOCKS.map(({ block }) => nameOf(block));
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);

    expect(duplicates).toStrictEqual([]);
  });

  it('references only rules that exist', () => {
    const unknown = ALL_BLOCKS.flatMap((named) => Object.keys(named.block.rules ?? {})
      .filter((ruleId) => !isKnownRule(ruleId))
      .map((ruleId) => `${labelOf(named)} → ${ruleId}`));

    expect(unknown).toStrictEqual([]);
  });

  it('uses string severities only', () => {
    const offenders = ALL_BLOCKS.flatMap((named) => Object.entries(named.block.rules ?? {})
      .filter(([, entry]) => !SEVERITIES.has(severityOf(entry)))
      .map(([ruleId, entry]) => `${labelOf(named)} → ${ruleId} → ${JSON.stringify(severityOf(entry))}`));

    expect(offenders).toStrictEqual([]);
  });
});

describe('entry point', () => {
  it('exposes every module on the default export', () => {
    expect(Object.keys(thisConfig).toSorted((left, right) => left.localeCompare(right))).toStrictEqual(MODULE_NAMES);
  });

  it('exposes `a11y` as a lazily loaded factory', () => {
    expect(typeof a11y).toBe('function');
    expect(Array.isArray(a11y())).toBe(true);
  });

  it('keeps formatting rules out of the correctness modules', () => {
    const correctness = new Set(['base', 'browser', 'node', 'react', 'typescript', 'typescriptSyntaxOnly']);

    const formatting = ALL_BLOCKS
      .filter(({ moduleName }) => correctness.has(moduleName))
      .flatMap((named) => Object.keys(named.block.rules ?? {})
        .filter((ruleId) => ruleId.startsWith('@stylistic/') || ruleId.startsWith('perfectionist/'))
        .map((ruleId) => `${labelOf(named)} → ${ruleId}`));

    expect(formatting).toStrictEqual([]);
  });
});
