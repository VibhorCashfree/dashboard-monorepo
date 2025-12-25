const webpack = require('webpack');
const { merge } = require('webpack-merge');

const BASE_CONFIG = require('./webpack.config.js');

module.exports = merge(BASE_CONFIG, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    client: {
      overlay: false,
    },
  },
  plugins: [
    // Note: Only update what has changed on hot reload
    // Require the statement "module.hot.accept();" in the root index.jsx !
    new webpack.HotModuleReplacementPlugin(),
  ],
});
