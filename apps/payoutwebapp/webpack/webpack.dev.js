const webpack = require('webpack');
const { merge } = require('webpack-merge');

const BASE_CONFIG = require('./webpack.config.js');

module.exports = merge(BASE_CONFIG, {
  mode: 'development', // (development | production)

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 3000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // Require the statement "module.hot.accept();" in the root index.jsx !
    new webpack.HotModuleReplacementPlugin(),
  ],
});
