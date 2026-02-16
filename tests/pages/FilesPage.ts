import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FilesPage extends BasePage {
  readonly singleUpload: Locator;
  readonly singleUploadOutput: Locator;
  
  readonly multiUpload: Locator;
  readonly multiUploadOutput: Locator;
  
  readonly downloadTxt: Locator;
  readonly downloadPdf: Locator;
  readonly downloadCsv: Locator;
  
  readonly imageOnlyUpload: Locator;
  readonly pdfOnlyUpload: Locator;

  constructor(page: Page) {
    super(page);
    
    this.singleUpload = page.locator('#file-upload');
    this.singleUploadOutput = page.locator('#file-upload-output');
    
    this.multiUpload = page.locator('#multi-upload');
    this.multiUploadOutput = page.locator('#multi-upload-output');
    
    this.downloadTxt = page.locator('#download-txt');
    this.downloadPdf = page.locator('#download-pdf');
    this.downloadCsv = page.locator('#download-csv');
    
    this.imageOnlyUpload = page.locator('#image-only-upload');
    this.pdfOnlyUpload = page.locator('#pdf-only-upload');
  }

  async goto() {
    await super.goto('/pages/files.html');
  }

  async uploadFile(fileLocator: Locator, filePath: string) {
    await fileLocator.setInputFiles(filePath);
  }

  async uploadMultipleFiles(fileLocator: Locator, filePaths: string[]) {
    await fileLocator.setInputFiles(filePaths);
  }
}