import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

test.describe('Developers', () => {
  test('API Keys', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Developers').click();
    await page.locator('a').filter({ hasText: 'API Keys' }).click();

    // Generate API Keys
    const disabled = await page
      .getByRole('button', { name: 'Generate API Keys' })
      .isDisabled();

    if (disabled) {
      return;
    }

    await page.getByRole('button', { name: 'Generate API Keys' }).click();

    const limitExceeded = page.getByText('Daily Limit Exceeded');

    if (limitExceeded) {
      return;
    }

    await page.getByRole('button', { name: 'Download API Keys' }).click();

    // Delete API Keys
    await page
      .getByRole('row', { name: 'User Name' })
      .getByTestId('delete')
      .first()
      .click();

    await page.getByRole('button', { name: 'Delete Immediately' }).click();
  });

  test('2FA: IP Address', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Developers').click();
    await page
      .locator('a')
      .filter({ hasText: 'Two-Factor Authentication' })
      .click();

    // Add IP Address
    await page.getByRole('button', { name: 'Add IP Address' }).click();
    await page.getByRole('textbox', { name: 'Ex:' }).click();
    await page.getByRole('textbox', { name: 'Ex:' }).fill('3.3.3.3');
    await page
      .locator('form')
      .getByRole('button', { name: 'Add IP Address' })
      .click();

    const limitExceeded = page.getByText('Daily Limit Exceeded');

    if (limitExceeded) {
      return;
    }

    // Delete IP Address
    await page
      .getByRole('row', { name: 'User Name' })
      .getByTestId('delete')
      .first()
      .click();

    await page.getByRole('button', { name: 'Delete' }).click();
  });

  test('2FA: Public Key', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Developers').click();
    await page
      .locator('a')
      .filter({ hasText: 'Two-Factor Authentication' })
      .click();

    await page.getByText('IP WhitelistIP').click();
    await page
      .getByRole('option', { name: 'Public Key' })
      .locator('span')
      .click();

    // Delete Public Key
    await page.getByTestId('delete').click();
    await page.getByText('Are you sure you want to').click();
    await page.getByRole('button', { name: 'Delete' }).click();

    // Generate Public Key
    await page.getByRole('button', { name: 'Generate Public Key' }).click();
    await page.getByText('The password to access the').click();
    await page.getByRole('button', { name: 'Ok' }).click();
  });

  test('Webhooks', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Developers').click();
    await page.locator('a').filter({ hasText: 'Webhooks' }).click();

    // Test & Add Webhook
    await page.getByRole('button', { name: 'Add Webhook URL' }).click();
    await page.getByRole('textbox', { name: 'example.com' }).click();
    await page
      .getByRole('textbox', { name: 'example.com' })
      .fill('www.google.com');
    await page.locator('i').click();
    await page.getByRole('option', { name: 'V2' }).click();
    await page.getByRole('button', { name: 'Test & Add Webhook' }).click();
    await page.getByText('405');
  });
});
