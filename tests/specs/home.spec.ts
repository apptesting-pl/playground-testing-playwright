import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display correct page title', async () => {
    await expect(homePage.page).toHaveTitle(/Test Automation Playground/);
  });

  test('should display hero section with title and subtitle', async () => {
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.heroTitle).toHaveText('Test Automation Playground');
    await expect(homePage.heroSubtitle).toBeVisible();
    await expect(homePage.heroSubtitle).toContainText('Practice your automation testing skills');
  });

  test('should display navigation menu', async () => {
    await expect(homePage.navMenu).toBeVisible();
    const menuItems = ['Forms', 'Interactions', 'Widgets', 'Tables', 'Alerts', 'Windows', 'Files', 'Dynamic', 'Broken'];
    
    for (const item of menuItems) {
      await expect(homePage.navMenu.locator(`a:has-text("${item}")`)).toBeVisible();
    }
  });

  test('should display all feature cards', async () => {
    const cardCount = await homePage.getCardCount();
    expect(cardCount).toBeGreaterThanOrEqual(9);
  });

  test('should navigate to Forms page via card click', async ({ page }) => {
    await homePage.clickCard('forms');
    await expect(page).toHaveURL(/forms\.html/);
    await expect(page.locator('h1')).toContainText('Forms');
  });

  test('should navigate to Widgets page via menu', async ({ page }) => {
    await homePage.navigateToPage('Widgets');
    await expect(page).toHaveURL(/widgets\.html/);
    await expect(page.locator('h1')).toContainText('Widgets');
  });

  test('should navigate to all pages from cards', async ({ page }) => {
    const pages = [
      { id: 'forms', urlPart: 'forms.html' },
      { id: 'interactions', urlPart: 'interactions.html' },
      { id: 'widgets', urlPart: 'widgets.html' },
      { id: 'tables', urlPart: 'tables.html' },
      { id: 'alerts', urlPart: 'alerts.html' },
    ];

    for (const pageInfo of pages) {
      await homePage.goto();
      await homePage.clickCard(pageInfo.id);
      await expect(page).toHaveURL(new RegExp(pageInfo.urlPart));
      await page.goBack();
    }
  });
});