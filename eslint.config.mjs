import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginNext from '@next/eslint-plugin-next';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginAirbnb from 'eslint-config-airbnb';
import pluginPath from 'eslint-plugin-path';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      // Add any other paths you want to ignore
    ],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
      react: {
        version: '18.2.0',
      },
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginAirbnb.rules,

      'prettier/prettier': ['error', {usePrettierrc: true}],

      semi: 'error',
      'prefer-const': 'error',

      'no-console': 'error',
      'no-undef': 'off', // Disabled for TypeScript - TS handles this better
      'no-redeclare': 'error',
      'no-extra-semi': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'sort-imports': [
        'error',
        {ignoreCase: true, ignoreDeclarationSort: true},
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^',
          destructuredArrayIgnorePattern: '^',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      'no-promise-executor-return': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      camelcase: 'off',

      'no-alert': 'error',
      'no-nested-ternary': 'error',
      'no-restricted-exports': 'error',
      'prefer-destructuring': ['error', {object: true, array: false}],

      'react/no-children-prop': 'error',
      'react/no-array-index-key': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-useless-fragment': ['error', {allowExpressions: true}],
      'react/no-unstable-nested-components': ['error', {allowAsProps: true}],
      'react/jsx-no-duplicate-props': ['error', {ignoreCase: false}],

      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/control-has-associated-label': 'off',

      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'perfectionist/sort-named-exports': [
        'warn',
        {order: 'asc', type: 'line-length'},
      ],
      'perfectionist/sort-imports': [
        'warn',
        {
          order: 'asc',
          type: 'line-length',
          groups: [
            'style',
            'type',
            ['builtin', 'external'],
            'internal',
            'object',
            'unknown',
          ],
          internalPattern: ['./'],
        },
      ],
    },
    plugins: {
      prettier: pluginPrettier,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      '@typescript-eslint': typescriptPlugin,
      'unused-imports': unusedImports,
      '@next/next': eslintPluginNext,
      perfectionist: pluginPerfectionist,
    },
  },
  {
    files: ['**/route.js', '**/route.ts'],
    rules: {
      'no-console': ['error', {allow: ['error', 'log']}],
    },
  },

  {
    files: ['**/use*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': ['error', {allow: ['error']}],
    },
  },
];
