/*
 * Copyright (c) Folly Systems.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const OFF = 0;
const WARNING = 1;
const ERROR = 2;
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'jest',
    'react-hooks',
    'prettier',
    'header',
  ],
  rules: {
    'class-methods-use-this': OFF, // It's a way of allowing private variables.
    'consistent-return': OFF,
    'func-names': OFF, // Ignore certain webpack alias because it can't be resolved
    'import/prefer-default-export': OFF,
    'jsx-a11y/click-events-have-key-events': WARNING,
    'jsx-a11y/no-noninteractive-element-interactions': WARNING,
    'no-console': OFF,
    'no-underscore-dangle': OFF,
    'react/jsx-closing-bracket-location': OFF, // Conflicts with Prettier.
    'react/jsx-filename-extension': OFF,
    'react/jsx-one-expression-per-line': OFF,
    'react/no-array-index-key': OFF, // Sometimes its ok, e.g. non-changing data.
    'react/prop-types': OFF,
    'react/destructuring-assignment': ERROR,
    'react/prefer-stateless-function': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'no-useless-constructor': WARNING,
    'no-use-before-define': [
      ERROR,
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/camelcase': WARNING,
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      { args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'no-console': WARNING,
    'prettier/prettier': [
      ERROR,
      {
        endOfLine: 'auto',
      },
    ],
    'header/header': [
      ERROR,
      'block',
      [
        '',
        ' Copyright (c) Folly Systems.',
        '',
        ' This source code is licensed under the MIT license found in the',
        ' LICENSE file in the root directory of this source tree.',
        '',
      ],
    ],
  },
};
