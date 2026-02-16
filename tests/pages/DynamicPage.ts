import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicPage extends BasePage {
  readonly delayedTextBtn: Locator;
  readonly delayedText: Locator;
  
  readonly ajaxLoadBtn: Locator;
  readonly ajaxContent: Locator;
  
  readonly toggleBtn: Locator;
  readonly hiddenElement: Locator;
  
  readonly autoRefreshContent: Locator;
  
  readonly infiniteScroll: Locator;
  
  readonly newItemInput: Locator;
  readonly addItemBtn: Locator;
  readonly dynamicList: Locator;
  
  readonly startCountdownBtn: Locator;
  readonly countdownDisplay: Locator;
  
  readonly generateRandomBtn: Locator;
  readonly randomOutput: Locator;

  constructor(page: Page) {
    super(page);
    
    this.delayedTextBtn = page.locator('#delayed-text-btn');
    this.delayedText = page.locator('#delayed-text');
    
    this.ajaxLoadBtn = page.locator('#ajax-load-btn');
    this.ajaxContent = page.locator('#ajax-content');
    
    this.toggleBtn = page.locator('#toggle-btn');
    this.hiddenElement = page.locator('#hidden-element');
    
    this.autoRefreshContent = page.locator('#auto-refresh-content');
    
    this.infiniteScroll = page.locator('#infinite-scroll');
    
    this.newItemInput = page.locator('#new-item-input');
    this.addItemBtn = page.locator('#add-item-btn');
    this.dynamicList = page.locator('#dynamic-list');
    
    this.startCountdownBtn = page.locator('#start-countdown-btn');
    this.countdownDisplay = page.locator('#countdown-display');
    
    this.generateRandomBtn = page.locator('#generate-random-btn');
    this.randomOutput = page.locator('#random-output');
  }

  async goto() {
    await super.goto('/pages/dynamic.html');
  }

  async addListItem(itemName: string) {
    await this.newItemInput.fill(itemName);
    await this.addItemBtn.click();
  }

  async removeLastItem() {
    const removeBtn = this.dynamicList.locator('li').last().locator('button');
    await removeBtn.click();
  }

  async scrollInfiniteList() {
    await this.infiniteScroll.evaluate(node => {
      node.scrollTop = node.scrollHeight;
    });
  }
}