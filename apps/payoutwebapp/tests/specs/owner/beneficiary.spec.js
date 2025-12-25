import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

const beneId = parseInt(Date.now() / 1000) + 'beneId';

test.describe('Beneficiary', () => {
  test('Create, Delete', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Beneficiaries').click();
    await page.locator('a').filter({ hasText: 'All' }).first().click();

    await page.getByRole('button', { name: 'Add Beneficiary' }).click();

    await page.getByTestId('bene-id').getByRole('textbox').click();
    await page.getByTestId('bene-id').getByRole('textbox').fill(beneId);
    await page.getByText('Select Beneficiary Purpose').click();
    await page.getByRole('option', { name: 'Others' }).click();
    await page.getByTestId('name').getByRole('textbox').click();
    await page.getByTestId('name').getByRole('textbox').fill('john doe');
    await page.getByTestId('phone').getByRole('textbox').click();
    await page.getByTestId('phone').getByRole('textbox').fill('9999999999');
    await page.getByTestId('email').getByRole('textbox').click();
    await page
      .getByTestId('email')
      .getByRole('textbox')
      .fill('john@cashfree.com');
    await page.getByTestId('address1').click();
    await page.getByTestId('address1').fill('house addresss');
    await page.getByRole('button', { name: 'Next' }).click();
    await page
      .locator('form')
      .getByRole('button', { name: 'Add Beneficiary' })
      .click();

    // Delete
    await page.getByTestId('delete').nth(0).click();
    await page.getByText('You will not be able to').click();
    await page.getByTestId('confirm-button').click();
    await page.getByText('Beneficiary Successfully Deleted').click();
  });

  test('Batch', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page.getByTestId('sidebar-menu').getByText('Beneficiaries').click();
    await page.locator('a').filter({ hasText: 'Batch' }).first().click();

    await page.getByRole('button', { name: 'Upload File' }).click();
    await page.getByTestId('file-type-dropdown').click();
    await page.getByRole('option', { name: 'Others' }).click();
    await page.getByRole('button', { name: 'Choose a file' }).click();
    await page
      .locator('input[type="file"]')
      .setInputFiles('./tests/assets/bene.csv');
    await page.getByTestId('upload-file-btn').click();
    await page.getByRole('button', { name: 'Close' }).click();
  });
});
