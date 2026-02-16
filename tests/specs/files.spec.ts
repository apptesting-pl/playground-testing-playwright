import { test, expect } from '@playwright/test';
import { FilesPage } from '../pages/FilesPage';
import * as path from 'path';
import * as fs from 'fs';

test.describe('File Operations', () => {
  let filesPage: FilesPage;
  const testFilesDir = path.join(__dirname, '../fixtures/files');
  const testFilePath = path.join(testFilesDir, 'test-file.txt');
  const testImagePath = path.join(testFilesDir, 'test-image.png');

  test.beforeAll(async () => {
    if (!fs.existsSync(testFilesDir)) {
      fs.mkdirSync(testFilesDir, { recursive: true });
    }
    
    fs.writeFileSync(testFilePath, 'This is a test file content for upload testing.');
    
    const pngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    fs.writeFileSync(testImagePath, pngBuffer);
  });

  test.afterAll(async () => {
    if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    if (fs.existsSync(testImagePath)) fs.unlinkSync(testImagePath);
  });

  test.beforeEach(async ({ page }) => {
    filesPage = new FilesPage(page);
    await filesPage.goto();
  });

  test.describe('Single File Upload', () => {
    test('should upload single file', async () => {
      await filesPage.uploadFile(filesPage.singleUpload, testFilePath);
      await expect(filesPage.singleUploadOutput).toContainText('test-file.txt');
    });

    test('should display file size', async () => {
      await filesPage.uploadFile(filesPage.singleUpload, testFilePath);
      await expect(filesPage.singleUploadOutput).toContainText('file(s) selected');
    });
  });

  test.describe('Multiple File Upload', () => {
    test('should upload multiple files', async () => {
      await filesPage.uploadMultipleFiles(filesPage.multiUpload, [testFilePath, testImagePath]);
      
      await expect(filesPage.multiUploadOutput).toContainText('test-file.txt');
      await expect(filesPage.multiUploadOutput).toContainText('test-image.png');
    });

    test('should show correct file count', async () => {
      await filesPage.uploadMultipleFiles(filesPage.multiUpload, [testFilePath, testImagePath]);
      await expect(filesPage.multiUploadOutput).toContainText('2 file(s)');
    });
  });

  test.describe('File Download', () => {
    test('should download TXT file', async ({ page }) => {
      const downloadPromise = page.waitForEvent('download');
      await filesPage.downloadTxt.click();
      const download = await downloadPromise;
      
      expect(download.suggestedFilename()).toBe('sample.txt');
    });

    test('should download PDF file', async ({ page }) => {
      const downloadPromise = page.waitForEvent('download');
      await filesPage.downloadPdf.click();
      const download = await downloadPromise;
      
      expect(download.suggestedFilename()).toBe('sample.pdf');
    });

    test('should download CSV file', async ({ page }) => {
      const downloadPromise = page.waitForEvent('download');
      await filesPage.downloadCsv.click();
      const download = await downloadPromise;
      
      expect(download.suggestedFilename()).toBe('sample.csv');
    });
  });

  test.describe('Restricted File Types', () => {
    test('should verify image-only upload accepts attribute', async () => {
      await expect(filesPage.imageOnlyUpload).toHaveAttribute('accept', '.jpg,.jpeg,.png,.gif');
    });

    test('should verify PDF-only upload accepts attribute', async () => {
      await expect(filesPage.pdfOnlyUpload).toHaveAttribute('accept', '.pdf');
    });
  });

  test.describe('File Upload Zones', () => {
    test('should display upload zone', async () => {
      const uploadZone = filesPage.page.locator('#single-upload-zone');
      await expect(uploadZone).toBeVisible();
      await expect(uploadZone).toContainText('Click or drag a file');
    });

    test('should display file list after upload', async () => {
      await filesPage.uploadFile(filesPage.singleUpload, testFilePath);
      const fileList = filesPage.page.locator('#file-upload-list');
      await expect(fileList.locator('.file-item')).toBeVisible();
    });
  });
});