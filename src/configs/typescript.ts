import type { Linter } from 'eslint';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importXPlugin from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import { GLOB_DTS, GLOB_TYPESCRIPT } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';
import type { Ruleset } from '../utils/types.js';

/** A `typescript-eslint` preset entry, which types its own rules as a bare `object`. */
interface RulesCarrier {
  rules?: object | undefined;
}

/**
 * Flatten the rules of a `typescript-eslint` preset, which ships as an array of
 * config objects rather than a single rules record, widening them back into one.
 */
const mergeRules = (configs: readonly RulesCarrier[]): Linter.RulesRecord => configs.reduce<Linter.RulesRecord>((merged, config) => ({ ...merged, ...config.rules }), {});

const CORE_RULES_REPLACED_BY_TYPESCRIPT: Linter.RulesRecord = {
  'class-methods-use-this': 'off',
  // `@typescript-eslint/switch-exhaustiveness-check` rejects a `default` clause
  // on an exhaustive union switch, which is exactly what `default-case` demands.
  'default-case': 'off',
  'consistent-return': 'off',
  'default-param-last': 'off',
  'dot-notation': 'off',
  'init-declarations': 'off',
  'max-params': 'off',
  'no-array-constructor': 'off',
  'no-dupe-class-members': 'off',
  'no-empty-function': 'off',
  'no-implied-eval': 'off',
  'no-invalid-this': 'off',
  'no-loop-func': 'off',
  'no-magic-numbers': 'off',
  'no-redeclare': 'off',
  'no-restricted-imports': 'off',
  'no-shadow': 'off',
  'no-throw-literal': 'off',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'no-useless-constructor': 'off',
  'prefer-destructuring': 'off',
  'prefer-promise-reject-errors': 'off',
  'require-await': 'off'
};

/**
 * Rules shared by the type-checked and syntax-only TypeScript configurations.
 */
