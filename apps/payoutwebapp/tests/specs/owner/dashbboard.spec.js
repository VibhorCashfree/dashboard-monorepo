import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

test.describe('Payouts dashboard', () => {
  test('Summary', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByText('Transfer TAT', { exact: true }).click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('Last 30 days').click();
    await page.getByText('Count', { exact: true }).click();
  });

  test('Beneficiaries', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Beneficiaries$/ })
      .nth(1)
      .click();
    await page.locator('a').filter({ hasText: 'All' }).first().click();
    await page.getByRole('button', { name: 'Add Beneficiary' }).click();
    await page.locator('line').nth(3).click();
    await page.locator('a').filter({ hasText: 'Batch' }).first().click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('Last Month').click();
  });

  test('Transfers', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Transfers$/ })
      .nth(1)
      .click();
    await page.locator('a').filter({ hasText: 'All' }).nth(1).click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('Last Month').click();
    await page.getByRole('button', { name: 'Quick Transfer' }).click();
    await page.locator('.header > .cross').click();
    await page
      .locator('a')
      .filter({ hasText: 'Approve Batch' })
      .first()
      .click();
    await page.locator('a').filter({ hasText: 'Reversed' }).click();
  });

  test('Cashgrams', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Cashgram$/ })
      .nth(2)
      .click();
    await page.locator('a').filter({ hasText: 'Batch' }).nth(3).click();
    await page.locator('a').filter({ hasText: 'All' }).nth(2).click();
    await page.locator('a').filter({ hasText: 'Approve Batch' }).nth(1).click();
    await page.getByText('How does Cashgram work?').click();
  });

  test('Invoices', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Invoices$/ })
      .nth(2)
      .click();
    await page.locator('a').filter({ hasText: 'All' }).nth(3).click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('Last 15 days').click();
  });

  test('Payout Protect', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Payout Protect$/ })
      .nth(2)
      .click();
    await page.locator('a').filter({ hasText: 'Risky Transfers' }).click();
    await page.getByText('₹').nth(2).click();
    await page.getByText('Blocked Transfers').click();
    await page.locator('a').filter({ hasText: 'Overview' }).click();
    await page.locator('a').filter({ hasText: 'My Lists' }).click();
    await page.getByRole('button', { name: 'Add to Blacklist' }).click();
  });

  test('FundSources', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Fund Sources$/ })
      .nth(2)
      .click();

    await page.getByText('AllLeadsDowntimes').click();
    await page.locator('a').filter({ hasText: 'All' }).nth(4).click();
    await page.getByRole('button', { name: 'Add Fund Source' }).click();
    await page.getByText('Bank Account', { exact: true }).click();
    await page.locator('.cross').click();
    await page.locator('tr:nth-child(4) > td:nth-child(2)').click();
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByText('Authenticate').click();
    await page.locator('.cross').click();
    await page.getByText('Statements').click();
    await page.getByText('Recharge History').click();
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    await page.getByText('Last Month').click();
  });

  test('Account', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .getByTestId('sidebar-menu')
      .locator('a')
      .filter({ hasText: 'Account' })
      .click();
  });

  test('Developers', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page
      .locator('div')
      .filter({ hasText: /^Developers$/ })
      .nth(1)
      .click();
    await page
      .locator('a')
      .filter({ hasText: 'Two-Factor Authentication' })
      .click();
    await page
      .locator('div')
      .filter({ hasText: /^IP Whitelist$/ })
      .first()
      .click();
    await page.getByRole('option', { name: 'Public Key' }).click();
    await page.locator('a').filter({ hasText: 'API Metrics' }).click();
    await page
      .locator('a')
      .filter({ hasText: 'Integration Checklist' })
      .click();
  });

  test('Reports', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.locator('a').filter({ hasText: 'Reports' }).click();
    await page.getByText('SelectTransferView details of').click();
    await page.getByText('View details of Payouts made').click();
    await page.getByRole('button', { name: 'Generate Report' }).click();
    await page
      .locator('form')
      .filter({ hasText: 'Report NameFile' })
      .getByRole('button')
      .click();
  });
});
