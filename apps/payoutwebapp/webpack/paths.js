const path = require('path');
const dotenv = require('dotenv').config({
  path: `${__dirname}/../envs/.env.${process.env.APP_ENV}`,
});

if (dotenv.error) {
  throw dotenv.error;
}

console.table(dotenv.parsed);

module.exports = {
  SRC_PATH: path.resolve(__dirname, '../app', 'index.js'),
  BUILD_PATH: path.resolve(process.cwd(), dotenv.parsed.BUILD_FOLDER_PATH),
  OUTPUT_PATH:
    dotenv.parsed.NODE_ENV === 'development'
      ? '/'
      : dotenv.parsed.PUBLIC_PATH,
  ENV_VARS: dotenv.parsed, // Exporting parsed envs for plugins
  TEMPLATE: path.resolve(__dirname, '../app', 'index.html'),
};
