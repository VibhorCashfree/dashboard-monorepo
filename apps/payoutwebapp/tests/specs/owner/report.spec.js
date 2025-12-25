import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

test.describe('Report', () => {
  test('Generate, Download, Delete', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();
    await page.locator('a').filter({ hasText: 'Reports' }).click();

    await page.getByText('Select', { exact: true }).click();
    await page
      .getByText('View details of Payouts made for the date range selected')
      .click();
    await page.getByRole('button', { name: 'Generate Report' }).click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').press('ArrowRight');
    await page.getByRole('textbox').press('ArrowRight');
    await page.getByRole('textbox').press('ArrowRight');
    await page.getByRole('textbox').fill('cashgram_test');
    await page.getByText('Today').click();
    await page.getByText('Last 7 days').nth(1).click();
    await page
      .locator('form')
      .filter({ hasText: 'Report NameFile' })
      .getByRole('button')
      .click();
    await page.getByText('cashgram_test.csv').first().click();

    // Download
    await page.getByTestId('table-row').nth(1).locator('svg').click();
    await page.locator('a').filter({ hasText: 'Download' }).nth(0).click();

    // Delete
    // await page.getByTestId('table-row').nth(1).locator('svg').click();
    // await page.locator('a').filter({ hasText: 'Delete' }).nth(0).click();
    // await page.getByTestId('confirm-button').click();
  });
});
