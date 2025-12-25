const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const dotenv = require('dotenv').config({
  path: `${__dirname}/../envs/.env.${process.env.APP_ENV}`,
});

console.table(dotenv.parsed);

const deps = require('../package.json').dependencies;

module.exports = {
  entry: path.resolve(__dirname, '../app', 'index.js'),
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), dotenv.parsed.BUILD_FOLDER_PATH),
    publicPath:
      dotenv.parsed.NODE_ENV === 'development'
        ? '/'
        : dotenv.parsed.PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      PUBLIC_PATH: JSON.stringify(dotenv.parsed.PUBLIC_PATH),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app', 'index.html'),
      templateParameters: {
        isProd: dotenv.parsed.APP_ENV === 'prod',
      },
    }),
    new ModuleFederationPlugin({
      name: 'PayoutModule',
      filename: 'remoteEntry.js',
      remotes: {
        RiskShieldWebApp: dotenv.parsed.RISK_SHIELD_MODULE,
        CommonModule: dotenv.parsed.COMMON_MODULE,
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
  ],
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};
