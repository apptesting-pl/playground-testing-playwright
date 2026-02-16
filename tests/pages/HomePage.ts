import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly navMenu: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);
    this.heroTitle = page.locator('.hero h1');
    this.heroSubtitle = page.locator('.hero-subtitle');
    this.navMenu = page.locator('.nav-menu');
    this.cards = page.locator('.card');
  }

  async goto() {
    await super.goto('/');
  }

  async getCardCount(): Promise<number> {
    return await this.cards.count();
  }

  async clickCard(cardId: string) {
    await this.page.locator(`#card-${cardId}`).click();
  }

  async navigateToPage(pageName: string) {
    await this.navMenu.locator(`a:has-text("${pageName}")`).click();
  }

  async verifyPageTitle(expectedTitle: string | RegExp) {
    const title = await this.getTitle();
    if (typeof expectedTitle === 'string') {
      return title === expectedTitle;
    }
    return expectedTitle.test(title);
  }
}