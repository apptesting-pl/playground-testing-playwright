import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WindowsPage extends BasePage {
  readonly newTabLink: Locator;
  readonly newWindowBtn: Locator;
  readonly testIframe: Locator;
  readonly nestedIframe: Locator;
  readonly bottomElement: Locator;

  constructor(page: Page) {
    super(page);
    this.newTabLink = page.locator('#new-tab-link');
    this.newWindowBtn = page.locator('#new-window-btn');
    this.testIframe = page.locator('#test-iframe');
    this.nestedIframe = page.locator('#nested-iframe');
    this.bottomElement = page.locator('#bottom-element');
  }

  async goto() {
    await super.goto('/pages/windows.html');
  }

  async getIframeContent(): Promise<FrameLocator> {
    return this.page.frameLocator('#test-iframe');
  }

  async getNestedIframeContent(): Promise<FrameLocator> {
    const outerFrame = this.page.frameLocator('#nested-iframe');
    return outerFrame.frameLocator('#inner-iframe');
  }
}