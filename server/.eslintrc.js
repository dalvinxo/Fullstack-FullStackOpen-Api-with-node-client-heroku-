module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'jest':true,
    "cypress/globals": true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  "plugins": [
    "jest","react", "cypress"
  ],
  'rules': {
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
    'eqeqeq': ['error', 'always'],
    'no-fallthrough': 'error',
    'no-trailing-spaces': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'windows'],
    'no-debugger': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
  }
}
