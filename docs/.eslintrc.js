module.exports = {
  root: true,
  extends: ['../config/.eslintrc.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  ignorePatterns: ['build', '.docusaurus', 'node_modules'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};
