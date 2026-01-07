const PATHS = require('./paths');
const RULES = require('./rules');
const PLUGINS = require('./plugins');

module.exports = {
  entry: PATHS.SRC_PATH,
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: PATHS.BUILD_PATH,
    publicPath: PATHS.OUTPUT_PATH,
  },
  module: {
    rules: RULES,
  },
  plugins: PLUGINS,
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};
