import type { Linter } from 'eslint';

type RuleEntry = Linter.RuleEntry<unknown[]>;
type PresetRules = Partial<Record<string, RuleEntry>> | undefined;

const shouldEscalate = (severity: unknown): boolean => severity === 'warn' || severity === 1;

const escalateEntry = (entry: RuleEntry): RuleEntry => {
  if (shouldEscalate(entry)) {
    return 'error';
  }

  if (Array.isArray(entry) && shouldEscalate(entry[0])) {
    return ['error', ...entry.slice(1)];
  }

  return entry;
};

/**
 * Raise every `warn` entry in a rules object to `error`.
 *
 * Upstream presets use `warn` for rules they consider disruptive to adopt. This
 * package is explicitly strict, so those become errors; anything already set to
 * `off` stays off.
 */
export const escalate = (rules: PresetRules): Linter.RulesRecord => {
  const entries = Object.entries(rules ?? {})
    .filter((entry): entry is [string, RuleEntry] => entry[1] !== undefined)
    .map<[string, RuleEntry]>(([name, entry]) => [name, escalateEntry(entry)]);

  return Object.fromEntries(entries);
};
