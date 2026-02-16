import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  readonly alertBtn: Locator;
  readonly confirmBtn: Locator;
  readonly promptBtn: Locator;
  readonly alertOutput: Locator;
  readonly confirmOutput: Locator;
  readonly promptOutput: Locator;
  readonly toastSuccessBtn: Locator;
  readonly toastErrorBtn: Locator;
  readonly toastWarningBtn: Locator;
  readonly toastInfoBtn: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    super(page);
    this.alertBtn = page.locator('#alert-btn');
    this.confirmBtn = page.locator('#confirm-btn');
    this.promptBtn = page.locator('#prompt-btn');
    this.alertOutput = page.locator('#alert-output');
    this.confirmOutput = page.locator('#confirm-output');
    this.promptOutput = page.locator('#prompt-output');
    this.toastSuccessBtn = page.locator('#toast-success-btn');
    this.toastErrorBtn = page.locator('#toast-error-btn');
    this.toastWarningBtn = page.locator('#toast-warning-btn');
    this.toastInfoBtn = page.locator('#toast-info-btn');
    this.toast = page.locator('.toast');
  }

  async goto() {
    await super.goto('/pages/alerts.html');
  }

  async handleAlert(action: 'accept' | 'dismiss' = 'accept') {
    this.page.on('dialog', async dialog => {
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await this.alertBtn.click();
    await this.page.waitForTimeout(500);
  }

  async handleConfirm(action: 'accept' | 'dismiss') {
    this.page.once('dialog', async dialog => {
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await this.confirmBtn.click();
    await this.page.waitForTimeout(500);
  }

  async handlePrompt(text: string) {
    this.page.once('dialog', async dialog => {
      await dialog.accept(text);
    });
    await this.promptBtn.click();
    await this.page.waitForTimeout(500);
  }

  async showToast(type: 'success' | 'error' | 'warning' | 'info') {
    const btnMap = {
      success: this.toastSuccessBtn,
      error: this.toastErrorBtn,
      warning: this.toastWarningBtn,
      info: this.toastInfoBtn
    };
    await btnMap[type].click();
  }
}