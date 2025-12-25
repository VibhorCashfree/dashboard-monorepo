import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

const cashgramId = parseInt(Date.now() / 1000) + 'cashgramId';

const date = new Date();
const today = date.getDate();

test.describe('Cashgram', () => {
  test('Create, Send, Deactivate', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Cashgram').click();
    await page.locator('a').filter({ hasText: 'All' }).nth(2).click();

    await page.getByRole('button', { name: 'Create Cashgram' }).click();

    await page.getByRole('textbox', { name: 'Cashgram ID' }).click();
    await page.getByRole('textbox', { name: 'Cashgram ID' }).fill(cashgramId);
    await page.getByText('Payout Type', { exact: true }).click();
    await page.getByRole('option', { name: 'Refunds' }).locator('span').click();
    await page.getByRole('textbox', { name: 'Beneficiary Name' }).click();
    await page.getByRole('textbox', { name: 'Beneficiary Name' }).fill('test');
    await page.getByRole('textbox', { name: 'digit phone number' }).click();
    await page
      .getByRole('textbox', { name: 'digit phone number' })
      .fill('9876543210');
    await page.getByPlaceholder('Amount').click();
    await page.getByPlaceholder('Amount').fill('1');
    await page.getByRole('textbox', { name: 'Select Date' }).click();

    await page
      .locator('section')
      .getByText('' + today, { exact: true })
      .click();

    await page.getByRole('button', { name: 'Apply' }).click();
    await page.getByTestId('description').getByRole('textbox').click();
    await page
      .getByTestId('description')
      .getByRole('textbox')
      .fill('This is reason');
    await page.locator('textarea[name="remarks"]').click();
    await page.locator('textarea[name="remarks"]').fill('This is remarks');
    await page.getByText('SMS').click();
    await page.getByText('Email', { exact: true }).click();
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await page.getByText('Cashgram successfully created').click();
    await page.getByRole('button', { name: 'Close' }).click();

    // Send
    await page.getByRole('row', { name: cashgramId }).getByRole('img').click();
    await page.locator('a').filter({ hasText: 'Send' }).click();
    await page.getByText('SMS (9876543210)').click();
    await page.getByRole('button', { name: 'Send' }).click();
    await page.getByText('Cashgram sent').click();

    // Delete
    await page.getByRole('row', { name: cashgramId }).getByRole('img').click();
    await page.locator('a').filter({ hasText: 'Deactivate' }).click();
    await page.getByText('Are you sure to deactivate').click();
    await page.getByRole('button', { name: 'Deactivate' }).click();
    await page.getByText('Cashgram successfully').click();
  });
});
