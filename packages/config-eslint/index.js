module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', 
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error', require('@dashboard-monorepo/config-prettier')],
    'react/display-name': 'off',
    'no-irregular-whitespace': 'off',
    'react/no-render-return-value': 'off',
    'no-console': 'warn',
    'curly': ['error', 'all'],
    'arrow-body-style': ['error', 'as-needed']
  },
  settings: {
     react: {
       version: 'detect',
     },
  }
};
