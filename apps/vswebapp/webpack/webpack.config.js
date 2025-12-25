const PATHS = require('./paths');
const RULES = require('./rules');
const PLUGINS = require('./plugins');
const EXTENSIONS = ['.tsx', '.ts', '.js'];

module.exports = {
  entry: PATHS.SRC_PATH,
  output: {
    clean: true,
    path: PATHS.BUILD_PATH,
    filename: `[name].[chunkhash]-${Date.now()}.js`,
    chunkFilename: `[name].[chunkhash].chunk-${Date.now()}.js`,
    publicPath: PATHS.OUTPUT_PATH,
  },
  module: {
    rules: RULES,
  },
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: EXTENSIONS,
  },
  plugins: PLUGINS,
};
