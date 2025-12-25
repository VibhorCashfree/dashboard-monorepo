import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

test.describe('Transfer', () => {
  test('Create', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();

    await page
      .getByTestId('sidebar-menu')
      .getByText('Transfers')
      .first()
      .click();
    await page.locator('a').filter({ hasText: 'All' }).nth(1).click();

    await page.getByRole('button', { name: 'Quick Transfer' }).click();

    await page.getByRole('textbox', { name: 'Enter Beneficiary ID' }).click();
    await page
      .getByRole('textbox', { name: 'Enter Beneficiary ID' })
      .fill('test');
    await page.getByRole('option', { name: 'kisley shirish test' }).click();
    await page.getByText('Choose Fund Source').click();
    await page.getByRole('option').getByText('CASHFREE_5139').click();
    await page.getByText('Choose methodAmazon').click();
    await page
      .getByRole('option', { name: 'Amazon Pay' })
      .locator('span')
      .click();
    await page.getByRole('textbox', { name: 'Transfer ID' }).click();
    await page.getByPlaceholder('Amount').click();
    await page.getByPlaceholder('Amount').fill('1');
    await page.getByTestId('remarks').click();
    await page.getByTestId('remarks').fill('Testing remarks');
    await page.getByRole('button', { name: 'Confirm' }).click();

    const warningModal = page.getByText(
      'A transfer to kisley shirish was made in the last 5 minutes.',
    );

    const isWarningVisible = await warningModal.isVisible();

    if (isWarningVisible) {
      await page.getByRole('button', { name: 'Confirm' }).click();
    } else {
      await page.getByRole('button', { name: 'Close' }).click();
    }
  });
});
