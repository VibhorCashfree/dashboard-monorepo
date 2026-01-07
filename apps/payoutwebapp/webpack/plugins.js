const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

const PATHS = require('./paths');
const deps = require('../package.json').dependencies;

module.exports = [
  new CleanWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin({
    async: false,
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(PATHS.ENV_VARS),
    PUBLIC_PATH: JSON.stringify(PATHS.OUTPUT_PATH),
  }),
  new HtmlWebpackPlugin({
    template: PATHS.TEMPLATE,
    templateParameters: {
      isProd: PATHS.ENV_VARS.APP_ENV === 'prod',
    },
  }),
  new ModuleFederationPlugin({
    name: 'PayoutModule',
    filename: 'remoteEntry.js',
    remotes: {
      RiskShieldWebApp: PATHS.ENV_VARS.RISK_SHIELD_MODULE,
      CommonModule: PATHS.ENV_VARS.COMMON_MODULE,
    },
    exposes: {},
    shared: {
      ...deps,
      axios: {
        singleton: true,
        requiredVersion: deps.axios,
      },
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
      'react-router-dom': {
        singleton: true,
        requiredVersion: deps['react-router-dom'],
      },
      redux: {
        singleton: true,
        requiredVersion: deps.redux,
      },
      'react-redux': {
        singleton: true,
        requiredVersion: deps['react-redux'],
      },
      'prop-types': {
        singleton: true,
        requiredVersion: deps['prop-types'],
      },
      'styled-components': {
        singleton: true,
        requiredVersion: deps['styled-components'],
      },
      '@cashfree-intl/coherent': {
        singleton: true,
        requiredVersion: deps['@cashfree-intl/coherent'],
      },
      '@cashfree-intl/auth': {
        singleton: true,
        requiredVersion: deps['@cashfree-intl/auth'],
      },
      '@cashfree-intl/analytics': {
        singleton: true,
        requiredVersion: deps['@cashfree-intl/analytics'],
      },
      '@fingerprintjs/fingerprintjs': {
        singleton: true,
        requiredVersion: deps['@fingerprintjs/fingerprintjs'],
      },
      'semantic-ui-react': {
        singleton: true,
        requiredVersion: deps['semantic-ui-react'],
      },
      moment: {
        singleton: true,
        requiredVersion: deps.moment,
      },
      'moment-timezone': {
        singleton: true,
        requiredVersion: deps['moment-timezone'],
      },
      lodash: {
        singleton: true,
        requiredVersion: deps.lodash,
      },
      eventemitter3: {
        singleton: true,
        requiredVersion: deps.eventemitter3,
      },
    },
  }),
];
