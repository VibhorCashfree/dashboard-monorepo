import { test, expect } from '@playwright/test';
import { loginToCashfree, openSecureId,loginAndNavigateToPAN } from './utils/authhelpers';
import { PAN_TEST_DATA, MENU_ITEMS, BUTTONS, FIELD_LABELS,PAN_MESSAGES } from './utils/testConstants';

test('PAN validation flow', async ({ page }) => {

await loginAndNavigateToPAN(page)
  // Step 4 - Verify PAN
  await page.getByRole('button', { name: BUTTONS.verifyPan }).click();
  await page.getByRole('textbox', { name: 'Ex. ABCP1234A1' }).fill(PAN_TEST_DATA.panNumber);
  await page.getByRole('button', { name: BUTTONS.verify, exact: true }).click();

  // Soft Assert: success message
  await expect.soft(page.getByText('PAN is Valid')).toBeVisible();

  await page.waitForSelector('table');

  // Capture PAN Ref ID
  const idLocator = page.locator('div').filter({ hasText: /^100/ }).first();
  const panRefId = (await idLocator.innerText()).trim();
  console.log("Captured PAN Ref ID:", panRefId);

  await page.getByRole('button', { name: BUTTONS.close }).click();

  // Search & Filter
  await page.getByRole('button', { name: BUTTONS.searchFilter }).click();
  await page.locator('.ui.dropdown.styled__StyledDropdown-sc-gytok3-0.fCElZJ.label > .ml-1').click();
  await page.locator('span').filter({ hasText: 'PAN Ref. ID' }).click();

  const refInput = page.getByRole('textbox', { name: 'Enter PAN Ref. ID' });
  await refInput.fill(panRefId);
  await page.getByRole('button', { name: BUTTONS.apply }).click();

  // Soft Assert: filtered record
  const filteredRow = page.getByRole('cell', { name: panRefId }).first();
  await expect.soft(filteredRow).toBeVisible();

  await filteredRow.click();

  // Soft Assert: details page shows ID
  await expect.soft(page.getByText(panRefId, { exact: true })).toBeVisible();

  // Open Verification Details
  await page.getByText('Verification Details').click();

  // White card container
  const detailsBox = page.locator('div')
    .filter({ hasText: 'Verification Details' })
    .first()
    .locator('..');

  // Soft assert each label row exists
  for (const field of FIELD_LABELS) {
    const row = detailsBox.locator(`div:has-text("${field}")`).first();
    await expect.soft(row, `Missing field: ${field}`).toBeVisible();
  }

  await page.getByText(BUTTONS.back).click();
});

test('PAN validation flow – Invalid PAN case', async ({ page }) => {

  // Common navigation to PAN page
  await loginAndNavigateToPAN(page);

  // Click Verify PAN
  await page.getByRole('button', { name: BUTTONS.verifyPan }).click();

  // Enter INVALID PAN
  await page.getByRole('textbox', { name: 'Ex. ABCP1234A1' })
    .fill(PAN_TEST_DATA.invalidPan);

  // Submit
  await page.getByRole('button', { name: BUTTONS.verify, exact: true }).click();

  // Assert: Invalid PAN message appears
  await expect.soft(page.getByText(PAN_MESSAGES.invalid)).toBeVisible();

  // Close popup
  await page.getByRole('button', { name: BUTTONS.close }).click();

  // Invalid Pan number passed

    await page.getByRole('button', { name: BUTTONS.verifyPan }).click();

  const panField = page.getByRole('textbox', { name: 'Ex. ABCP1234A1' });

  // Input too-short PAN
  await panField.fill(PAN_TEST_DATA.incorrectPan);

  // Assert error message
  await expect.soft(
    page.getByText(PAN_MESSAGES.minLength)
  ).toBeVisible();


});

// --------------------- CLOSE BROWSER ONCE (AFTER ALL TESTS) ---------------------
test.afterAll(async ({ browser }) => {
  await browser.close();
});

