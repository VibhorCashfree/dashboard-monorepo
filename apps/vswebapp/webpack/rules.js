// eslint-disable-next-line no-undef
module.exports = [
  // Use Babel to transpile TypeScript and TypeScript / React files to ES5
  {
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(eot|otf|ttf|woff|woff2)$/,
    use: 'file-loader',
  },
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB
          limit: 10 * 1024,
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            enabled: false,
            // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
            // Try enabling it in your environment by switching the config to:
            // enabled: true,
            // progressive: true,
          },
          gifsicle: {
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 7,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      },
    ],
  },
  {
    test: /\.html$/,
    use: 'html-loader',
  },
  {
    test: /\.(mp4|webm)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    },
  },
];
