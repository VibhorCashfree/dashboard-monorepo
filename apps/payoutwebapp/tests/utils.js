import { expect } from './config/fixtures';

// Pages
import LoginPage from './pages/LoginPage';
import PayoutsPage from './pages/PayoutsPage';

const LANDING_PAGE_URL = `${process.env.DASHBOARD_URL}/${process.env.MERCHANT_APP_BASE_PATH}/landing?env=prod`;
const PAYOUTS_PAGE_URL = `${process.env.DASHBOARD_URL}${process.env.PUBLIC_PATH}summary`;

const merchantOwner = {
  username: process.env.STANDARD_MERCHANT_USERNAME,
  password: process.env.STANDARD_MERCHANT_PASSWORD,
};

const merchantAlias = {
  username: process.env.STANDARD_MERCHANT_ALIAS_USERNAME,
  password: process.env.STANDARD_MERCHANT_ALIAS_PASSWORD,
};

export const loginAndNavigateToLandingPage = async (page, isAlias) => {
  const loginPage = new LoginPage(page);

  await loginPage.load();

  const user = isAlias ? merchantAlias : merchantOwner;

  await loginPage.login_email(user.username, user.password);

  await page.waitForURL(LANDING_PAGE_URL);
  await expect(page).toHaveURL(LANDING_PAGE_URL);
};

export const navigateToPayouts = async (page) => {
  await page.goto(PAYOUTS_PAGE_URL);

  const productPage = new PayoutsPage(page);

  await productPage.loadProduct();
};
