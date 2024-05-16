module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/newline-after-import': 'error',
    'import/no-unresolved': 'error',
    'import/extensions': 'off',
  
  },
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
};