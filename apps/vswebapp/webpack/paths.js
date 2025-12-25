const path = require('path');
const DOTENV = require('dotenv').config({
  path: `${__dirname}/../env/.env.${process.env.NODE_ENV}`,
});

module.exports = {
  // Source files
  SRC_PATH: path.resolve(__dirname, '../app', 'index.js'),

  // Environment Variables
  ENV_PATH: path.resolve(__dirname, '../env', `.env.${process.env.NODE_ENV}`),

  // Production build files
  BUILD_PATH: path.resolve(__dirname, `../${process.env.BUILD_FOLDER_PATH}`),

  // Static files that get copied to build folder
  PUBLIC_PATH: path.resolve(__dirname, '../public'),
  OUTPUT_PATH: DOTENV.parsed.OUTPUT_PATH || '/',
  // PUBLIC_PATH: DOTENV.parsed.OUTPUT_PATH || '/',

  TEMPLATE: path.resolve(__dirname, '../app', 'index.html'),
};
