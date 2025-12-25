import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

test.describe('Links verification', () => {
  test('Summary links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByText('Transfer TAT', { exact: true }).click();
    await page.getByText('Refresh').click();
    await page.getByRole('link', { name: 'Know more' }).click();
  });

  test('Beneficiaries links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Beneficiaries$/ })
      .nth(1)
      .click();

    await page.locator('a').filter({ hasText: 'All' }).first().click();
    const page6Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page6 = await page6Promise;
    await page6.close();
    await page.locator('a').filter({ hasText: 'Batch' }).first().click();
    const page7Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page7 = await page7Promise;
    await page7.close();
    await page.locator('a').filter({ hasText: 'Download Sample File' }).click();
    await page
      .getByRole('option', { name: 'Others Send money to this' })
      .locator('div')
      .first()
      .click();
    // const page8Promise = page.waitForEvent('popup');
    await page.getByTestId('XLS').click();
    // const page8 = await page8Promise;
    // await page8.close();
  });

  test('Transfers links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Transfers$/ })
      .nth(1)
      .click();
    await page.locator('a').filter({ hasText: 'All' }).nth(1).click();
    await page.getByRole('link', { name: 'Know more' }).click();
    await page.locator('a').filter({ hasText: 'Batch' }).nth(1).click();
    const page3Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page3 = await page3Promise;
    await page3.close();
    await page
      .locator('a')
      .filter({ hasText: 'Approve Batch' })
      .first()
      .click();
    const page4Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page4 = await page4Promise;
    await page4.close();
    await page.locator('a').filter({ hasText: 'Reversed' }).click();
    const page5Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page5 = await page5Promise;
    await page5.close();
  });

  test('Cashgrams links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Cashgram$/ })
      .nth(2)
      .click();
    await page.locator('a').filter({ hasText: 'All' }).nth(2).click();
    await page.getByText('Cashgram - Send Payout Links').click();
    await page.locator('a').filter({ hasText: 'Batch' }).nth(3).click();
    await page.locator('a').filter({ hasText: 'Approve Batch' }).nth(1).click();
    await page.getByText('How does Cashgram work?').click();
  });

  test('Invoices links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Invoices$/ })
      .nth(2)
      .click();
    await page.locator('a').filter({ hasText: 'All' }).nth(3).click();
    await page.getByText('AllApprove').click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('All Time').click();
    await page
      .locator('a')
      .filter({ hasText: /^Approve$/ })
      .click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('All Time').click();
  });

  test('FundSources links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Fund Sources$/ })
      .nth(2)
      .click();

    await page.locator('a').filter({ hasText: 'All' }).nth(4).click();
    await page
      .getByRole('button', { name: 'Manage Fund Source Weightage' })
      .click();
    await page.getByText('Define what percentage of').click();
    await page.getByText('Cancel').click();
    // await page.getByText('Cashfree Wallet').click();
    await page.getByRole('cell', { name: '%' }).click();
    // const page9Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    // const page9 = await page9Promise;
    // await page9.close();
    await page.getByRole('link', { name: 'Set Threshold' }).click();

    await page.goto(
      'https://merchant.cashfree.com/payouts/settings/email-notifications',
    );

    await page
      .getByRole('heading', { name: 'Settings - Email Notifications' })
      .click();
    await page.getByText('Configure the email category').click();
    await page.getByRole('button', { name: 'Add Recipient' }).click();
    const page10Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page10 = await page10Promise;
    await page10.close();
    await page.getByText('Cancel').click();
  });

  test('Cashfree Wallet links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.goto(
      'https://merchant.cashfree.com/payouts/fund-sources/21194/details/overview',
    );

    await page
      .locator('div')
      .filter({ hasText: /^Last RechargeView All$/ })
      .getByRole('link')
      .click();

    await page.getByText('Recharge History').click();
    await page.getByText('Statements').click();
    await page.getByRole('link', { name: 'Know more' }).click();
  });

  test('Account links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .getByTestId('sidebar-menu')
      .locator('a')
      .filter({ hasText: 'Account' })
      .click();
    const page12Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page12 = await page12Promise;
    await page12.close();
  });

  test('Developers links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Developers$/ })
      .nth(2)
      .click();
    await page.locator('a').filter({ hasText: 'API Keys' }).click();
    const page13Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page13 = await page13Promise;
    await page13.close();
    await page
      .locator('a')
      .filter({ hasText: 'Two-Factor Authentication' })
      .click();
    const page14Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page14 = await page14Promise;
    await page14.close();
    await page.locator('a').filter({ hasText: 'Webhooks' }).click();
    const page15Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Know more' }).click();
    const page15 = await page15Promise;
    await page15.close();
    await page.locator('a').filter({ hasText: 'API Metrics' }).click();
    await page.getByText('Error Percentage').click();
    await page.getByText('Latency').click();
    await page.getByText('Error Count').click();
    await page
      .locator('a')
      .filter({ hasText: 'Integration Checklist' })
      .click();
    await page.getByText('Please ensure that you are in').click();
  });

  test('Reports links are not broken', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.locator('a').filter({ hasText: 'Reports' }).click();
    await page.getByText('How to download a Report?').click();
  });
});
