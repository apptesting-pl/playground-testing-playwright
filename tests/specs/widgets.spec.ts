import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Widgets', () => {
  let widgetsPage: WidgetsPage;

  test.beforeEach(async ({ page }) => {
    widgetsPage = new WidgetsPage(page);
    await widgetsPage.goto();
  });

  test.describe('Accordion', () => {
    test('should open and close accordion items', async () => {
      await widgetsPage.openAccordion(0);
      await expect(widgetsPage.accordionItems.nth(0)).toHaveClass(/active/);
    });

    test('should close other items when opening new one', async () => {
      await widgetsPage.openAccordion(0);
      await expect(widgetsPage.accordionItems.nth(0)).toHaveClass(/active/);
      
      await widgetsPage.openAccordion(2);
      await expect(widgetsPage.accordionItems.nth(2)).toHaveClass(/active/);
      await expect(widgetsPage.accordionItems.nth(0)).not.toHaveClass(/active/);
    });

    test('should verify second accordion is open by default', async () => {
      await expect(widgetsPage.accordionItems.nth(1)).toHaveClass(/active/);
    });
  });

  test.describe('Tabs', () => {
    test('should switch between tabs', async () => {
      await widgetsPage.switchTab(1);
      await expect(widgetsPage.tabButtons.nth(1)).toHaveClass(/active/);
      await expect(widgetsPage.tabContents.nth(1)).toHaveClass(/active/);
    });

    test('should display correct content for each tab', async () => {
      await widgetsPage.switchTab(1);
      await expect(widgetsPage.tabContents.nth(1)).toContainText('Content for tab 2');
      
      await widgetsPage.switchTab(2);
      await expect(widgetsPage.tabContents.nth(2)).toContainText('Content for tab 3');
    });

    test('should verify first tab is active by default', async () => {
      await expect(widgetsPage.tabButtons.nth(0)).toHaveClass(/active/);
      await expect(widgetsPage.tabContents.nth(0)).toHaveClass(/active/);
    });
  });

  test.describe('Modal', () => {
    test('should open and close modal', async () => {
      await widgetsPage.modalTrigger.click();
      await expect(widgetsPage.modal).toHaveClass(/active/);
      
      await widgetsPage.modalClose.click();
      await expect(widgetsPage.modal).not.toHaveClass(/active/);
    });

    test('should close modal when clicking close button', async () => {
      await widgetsPage.modalTrigger.click();
      await expect(widgetsPage.modal).toBeVisible();
      
      await widgetsPage.page.locator('[data-modal-close]').click();
      await expect(widgetsPage.modal).not.toHaveClass(/active/);
    });
  });

  test.describe('Tooltip', () => {
    test('should show tooltip on hover', async () => {
      await widgetsPage.tooltipBtn.hover();
      await expect(widgetsPage.tooltip).toBeVisible();
      await expect(widgetsPage.tooltip).toHaveText('Tooltip text!');
    });
  });

  test.describe('Autocomplete', () => {
    test('should filter and select autocomplete option', async () => {
      await widgetsPage.selectAutocomplete('Java', 'JavaScript');
      await expect(widgetsPage.autocompleteOutput).toHaveText('Selected: JavaScript');
    });

    test('should show autocomplete suggestions', async () => {
      await widgetsPage.autocompleteInput.fill('Py');
      await expect(widgetsPage.autocompleteList).toHaveClass(/show/);
      await expect(widgetsPage.page.locator('.autocomplete-item')).toContainText(['Python']);
    });
  });

  test.describe('Spinner', () => {
    test('should show and hide spinner', async () => {
      await widgetsPage.showSpinnerBtn.click();
      await expect(widgetsPage.spinner).toBeVisible();
      await expect(widgetsPage.spinner).toBeHidden({ timeout: 5000 });
    });
  });

  test.describe('Progress Bar', () => {
    test('should update progress bar', async () => {
      const initialWidth = await widgetsPage.progressBar.evaluate(el => el.style.width);
      
      await widgetsPage.page.evaluate(() => {
        const btn = document.querySelector('button:has-text("Increase")') as HTMLButtonElement;
        btn?.click();
      });
      
      const updatedWidth = await widgetsPage.progressBar.evaluate(el => el.style.width);
      expect(updatedWidth).not.toBe(initialWidth);
    });
  });
});