const sharedRules: Linter.RulesRecord = {
  ...CORE_RULES_REPLACED_BY_TYPESCRIPT,

  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
  '@typescript-eslint/ban-ts-comment': ['error', {
    minimumDescriptionLength: 10,
    'ts-check': false,
    'ts-expect-error': 'allow-with-description',
    'ts-ignore': true,
    'ts-nocheck': true
  }],
  '@typescript-eslint/ban-tslint-comment': 'error',
  '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
  '@typescript-eslint/class-methods-use-this': ['error', {
    enforceForClassFields: true,
    ignoreClassesThatImplementAnInterface: 'public-fields',
    ignoreOverrideMethods: true
  }],
  '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
  '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
  '@typescript-eslint/consistent-type-assertions': ['error', {
    arrayLiteralTypeAssertions: 'never',
    assertionStyle: 'as',
    objectLiteralTypeAssertions: 'never'
  }],
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/consistent-type-imports': ['error', {
    disallowTypeAnnotations: true,
    fixStyle: 'separate-type-imports',
    prefer: 'type-imports'
  }],
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/explicit-function-return-type': ['error', {
    allowConciseArrowFunctionExpressionsStartingWithVoid: false,
    allowExpressions: false,
    allowHigherOrderFunctions: true,
    allowIIFEs: true,
    allowTypedFunctionExpressions: true
  }],
  '@typescript-eslint/explicit-member-accessibility': ['error', {
    accessibility: 'explicit',
    overrides: { constructors: 'no-public' }
  }],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/max-params': ['error', { max: 4 }],
  '@typescript-eslint/method-signature-style': ['error', 'property'],
  '@typescript-eslint/no-array-constructor': 'error',
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/no-dupe-class-members': 'error',
  '@typescript-eslint/no-duplicate-enum-values': 'error',
  '@typescript-eslint/no-dynamic-delete': 'error',
  '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'private-constructors', 'protected-constructors', 'decoratedFunctions', 'overrideMethods'] }],
  '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'never', allowObjectTypes: 'never' }],
  '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: false }],
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/no-extraneous-class': ['error', { allowConstructorOnly: false, allowEmpty: false, allowStaticOnly: false, allowWithDecorator: true }],
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: false, ignoreProperties: false }],
  '@typescript-eslint/no-invalid-this': 'error',
  '@typescript-eslint/no-invalid-void-type': ['error', { allowAsThisParameter: true, allowInGenericTypeArguments: true }],
  '@typescript-eslint/no-loop-func': 'error',
  '@typescript-eslint/no-misused-new': 'error',
  '@typescript-eslint/no-namespace': ['error', { allowDeclarations: false, allowDefinitionFiles: true }],
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false, ignoreDeclarationMerge: true }],
  '@typescript-eslint/no-require-imports': ['error', { allow: [], allowAsImport: false }],
  '@typescript-eslint/no-shadow': ['error', {
    hoist: 'functions',
    ignoreFunctionTypeParameterNameValueShadow: true,
    ignoreOnInitialization: false,
    ignoreTypeValueShadow: false
  }],
  '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true, allowedNames: [] }],
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
  '@typescript-eslint/no-unsafe-declaration-merging': 'error',
  '@typescript-eslint/no-unsafe-function-type': 'error',
  '@typescript-eslint/no-unused-expressions': ['error', {
    allowShortCircuit: false,
    allowTaggedTemplates: false,
    allowTernary: false,
    enforceForJSX: true
  }],
  '@typescript-eslint/no-unused-vars': ['error', {
    args: 'all',
    argsIgnorePattern: '^_',
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: '^_',
    destructuredArrayIgnorePattern: '^_',
    ignoreRestSiblings: true,
    reportUsedIgnorePattern: true,
    vars: 'all',
    varsIgnorePattern: '^_'
  }],
  '@typescript-eslint/no-use-before-define': ['error', {
    allowNamedExports: false,
    classes: false,
    enums: true,
    functions: true,
    ignoreTypeReferences: true,
    typedefs: true,
    variables: true
  }],
  '@typescript-eslint/no-useless-constructor': 'error',
  '@typescript-eslint/no-useless-default-assignment': 'error',
  '@typescript-eslint/no-useless-empty-export': 'error',
  '@typescript-eslint/no-wrapper-object-types': 'error',
  '@typescript-eslint/prefer-as-const': 'error',
  '@typescript-eslint/prefer-enum-initializers': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
  '@typescript-eslint/prefer-namespace-keyword': 'error',
  '@typescript-eslint/triple-slash-reference': ['error', { lib: 'never', path: 'never', types: 'never' }],
  '@typescript-eslint/unified-signatures': ['error', { ignoreDifferentlyNamedParameters: false, ignoreOverloadsWithDifferentJSDoc: false }],

  // Deliberately left off.
  '@typescript-eslint/member-ordering': 'off', // See the `sorted` module.
  '@typescript-eslint/naming-convention': 'off', // `camelcase` from `base` covers the common cases without the maintenance burden.
  '@typescript-eslint/no-type-alias': 'off', // Deprecated upstream.
  '@typescript-eslint/parameter-properties': 'off',
  '@typescript-eslint/prefer-readonly-parameter-types': 'off', // Ripples through every signature in a codebase.
  '@typescript-eslint/sort-type-constituents': 'off', // See the `sorted` module.
  '@typescript-eslint/typedef': 'off' // Fights inference, which is the point of TypeScript.
};

/**
 * Rules that need the type checker. Only applied by the `typescript` config.
 */
