import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BrokenPage extends BasePage {
  readonly validImg: Locator;
  readonly brokenImg: Locator;
  readonly externalImg: Locator;
  
  readonly validLink: Locator;
  readonly brokenLink: Locator;
  readonly externalLink: Locator;
  
  readonly status200Btn: Locator;
  readonly status404Btn: Locator;
  readonly status500Btn: Locator;
  readonly statusOutput: Locator;
  
  readonly displayNone: Locator;
  readonly visibilityHidden: Locator;
  readonly opacityZero: Locator;
  
  readonly slowImgBtn: Locator;
  readonly slowImg: Locator;
  readonly slowImgContainer: Locator;

  constructor(page: Page) {
    super(page);
    
    this.validImg = page.locator('#valid-img');
    this.brokenImg = page.locator('#broken-img');
    this.externalImg = page.locator('#external-img');
    
    this.validLink = page.locator('#valid-link');
    this.brokenLink = page.locator('#broken-link');
    this.externalLink = page.locator('#external-link');
    
    this.status200Btn = page.locator('#status-200-btn');
    this.status404Btn = page.locator('#status-404-btn');
    this.status500Btn = page.locator('#status-500-btn');
    this.statusOutput = page.locator('#status-output');
    
    this.displayNone = page.locator('#display-none');
    this.visibilityHidden = page.locator('#visibility-hidden');
    this.opacityZero = page.locator('#opacity-zero');
    
    this.slowImgBtn = page.locator('#load-slow-img-btn');
    this.slowImg = page.locator('#slow-img-container img');
    this.slowImgContainer = page.locator('#slow-img-container');
  }

  async goto() {
    await super.goto('/pages/broken.html');
  }

  async getImageNaturalWidth(locator: Locator): Promise<number> {
    return await locator.evaluate((img: HTMLImageElement) => img.naturalWidth);
  }
}