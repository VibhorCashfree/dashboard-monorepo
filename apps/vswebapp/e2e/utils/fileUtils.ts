import * as path from 'path';
import * as fs from 'fs';

export function createUniqueCsvFile(
  folderPath: string,
  baseName = 'bulk_auto',
  content?: string
): string {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const timestamp = Date.now();
  const fileName = `${baseName}_${timestamp}.csv`;
  const filePath = path.join(folderPath, fileName);

  // Default content with correct headers if not passed
  if (!content) {
    content = 'name,phone,bankAccount,ifsc\nJohn Doe,9999999999,12345678910,SBIN0000001';
  }

  fs.writeFileSync(filePath, content);
  return filePath;
}
