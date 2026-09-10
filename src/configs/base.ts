import js from '@eslint/js';
import importXPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import promise from 'eslint-plugin-promise';
import regexpPlugin, { configs as regexpConfigs } from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import type { Ruleset } from '../utils/types.js';
import { GLOB_COMMONJS, GLOB_CONFIG_FILES, GLOB_SRC } from '../utils/globs.js';
import { buildConfigName } from '../utils/naming.js';

/**
 * The strict JavaScript foundation every other configuration builds on.
 *
 * Contains correctness, safety and modern-syntax rules only. Everything that
 * merely affects how the source is laid out lives in the `stylistic` module so
 * that formatting stays opt-in and composable.
 */
export const base: Ruleset = [
  {
    name: buildConfigName('base/setup'),
    files: GLOB_SRC,
    plugins: {
      'import-x': importXPlugin,
      promise,
      regexp: regexpPlugin,
      unicorn
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2026
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error'
    },
    settings: {
      'import-x/resolver-next': [createNodeResolver()]
    }
  },
  {
    name: buildConfigName('base/core'),
    files: GLOB_SRC,
    rules: {
      ...js.configs.recommended.rules,

      // Possible problems.
      'array-callback-return': ['error', { allowImplicit: false, checkForEach: true, allowVoid: false }],
      'no-await-in-loop': 'error',
      'no-constant-binary-expression': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'off', // `import-x/no-duplicates` handles this, including type-only imports.
      'no-inner-declarations': ['error', 'both'],
      'no-promise-executor-return': ['error', { allowVoid: true }],
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unassigned-vars': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': ['error', {
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
      'no-use-before-define': ['error', {
        allowNamedExports: false,
        classes: false,
        functions: true,
        variables: true
      }],
      'no-useless-assignment': 'error',
      'require-atomic-updates': ['error', { allowProperties: false }],

      // Suggestions.
      'accessor-pairs': ['error', { enforceForClassMembers: true, getWithoutSet: false, setWithoutGet: true }],
      'arrow-body-style': ['error', 'as-needed'],
      'block-scoped-var': 'error',
      camelcase: ['error', {
        allow: ['^UNSAFE_'],
        ignoreDestructuring: false,
        ignoreGlobals: false,
        ignoreImports: false,
        properties: 'always'
      }],
      'class-methods-use-this': ['error', { enforceForClassFields: true, exceptMethods: [] }],
      complexity: ['error', { max: 15, variant: 'modified' }],
      'consistent-return': 'error',
      'consistent-this': ['error', 'self'],
      curly: ['error', 'all'],
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': ['error', { allowKeywords: true }],
      eqeqeq: ['error', 'always', { null: 'always' }],
      'func-name-matching': ['error', 'always', { considerPropertyDescriptor: true }],
      'func-names': ['error', 'as-needed'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true, overrides: { namedExports: 'ignore' } }],
      'grouped-accessor-pairs': ['error', 'getBeforeSet'],
      'guard-for-in': 'error',
      'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
      'max-classes-per-file': ['error', { ignoreExpressions: true, max: 1 }],
      'max-depth': ['error', { max: 4 }],
      'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { IIFEs: false, max: 100, skipBlankLines: true, skipComments: true }],
      'max-nested-callbacks': ['error', { max: 3 }],
      'max-params': ['error', { max: 4 }],
      'max-statements': ['error', { max: 30 }, { ignoreTopLevelFunctions: true }],
      'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': ['error', { int32Hint: false }],
      'no-caller': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-continue': 'off', // `unicorn/prefer-continue` promotes `continue` over deeply nested branches.
      'no-delete-var': 'error',
      'no-div-regex': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-empty-function': ['error', { allow: ['arrowFunctions', 'constructors'] }],
      'no-empty-static-block': 'error',
      'no-eq-null': 'error',
      'no-eval': ['error', { allowIndirect: false }],
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],
      'no-extra-label': 'error',
      'no-implicit-coercion': ['error', { boolean: true, disallowTemplateShorthand: true, number: true, string: true }],
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': 'off', // Too noisy in practice; enable per project when it earns its keep.
      'no-multi-assign': ['error', { ignoreNonDeclaration: false }],
      'no-multi-str': 'error',
      'no-negated-condition': 'off', // Superseded by the autofixable `unicorn/no-negated-condition`.
      'no-nested-ternary': 'off', // Superseded by `unicorn/no-nested-ternary`, which permits parenthesised nesting.
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-proto': 'error',
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-sequences': ['error', { allowInParentheses: false }],
      'no-shadow': ['error', {
        builtinGlobals: false,
        hoist: 'functions',
        ignoreOnInitialization: false
      }],
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': ['error', {
        allowAfterSuper: true,
        allowAfterThis: true,
        allowAfterThisConstructor: true,
        allowFunctionParams: true,
        allowInObjectDestructuring: true,
        enforceInClassFields: false,
        enforceInMethodNames: false
      }],
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-unused-expressions': ['error', {
        allowShortCircuit: false,
        allowTaggedTemplates: false,
        allowTernary: false,
        enforceForJSX: true
      }],
      'no-useless-call': 'error',
      'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'no-warning-comments': ['warn', { location: 'anywhere', terms: ['fixme', 'xxx', 'hack'] }],
      'object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
      'prefer-destructuring': ['error', {
        AssignmentExpression: { array: false, object: false },
        VariableDeclarator: { array: false, object: true }
      }, { enforceForRenamedProperties: false }],
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: false }],
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'preserve-caught-error': ['error', { requireCatchParameter: true }],
      radix: ['error', 'always'],
      'require-await': 'error',
      'require-unicode-regexp': ['error', { requireFlag: 'u' }],
      'symbol-description': 'error',
      'vars-on-top': 'error',
      yoda: ['error', 'never', { exceptRange: false }],

      // Deliberately left off: these are taste rather than correctness, or are
      // covered by a dedicated composable module.
      'capitalized-comments': 'off',
      'id-length': 'off',
      'no-inline-comments': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'sort-imports': 'off', // See the `sorted` module.
      'sort-keys': 'off', // See the `sorted` module.
      'sort-vars': 'off' // See the `sorted` module.
    }
  },
  {
    name: buildConfigName('base/unicorn'),
    files: GLOB_SRC,
    rules: {
      ...unicorn.configs.recommended.rules,

      // Additional rules worth the strictness that upstream leaves opt-in.
      'unicorn/better-regex': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-length-as-slice-end': 'error',
      'unicorn/no-negated-condition': 'error',
      'unicorn/no-unsafe-dom-html': 'error',
      'unicorn/no-unused-properties': 'error',
      'unicorn/prefer-regexp-escape': 'error',
      'unicorn/prefer-export-from': ['error', { checkUsedVariables: false }],

      // Tuned rather than accepted verbatim.
      'unicorn/filename-case': ['error', {
        cases: { camelCase: true, kebabCase: true, pascalCase: true },
        ignore: [/^[0-9A-Z_]+\.[a-z]+$/u]
      }],
      'unicorn/name-replacements': ['error', {
        extendDefaultReplacements: true,
        replacements: {
          // Idiomatic in JavaScript, React and Express; renaming them is noise.
          arg: false,
          args: false,
          param: false,
          params: false,
          prop: false,
          props: false,
          ref: false,
          refs: false,
          req: false,
          res: false
        }
      }],
      'unicorn/no-useless-undefined': ['error', { checkArguments: false, checkArrowFunctionBody: false }],
      'unicorn/prevent-abbreviations': 'off', // Renames far too much ordinary domain vocabulary.

      // Conflicts with common, legitimate patterns.
      'unicorn/import-style': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-top-level-side-effects': 'off',
      'unicorn/prefer-top-level-await': 'off',

      // Single-line `/** … */` documentation comments are idiomatic, especially
      // in declaration files.
      'unicorn/single-line-block-comment-style': 'off',

      // Purely presentational; handled by the `stylistic` module instead.
      'unicorn/empty-brace-spaces': 'off',
      'unicorn/escape-case': 'off',
      'unicorn/no-hex-escape': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/switch-case-braces': 'off',
      'unicorn/template-indent': 'off'
    }
  },
  {
    name: buildConfigName('base/promise'),
    files: GLOB_SRC,
    rules: {
      'promise/always-return': ['error', { ignoreLastCallback: true }],
      'promise/catch-or-return': ['error', { allowFinally: true, allowThen: false, terminationMethod: ['catch'] }],
      'promise/no-callback-in-promise': ['error', { exceptions: [], timeoutsErr: true }],
      'promise/no-multiple-resolved': 'error',
      'promise/no-nesting': 'error',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/no-return-wrap': ['error', { allowReject: false }],
      'promise/param-names': ['error', { rejectPattern: '^_?reject$', resolvePattern: '^_?resolve$' }],
      'promise/prefer-await-to-then': ['error', { strict: true }],
      'promise/prefer-catch': 'error',
      'promise/spec-only': 'error',
      'promise/valid-params': 'error',

      'promise/avoid-new': 'off', // `new Promise` is unavoidable when wrapping callback APIs.
      'promise/no-native': 'off',
      'promise/prefer-await-to-callbacks': 'off' // Not every callback is convertible.
    }
  },
  {
    name: buildConfigName('base/regexp'),
    files: GLOB_SRC,
    rules: {
      ...regexpConfigs['flat/recommended'].rules,

      'regexp/no-super-linear-move': 'error',
      'regexp/no-useless-flag': 'error',
      'regexp/prefer-lookaround': 'error',
      'regexp/prefer-named-backreference': 'error',
      'regexp/prefer-named-replacement': 'error',
      'regexp/prefer-regexp-exec': 'error',
      'regexp/prefer-result-array-groups': 'error',
      'regexp/require-unicode-regexp': 'error',
      'regexp/sort-alternatives': 'error',
      'regexp/sort-character-class-elements': 'error',
      'regexp/use-ignore-case': 'error',

      // Presentational regex rules belong to the `stylistic` module.
      'regexp/hexadecimal-escape': 'off',
      'regexp/letter-case': 'off',
      'regexp/sort-flags': 'off',
      'regexp/unicode-escape': 'off'
    }
  },
  {
    name: buildConfigName('base/imports'),
    files: GLOB_SRC,
    rules: {
      'import-x/default': 'error',
      'import-x/export': 'error',
      'import-x/first': 'error',
      'import-x/named': 'error',
      'import-x/namespace': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-amd': 'error',
      'import-x/no-cycle': ['error', { allowUnsafeDynamicCyclicDependency: false, ignoreExternal: true, maxDepth: Infinity }],
      'import-x/no-deprecated': 'warn',
      'import-x/no-duplicates': ['error', { 'prefer-inline': false }],
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': ['error', {
        devDependencies: [...GLOB_CONFIG_FILES, '**/*.{test,spec}.?([cm])[jt]s?(x)', '**/{test,tests,__tests__,__mocks__}/**'],
        includeTypes: true,
        optionalDependencies: false,
        peerDependencies: true
      }],
      'import-x/no-mutable-exports': 'error',
      'import-x/no-named-as-default': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-relative-packages': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-unassigned-import': ['error', { allow: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less', '**/*.styl'] }],
      'import-x/no-unresolved': ['error', { commonjs: true }],
      // `noUselessIndex` is deliberately off: dropping `/index.js` produces a
      // directory specifier, which ESM does not resolve.
      'import-x/no-useless-path-segments': ['error', { commonjs: true, noUselessIndex: false }],
      'import-x/no-webpack-loader-syntax': 'error',

      // Deliberately left off.
      'import-x/no-default-export': 'off',
      // Both of these fire on the common "default export mirrors the named
      // exports" pattern, which most ESLint plugins — and this package — use.
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-rename-default': 'off',
      'import-x/no-namespace': 'off',
      'import-x/no-nodejs-modules': 'off',
      'import-x/order': 'off', // See the `sorted` module.
      'import-x/prefer-default-export': 'off'
    }
  },
  {
    name: buildConfigName('base/commonjs'),
    files: GLOB_COMMONJS,
    languageOptions: {
      sourceType: 'commonjs'
    },
    rules: {
      'unicorn/prefer-module': 'off'
    }
  },
  {
    name: buildConfigName('base/config-files'),
    files: GLOB_CONFIG_FILES,
    rules: {
      'import-x/no-default-export': 'off',
      'no-console': 'off',
      'unicorn/no-anonymous-default-export': 'off'
    }
  }
];

export default base;
