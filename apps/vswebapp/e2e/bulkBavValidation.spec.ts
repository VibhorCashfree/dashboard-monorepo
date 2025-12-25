import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { loginToCashfree, openSecureId } from './utils/authhelpers';
import { BANK_ACCOUNT_TEST_DATA, MENU_ITEMS, BUTTONS } from './utils/testConstants';
import { createUniqueCsvFile } from './utils/fileUtils';

test('Bank Account validation flow with batch upload', async ({ page }) => {
  // Folder to store CSV temporarily
  const uploadFolder = path.resolve(__dirname, './utils/files'); 
  const filePath = createUniqueCsvFile(uploadFolder);        // generate unique CSV file
  const fileName = path.basename(filePath);                  // get the file name

  try {
    // Step 1: Login
    await loginToCashfree(page);

    // Step 2: Navigate to Secure ID
    await openSecureId(page);

    // Step 3: Click Bank Account menu
    await page
      .getByTestId('sidebar-menu')
      .locator('a')
      .filter({ hasText: MENU_ITEMS.bankAccount })
      .click();

    // Step 4: Navigate to Batch Upload
    await page.getByText('Batch', { exact: true }).click();

    // Open the upload modal
    await page.getByRole('button', { name: BUTTONS.uploadFile }).click();

    // Set the file on the hidden input
    await page.locator('input[type="file"]').setInputFiles(filePath);

    // Click the submit/upload button
    await page.getByTestId('upload-file-btn').click();

    // Soft assert: success message appears
    await expect.soft(page.getByText('File uploaded successfully')).toBeVisible();

    // Close upload modal
    await page.getByRole('button', { name: BUTTONS.close }).click();

    // Click on 'Approve Batch' button
    await page.getByText('Approve Batch').click();

    // Wait for the table/grid to load the uploaded file
    const fileCell = page.getByRole('cell', { name: fileName });
    await expect(fileCell).toBeVisible();

    // Click on the file row
    await fileCell.click();

    // Click the approve button
    await page.getByTestId('approve-batch').click();

    // Confirm the approval
    await page.getByTestId('confirm-button').click();

    // Soft assert: success message
    await expect.soft(page.getByText('File Approved Successfully')).toBeVisible();
    await expect.soft(page.getByText('File Approved Successfully')).toHaveText('File Approved Successfully');

    // Close the modal
    await page.getByRole('button', { name: 'Close' }).click();
  } finally {
    // Cleanup: Delete the temporary CSV file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted temporary file: ${fileName}`);
    }
  }
});

// Ensures browser closes when test is done
test.afterEach(async ({ context }) => {
  await context.close();
});
