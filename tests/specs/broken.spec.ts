import { test, expect } from '@playwright/test';
import { BrokenPage } from '../pages/BrokenPage';

test.describe('Broken Elements', () => {
  let brokenPage: BrokenPage;

  test.beforeEach(async ({ page }) => {
    brokenPage = new BrokenPage(page);
    await brokenPage.goto();
  });

  test.describe('Broken Images', () => {
    test('should detect broken image', async () => {
      const naturalWidth = await brokenPage.getImageNaturalWidth(brokenPage.brokenImg);
      expect(naturalWidth).toBe(0);
    });

    test('should verify valid image loads', async () => {
      await brokenPage.page.waitForTimeout(1000);
      const naturalWidth = await brokenPage.getImageNaturalWidth(brokenPage.validImg);
      expect(naturalWidth).toBeGreaterThan(0);
    });

    test('should verify external image loads', async () => {
      await brokenPage.page.waitForTimeout(2000);
      const naturalWidth = await brokenPage.getImageNaturalWidth(brokenPage.externalImg);
      expect(naturalWidth).toBeGreaterThan(0);
    });
  });

  test.describe('Broken Links', () => {
    test('should identify valid link', async () => {
      await expect(brokenPage.validLink).toHaveAttribute('href', 'forms.html');
    });

    test('should identify broken link', async () => {
      await expect(brokenPage.brokenLink).toHaveAttribute('href', 'nonexistent-page.html');
    });

    test('should verify external link', async () => {
      await expect(brokenPage.externalLink).toHaveAttribute('href', /google\.com/);
    });
  });

  test.describe('HTTP Status Simulation', () => {
    test('should simulate 200 OK status', async () => {
      await brokenPage.status200Btn.click();
      await expect(brokenPage.statusOutput).toContainText('200 OK');
    });

    test('should simulate 404 Not Found status', async () => {
      await brokenPage.status404Btn.click();
      await expect(brokenPage.statusOutput).toContainText('404 Not Found');
    });

    test('should simulate 500 Server Error status', async () => {
      await brokenPage.status500Btn.click();
      await expect(brokenPage.statusOutput).toContainText('500');
    });
  });

  test.describe('Hidden Elements', () => {
    test('should verify display:none element is not visible', async () => {
      await expect(brokenPage.displayNone).not.toBeVisible();
    });

    test('should verify display:none element is attached to DOM', async () => {
      await expect(brokenPage.displayNone).toBeAttached();
    });

    test('should verify visibility:hidden element is not visible', async () => {
      await expect(brokenPage.visibilityHidden).not.toBeVisible();
    });

    test('should verify visibility:hidden element is attached to DOM', async () => {
      await expect(brokenPage.visibilityHidden).toBeAttached();
    });

    test('should verify opacity:0 element', async () => {
      const opacity = await brokenPage.opacityZero.evaluate(el => 
        window.getComputedStyle(el).opacity
      );
      expect(opacity).toBe('0');
    });
  });

  test.describe('Slow Loading Image', () => {
    test('should load slow image after delay', async () => {
      await brokenPage.slowImgBtn.click();
      
      await expect(brokenPage.slowImgContainer).toContainText('Loading');
      
      await expect(brokenPage.slowImg).toBeVisible({ timeout: 5000 });
      
      const naturalWidth = await brokenPage.getImageNaturalWidth(brokenPage.slowImg);
      expect(naturalWidth).toBeGreaterThan(0);
    });

    test('should show spinner while loading', async () => {
      await brokenPage.slowImgBtn.click();
      await expect(brokenPage.slowImgContainer.locator('.spinner')).toBeVisible();
    });
  });

  test.describe('Empty Elements', () => {
    test('should verify empty div exists', async () => {
      const emptyDiv = brokenPage.page.locator('#empty-div');
      await expect(emptyDiv).toBeAttached();
      const text = await emptyDiv.innerText();
      expect(text).toBe('');
    });

    test('should verify empty table exists', async () => {
      const emptyTable = brokenPage.page.locator('#empty-table');
      await expect(emptyTable).toBeAttached();
      const rows = await emptyTable.locator('tr').count();
      expect(rows).toBe(0);
    });
  });
});