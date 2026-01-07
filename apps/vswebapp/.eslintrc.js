module.exports = {
  extends: [
      require.resolve('@dashboard-monorepo/shared/eslint-config'),
      'airbnb', 
      'prettier/react'
  ], 
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-param-reassign': 2,
    'import/no-unresolved': 2,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
  },
   settings: {
    'import/resolver': {
      webpack: {
        config: './webpack/webpack.config.js',
      },
    },
  },
};
