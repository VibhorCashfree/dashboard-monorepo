import { test } from '../../config/fixtures';

// Utils
import { loginAndNavigateToLandingPage, navigateToPayouts } from '../../utils';

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

test.describe('FundSource', () => {
  test('Update Details, Self Withdrawal, Set Threshold', async ({ page }) => {
    await loginAndNavigateToLandingPage(page);
    await navigateToPayouts(page);

    await page.getByRole('button', { name: 'Switch to Test' }).click();
    await page.getByTestId('sidebar-menu').getByText('Fund Sources').click();
    await page.locator('a').filter({ hasText: 'All' }).nth(4).click();
    await page.getByText('Cashfree Wallet').click();

    // Update Details
    // await page.getByRole('button', { name: 'Actions' }).click();
    // await page.getByText('Update Details').click();
    // await page.getByRole('textbox').click();
    // await page.getByRole('textbox').fill('CASHFREE_5140');
    // await page.getByRole('button', { name: 'Update' }).click();
    // await page
    //   .locator('div')
    //   .filter({ hasText: /^CASHFREE_5140$/ })
    //   .click();
    // await page.getByRole('button', { name: 'Actions' }).click();
    // await page.getByText('Update Details').click();
    // await page.getByRole('textbox').click();
    // await page.getByRole('textbox').fill('CASHFREE_5139');
    // await page.getByRole('button', { name: 'Update' }).click();
    // await page.getByText('CASHFREE_5139').nth(1).click();

    // Self Withdrawal
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByPlaceholder('Amount').click();
    await page.getByPlaceholder('Amount').fill('1');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('This is remarks');
    await page
      .locator('form')
      .getByRole('button', { name: 'Withdraw' })
      .click();

    const limitExceeded = page.getByText(
      'You have reached maximum withdrawals for the day.',
    );

    if (limitExceeded) {
      return;
    }

    await page
      .getByText('Withdrawal of ₹ 1 was initiated successfully')
      .click();
    await page.getByRole('button', { name: 'Close' }).click();

    // Set Threshold
    await page.getByRole('link', { name: 'Set Threshold' }).click();
    await page.getByPlaceholder('Amount').click();
    await page.getByPlaceholder('Amount').fill('' + randomBetween(1, 50));
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByText('Low balance threshold set').click();
  });
});
