/* eslint-disable no-undef */
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  ignorePatterns: [
    'babel.config.js',
    'metro.config.js',
    'react-native.config.js'
  ],
  plugins: ['react', 'only-warn'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        arrowParens: 'avoid',
        trailingComma: 'none'
      }
    ],
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/named': 'off',
    'react/prop-types': [
      'error',
      {
        ignore: [
          'navigation',
          'screenProps',
          'history',
          'location',
          'component'
        ]
      }
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn']
      }
    ]
  }
};
