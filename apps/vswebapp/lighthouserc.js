const { default: puppeteer } = require('puppeteer');
const dotenv = require('dotenv').config({
  path: `${__dirname}/env/.env.development`,
});

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      startServerReadyPattern: 'compiled successfully',
      startServerReadyTimeout: 600000,
      url: [`http://localhost:3000${dotenv.parsed.PUBLIC_PATH}summary`],
      disableStorageReset: true,
      settings: {
        preset: 'desktop',
        disableStorageReset: true,
      },
      puppeteerScript: './puppeteer-script.js',
      puppeteerLaunchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        slowMo: 20,
        headless: false,
        disableStorageReset: true,
      },
      chromePath: puppeteer.executablePath(),
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lhci-server.cashfree.com',
      token: '2e43e9da-7822-4d50-b70b-e2c2b3b94f7c',
    },
  },
};
