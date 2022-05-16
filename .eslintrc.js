module.exports = {
  extends: ['./node_modules/gts'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    curly: [2, 'multi-line'],
  },
  env: {
    jest: true,
  },
};
