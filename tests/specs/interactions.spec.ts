import { test, expect } from '@playwright/test';
import { InteractionsPage } from '../pages/InteractionsPage';

test.describe('Interactions', () => {
  let interactionsPage: InteractionsPage;

  test.beforeEach(async ({ page }) => {
    interactionsPage = new InteractionsPage(page);
    await interactionsPage.goto();
  });

  test.describe('Drag and Drop', () => {
    test('should perform drag and drop', async () => {
      await interactionsPage.dragAndDrop();
      await expect(interactionsPage.dropStatus).toContainText('dropped successfully');
      await expect(interactionsPage.droppable).toHaveClass(/dropped/);
    });
  });

  test.describe('Click Events', () => {
    test('should handle single click', async () => {
      await interactionsPage.singleClickBtn.click();
      await expect(interactionsPage.singleClickOutput).toContainText('clicked');
    });

    test('should handle double click', async () => {
      await interactionsPage.performDoubleClick();
      await expect(interactionsPage.doubleClickOutput).toContainText('Double click detected');
    });

    test('should handle right click', async () => {
      await interactionsPage.performRightClick();
      await expect(interactionsPage.page.locator('#context-menu')).toHaveClass(/show/);
    });

    test('should select context menu item', async () => {
      await interactionsPage.performRightClick();
      
      // Wait for context menu to appear
      const contextMenu = interactionsPage.page.locator('#context-menu');
      await expect(contextMenu).toHaveClass(/show/);
      
      // Now click the menu item
      await interactionsPage.page.locator('.context-menu-item[data-action="copy"]').click();
      await expect(interactionsPage.contextMenuOutput).toContainText('Action selected: copy');
    });
  });

  test.describe('Hover Events', () => {
    test('should trigger hover event', async () => {
      await interactionsPage.hoverTarget.hover();
      await expect(interactionsPage.hoverOutput).toContainText('Mouse entered');
    });

    test('should change style on hover', async () => {
      // Hover should update the output text
      await interactionsPage.hoverTarget.hover();
      await expect(interactionsPage.hoverOutput).toContainText('Mouse entered the hover area');
      
      // Also verify the element itself changes color
      const hoveredBg = await interactionsPage.hoverTarget.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // The background should be the primary color (RGB value)
      expect(hoveredBg).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Mouse Tracking', () => {
    test('should track mouse position', async () => {
      await interactionsPage.trackMousePosition(50, 50);
      
      // Wait for mouse move event to process
      await interactionsPage.page.waitForTimeout(100);
      
      const outputText = await interactionsPage.mouseOutput.textContent();
      
      // Verify output contains position format
      await expect(interactionsPage.mouseOutput).toContainText('Position:');
      expect(outputText).toMatch(/X: \d+, Y: \d+/);
    });
  });

  test.describe('Keyboard Events', () => {
    test('should capture keyboard input', async () => {
      await interactionsPage.typeKey('Enter');
      await expect(interactionsPage.keyOutput).toContainText('Enter');
    });

    test('should display key code', async () => {
      await interactionsPage.typeKey('A');
      await expect(interactionsPage.keyOutput).toContainText('Code:');
    });
  });

  test.describe('Resizable Element', () => {
    test('should resize element', async () => {
      const initialBox = await interactionsPage.resizableBox.boundingBox();
      expect(initialBox).not.toBeNull();
      
      if (initialBox) {
        // Use JavaScript to resize the element (CSS resize is hard to test with Playwright)
        await interactionsPage.resizableBox.evaluate((el: HTMLElement) => {
          el.style.width = '400px';
          el.style.height = '200px';
        });
        
        // Wait for ResizeObserver to fire
        await interactionsPage.page.waitForTimeout(200);
        
        const newBox = await interactionsPage.resizableBox.boundingBox();
        expect(newBox).not.toBeNull();
        
        if (newBox) {
          expect(newBox.width).toBeGreaterThan(initialBox.width);
          expect(newBox.height).toBeGreaterThan(initialBox.height);
        }
      }
    });

    test('should update resize output', async () => {
      // ResizeObserver fires immediately on page load, so output should already show size
      await expect(interactionsPage.resizeOutput).toContainText('Size:', { timeout: 2000 });
      await expect(interactionsPage.resizeOutput).toContainText('px');
      
      // Change size and verify output updates
      await interactionsPage.resizableBox.evaluate((el: HTMLElement) => {
        el.style.width = '500px';
        el.style.height = '250px';
      });
      
      // Wait for ResizeObserver to fire
      await interactionsPage.page.waitForTimeout(300);
      
      // Verify the new size is reflected
      await expect(interactionsPage.resizeOutput).toContainText('500px');
      await expect(interactionsPage.resizeOutput).toContainText('250px');
    });
  });

  test.describe('Focus Events', () => {
    test('should trigger focus event', async () => {
      const focusInput = interactionsPage.page.locator('#focus-input');
      const focusOutput = interactionsPage.page.locator('#focus-output');
      
      await focusInput.focus();
      await expect(focusOutput).toContainText('focused');
    });

    test('should trigger blur event', async () => {
      const focusInput = interactionsPage.page.locator('#focus-input');
      const focusOutput = interactionsPage.page.locator('#focus-output');
      
      await focusInput.focus();
      await focusInput.blur();
      await expect(focusOutput).toContainText('blurred');
    });
  });

  test.describe('Long Press', () => {
    test('should detect long press', async () => {
      const longpressBtn = interactionsPage.page.locator('#longpress-btn');
      const longpressOutput = interactionsPage.page.locator('#longpress-output');
      
      await longpressBtn.hover();
      await interactionsPage.page.mouse.down();
      await interactionsPage.page.waitForTimeout(2100);
      await interactionsPage.page.mouse.up();
      
      await expect(longpressOutput).toContainText('Long press detected');
    });
  });
});
