const dotenv = require('dotenv').config({
  path: `${__dirname}/envs/.env.development`,
});
module.exports = async browser => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(600000);
  await page.goto(`https://gamma.cashfree.com/merchantwebapp/login?recpt=0`);
  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', process.env.LIGHTHOUSE_UN);
  await page.type('input[name="password"]', process.env.LIGHTHOUSE_PWD);
  await page.click('.login-container button[type="submit"]');
  await page.waitForNavigation();
};
