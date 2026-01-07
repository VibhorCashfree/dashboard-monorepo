module.exports = {
  extends: [
    require.resolve('@dashboard-monorepo/shared/eslint-config'), 
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
     browser: true,
     es2021: true,
     jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  ignorePatterns: ['webpack/*'],
  settings: {
     'import/resolver': {
       typescript: {},
        webpack: {
         config: './webpack/webpack.config.js',
       },
     },
  },
};
