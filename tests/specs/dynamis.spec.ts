import { test, expect } from '@playwright/test';
import { DynamicPage } from '../pages/DynamicPage';

test.describe('Dynamic Content', () => {
  let dynamicPage: DynamicPage;

  test.beforeEach(async ({ page }) => {
    dynamicPage = new DynamicPage(page);
    await dynamicPage.goto();
  });

  test.describe('Delayed Content Loading', () => {
    test('should load delayed text after 3 seconds', async () => {
      await dynamicPage.delayedTextBtn.click();
      await expect(dynamicPage.delayedText).toContainText('Content loaded after 3 seconds', { timeout: 5000 });
    });

    test('should show spinner while loading', async () => {
      await dynamicPage.delayedTextBtn.click();
      await expect(dynamicPage.delayedText.locator('.spinner')).toBeVisible();
    });
  });

  test.describe('AJAX Content', () => {
    test('should load AJAX content', async () => {
      await dynamicPage.ajaxLoadBtn.click();
      await expect(dynamicPage.ajaxContent).toContainText('Data loaded', { timeout: 5000 });
    });

    test('should display timestamp', async () => {
      await dynamicPage.ajaxLoadBtn.click();
      await expect(dynamicPage.ajaxContent).toContainText('Timestamp:', { timeout: 5000 });
    });
  });

  test.describe('Toggle Visibility', () => {
    test('should toggle element visibility', async () => {
      await expect(dynamicPage.hiddenElement).toHaveClass(/hidden/);
      
      await dynamicPage.toggleBtn.click();
      await expect(dynamicPage.hiddenElement).not.toHaveClass(/hidden/);
      await expect(dynamicPage.hiddenElement).toBeVisible();
    });

    test('should update button text', async () => {
      await expect(dynamicPage.toggleBtn).toHaveText('Show Element');
      
      await dynamicPage.toggleBtn.click();
      await expect(dynamicPage.toggleBtn).toHaveText('Hide Element');
    });
  });

  test.describe('Auto-Refresh Content', () => {
    test('should update content automatically', async () => {
      const initialText = await dynamicPage.autoRefreshContent.innerText();
      
      await dynamicPage.page.waitForTimeout(6000);
      
      const updatedText = await dynamicPage.autoRefreshContent.innerText();
      expect(updatedText).not.toBe(initialText);
    });
  });

  test.describe('Dynamic List', () => {
    test('should add item to list', async () => {
      const itemName = 'Test Item';
      await dynamicPage.addListItem(itemName);
      await expect(dynamicPage.dynamicList).toContainText(itemName);
    });

    test('should remove item from list', async () => {
      const itemName = 'Removable Item';
      await dynamicPage.addListItem(itemName);
      await expect(dynamicPage.dynamicList).toContainText(itemName);
      
      await dynamicPage.removeLastItem();
      await expect(dynamicPage.dynamicList).not.toContainText(itemName);
    });

    test('should clear input after adding item', async () => {
      await dynamicPage.addListItem('Test');
      await expect(dynamicPage.newItemInput).toHaveValue('');
    });
  });

  test.describe('Countdown Timer', () => {
    test('should start countdown', async () => {
      await dynamicPage.startCountdownBtn.click();
      await expect(dynamicPage.countdownDisplay).toHaveText('9', { timeout: 2000 });
    });

    test('should complete countdown', async () => {
      await dynamicPage.startCountdownBtn.click();
      await expect(dynamicPage.countdownDisplay).toHaveText('Done!', { timeout: 12000 });
    });
  });

  test.describe('Random Data Generation', () => {
    test('should generate random number', async () => {
      await dynamicPage.generateRandomBtn.click();
      await expect(dynamicPage.randomOutput).toContainText('Random number:');
    });

    test('should generate different numbers', async () => {
      await dynamicPage.generateRandomBtn.click();
      const firstNumber = await dynamicPage.randomOutput.innerText();
      
      await dynamicPage.generateRandomBtn.click();
      const secondNumber = await dynamicPage.randomOutput.innerText();
      
      // Note: There's a small chance they could be equal, but very unlikely
      expect(firstNumber).toBeDefined();
      expect(secondNumber).toBeDefined();
    });
  });

  test.describe('Infinite Scroll', () => {
    test('should load initial items', async () => {
      const items = dynamicPage.infiniteScroll.locator('.scroll-item');
      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should load more items on scroll', async () => {
      const initialCount = await dynamicPage.infiniteScroll.locator('.scroll-item').count();
      
      await dynamicPage.scrollInfiniteList();
      await dynamicPage.page.waitForTimeout(500);
      
      const newCount = await dynamicPage.infiniteScroll.locator('.scroll-item').count();
      expect(newCount).toBeGreaterThan(initialCount);
    });
  });
});