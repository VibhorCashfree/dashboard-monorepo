import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

const emailId = parseInt(Date.now() / 1000) + 'cashfree@gmail.com';

test.describe('Settings', () => {
  test('Email Notifications', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.goto(
      'https://merchant.cashfree.com/payouts/settings/email-notifications',
    );
    await page.locator('.styled__StyledToggle-sc-3xb52t-0').first().click();
    await page.getByText('Setting updated successfully').click();

    // Add Recipient
    await page.getByRole('button', { name: 'Add Recipient' }).click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(emailId);
    await page.locator('label').filter({ hasText: 'Ageing Report' }).click();
    await page.locator('label').filter({ hasText: 'Cashgram Report' }).click();
    await page
      .locator('label')
      .filter({ hasText: 'Daily Reverse Transfer Report' })
      .click();
    await page
      .locator('label')
      .filter({ hasText: 'Low Balance Threshold Emails' })
      .click();
    await page
      .locator('label')
      .filter({ hasText: 'Daily Account Statement Report' })
      .click();
    await page
      .locator('label')
      .filter({ hasText: 'Credit Confirmation Emails' })
      .click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Recipient Added Successfully').click();
    await page.getByRole('button', { name: 'Close', exact: true }).click();
  });
});