const typeAwareRules: Linter.RulesRecord = {
  '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],
  '@typescript-eslint/dot-notation': ['error', {
    allowIndexSignaturePropertyAccess: false,
    allowPrivateClassPropertyAccess: false,
    allowProtectedClassPropertyAccess: false
  }],
  '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: false, ignoreVoidOperator: true, ignoreVoidReturningFunctions: true }],
  '@typescript-eslint/no-deprecated': 'warn',
  '@typescript-eslint/no-misused-promises': ['error', {
    checksConditionals: true,
    checksSpreads: true,
    checksVoidReturn: true
  }],
  '@typescript-eslint/no-misused-spread': 'error',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unsafe-type-assertion': 'error',
  '@typescript-eslint/prefer-destructuring': ['error', {
    AssignmentExpression: { array: false, object: false },
    VariableDeclarator: { array: false, object: true }
  }, { enforceForDeclarationWithTypeAnnotation: false, enforceForRenamedProperties: false }],
  '@typescript-eslint/prefer-nullish-coalescing': ['error', {
    ignoreConditionalTests: true,
    ignoreMixedLogicalExpressions: false,
    ignorePrimitives: { bigint: false, boolean: false, number: false, string: false }
  }],
  '@typescript-eslint/prefer-readonly': ['error', { onlyInlineLambdas: false }],
  '@typescript-eslint/promise-function-async': ['error', {
    allowAny: false,
    checkArrowFunctions: true,
    checkFunctionDeclarations: true,
    checkFunctionExpressions: true,
    checkMethodDeclarations: true
  }],
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/return-await': ['error', 'always'],
  '@typescript-eslint/strict-boolean-expressions': ['error', {
    allowAny: false,
    allowNullableBoolean: false,
    allowNullableNumber: false,
    allowNullableObject: true,
    allowNullableString: false,
    allowNumber: false,
    allowString: false
  }],
  '@typescript-eslint/strict-void-return': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': ['error', {
    allowDefaultCaseForExhaustiveSwitch: false,
    considerDefaultExhaustiveForUnions: true,
    requireDefaultForNonUnion: true
  }]
};

const importResolverSettings = {
  'import-x/extensions': ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'],
  'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
  'import-x/parsers': {
    '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts']
  },
  'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })]
};

const relaxedForDeclarationFiles: Linter.Config = {
  name: buildConfigName('typescript/declarations'),
  files: GLOB_DTS,
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-useless-empty-export': 'off',
    'no-var': 'off',
    'unicorn/prevent-abbreviations': 'off'
  }
};

/**
 * Fully type-aware TypeScript rules, built on `strictTypeChecked`.
 *
 * Requires a `tsconfig.json`; the TypeScript project service discovers it
 * automatically from the linted file's location. If a project cannot supply
 * one, use `typescriptSyntaxOnly` instead.
 */
export const typescript: Ruleset = [
  {
    name: buildConfigName('typescript/setup'),
    files: GLOB_TYPESCRIPT,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importXPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: true
      }
    },
    settings: importResolverSettings
  },
  {
    name: buildConfigName('typescript/rules'),
    files: GLOB_TYPESCRIPT,
    rules: {
      ...tseslint.configs.eslintRecommended.rules,
      ...mergeRules(tseslint.configs.strictTypeChecked),
      ...sharedRules,
      ...typeAwareRules
    }
  },
  {
    name: buildConfigName('typescript/imports'),
    files: GLOB_TYPESCRIPT,
    rules: {
      // TypeScript's own resolution reports these more accurately.
      'import-x/default': 'off',
      'import-x/named': 'off',
      'import-x/namespace': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level']
    }
  },
  relaxedForDeclarationFiles
];

/**
 * TypeScript rules that need no type information.
 *
 * Slower checks are traded away for the ability to lint files that are not
 * part of any `tsconfig.json` project.
 */
export const typescriptSyntaxOnly: Ruleset = [
  {
    name: buildConfigName('typescript-syntax-only/setup'),
    files: GLOB_TYPESCRIPT,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importXPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
        projectService: false
      }
    },
    settings: importResolverSettings
  },
  {
    name: buildConfigName('typescript-syntax-only/rules'),
    files: GLOB_TYPESCRIPT,
    rules: {
      ...tseslint.configs.eslintRecommended.rules,
      ...mergeRules(tseslint.configs.strict),
      ...sharedRules,

      // Belt and braces: whatever `sharedRules` happens to contain, nothing
      // that needs the type checker survives into the syntax-only config.
      ...tseslint.configs.disableTypeChecked.rules
    }
  },
  {
    name: buildConfigName('typescript-syntax-only/imports'),
    files: GLOB_TYPESCRIPT,
    rules: {
      'import-x/default': 'off',
      'import-x/named': 'off',
      'import-x/namespace': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level']
    }
  },
  { ...relaxedForDeclarationFiles, name: 'moonstar/typescript-syntax-only/declarations' }
];

export default typescript;
