import { test, expect } from '@playwright/test';
import { loginToCashfree, openSecureId,loginAndNavigateToBankAccount } from './utils/authhelpers';
import { 
  BANK_ACCOUNT_TEST_DATA, 
  MENU_ITEMS, 
  BUTTONS, 
  BANK_FIELD_LABELS, 
  BANK_ACCOUNT_TEST_DATA_INAVLID, 
  ERROR_MESSAGES
} from './utils/testConstants';


// --------------------- VALID CASE ---------------------
test('Bank Account validation flow - Valid case', async ({ page }) => {

  await loginAndNavigateToBankAccount(page);

  // Verify Bank Account
  await page.getByRole('button', { name: BUTTONS.verifyBankAccount }).click();

  await page.getByRole('textbox', { name: 'Account Number' })
    .fill(BANK_ACCOUNT_TEST_DATA.accountNumber);

  await page.getByRole('textbox', { name: 'IFSC' })
    .fill(BANK_ACCOUNT_TEST_DATA.ifscCode);

  await page.getByRole('textbox', { name: 'Account Holder Name' })
    .fill(BANK_ACCOUNT_TEST_DATA.accountHolderName);

  await page.getByRole('button', { name: BUTTONS.verify, exact: true }).click();

  // Soft assert popup
  await expect.soft(page.getByText('Bank Account is Valid')).toBeVisible();

  const popupBox = page.locator('div')
    .filter({ hasText: 'Bank Account is Valid' })
    .first()
    .locator('..');

  for (const field of BANK_FIELD_LABELS) {
    const row = popupBox.locator(`div:has-text("${field}")`).first();
    await expect.soft(row, `Missing field: ${field}`).toBeVisible();
  }

  await page.getByRole('button', { name: BUTTONS.close }).click();
});


// --------------------- INVALID CASE ---------------------
test('Bank Account validation flow - Invalid case', async ({ page }) => {

  await loginAndNavigateToBankAccount(page);

  await page.getByRole('button', { name: BUTTONS.verifyBankAccount }).click();

  await page.getByRole('textbox', { name: 'Account Number' })
    .fill(BANK_ACCOUNT_TEST_DATA_INAVLID.accountNumber);

  await page.getByRole('textbox', { name: 'IFSC' })
    .fill(BANK_ACCOUNT_TEST_DATA.ifscCode);

  await page.getByRole('textbox', { name: 'Account Holder Name' })
    .fill(BANK_ACCOUNT_TEST_DATA_INAVLID.accountHolderName);

  await page.getByRole('button', { name: BUTTONS.verify, exact: true }).click();

  await expect.soft(page.getByText('Bank Account is Invalid')).toBeVisible();

  await page.getByRole('button', { name: BUTTONS.close }).click();
});


// --------------------- ACCOUNT NUMBER and IFSC VALIDATION ERRORS ---------------------
test('Bank Account Number validation errors', async ({ page }) => {


  await loginAndNavigateToBankAccount(page);

  await page.getByRole('button', { name: 'Verify Bank Account' }).click();

  const accountNumberField = page.getByRole('textbox', { name: 'Account Number' });

  // ❌ Case 1 — Less than 6 characters
  await accountNumberField.fill(BANK_ACCOUNT_TEST_DATA_INAVLID.lessThanMin);
  await expect.soft(
    page.getByText(ERROR_MESSAGES.accountMin)
  ).toBeVisible();

  // ❌ Case 2 — More than 40 characters
  await accountNumberField.fill(BANK_ACCOUNT_TEST_DATA_INAVLID.moreThanMax);
  await expect.soft(
    page.getByText(ERROR_MESSAGES.accountMax)
  ).toBeVisible();

const ifscField = page.getByRole('textbox', { name: 'IFSC' });

  // ❌ Case 3 — Invalid ifsc format
  await ifscField.fill(BANK_ACCOUNT_TEST_DATA_INAVLID.invalidFormat);
  await expect.soft(
    page.getByText(ERROR_MESSAGES.invalidIFSC)
  ).toBeVisible();

});

// --------------------- CLOSE BROWSER ONCE (AFTER ALL TESTS) ---------------------
test.afterAll(async ({ browser }) => {
  await browser.close();
});
