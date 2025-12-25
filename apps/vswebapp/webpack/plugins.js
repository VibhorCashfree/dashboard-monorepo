const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const PATHS = require('./paths');
const DEPS = require('../package.json').dependencies;

module.exports = [
  new Dotenv({ path: PATHS.ENV_PATH }),
  new CleanWebpackPlugin(),
  // Copies files from target to destination folder
  new CopyWebpackPlugin({
    patterns: [
      {
        from: PATHS.PUBLIC_PATH,
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: PATHS.TEMPLATE,
  }),
  new HtmlWebpackPlugin({
    template: PATHS.TEMPLATE,
    filename: '../index.html',
  }),
  new ModuleFederationPlugin({
    name: 'Notification', // This is the namespace under which all of our exposed components would be
    filename: 'moduleEntry.js', // This is the filename where all of our exposed components build exists
    remotes: (env => {
      const remotes = {};
      switch (env) {
        case 'development':
          remotes.CommonModule =
            'CommonModule@https://gamma.cashfree.com/commonwebapp/moduleEntry.js';
          break;
        case 'beta':
        case 'gamma':
          remotes.CommonModule =
            'CommonModule@https://gamma.cashfree.com/commonwebapp/moduleEntry.js';
          break;
        case 'prod-test':
          remotes.CommonModule =
            'CommonModule@https://prod.cashfree.com/common/moduleEntry.js';
          break;
        case 'prod':
        case 'production':
          remotes.CommonModule =
            'CommonModule@https://merchant.cashfree.com/common/moduleEntry.js';
          break;
        case 'qa':
          remotes.CommonModule =
            'CommonModule@https://merchant.qa.cashfree.net/common/moduleEntry.js';
        default:
          break;
      }
      return remotes;
    })(process.env.NODE_ENV),
    shared: {
      react: {
        singleton: true,
        eager: true,
        requiredVersion: DEPS.react,
      },
      'react-dom': {
        singleton: true,
        eager: true,
        requiredVersion: DEPS['react-dom'],
      },
      'react-router-dom': {
        singleton: true,
        eager: true,
        requiredVersion: DEPS['react-router-dom'],
      },
      'prop-types': {
        singleton: true,
        eager: true,
        requiredVersion: DEPS['prop-types'],
      },
      'styled-components': {
        singleton: true,
        eager: true,
        requiredVersion: DEPS['styled-components'],
      },
      '@cashfree-intl/coherent': {
        singleton: true,
        eager: true,
        requiredVersion: DEPS['@cashfree-intl/coherent'],
      },
    },
  }),
];
