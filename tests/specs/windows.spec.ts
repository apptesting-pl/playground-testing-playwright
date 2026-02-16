import { test, expect } from '@playwright/test';
import { WindowsPage } from '../pages/WindowsPage';

test.describe('Windows and Frames', () => {
  let windowsPage: WindowsPage;

  test.beforeEach(async ({ page }) => {
    windowsPage = new WindowsPage(page);
    await windowsPage.goto();
  });

  test('should open new tab', async ({ context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      windowsPage.newTabLink.click()
    ]);
    
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('google.com');
    await newPage.close();
  });

  test('should interact with iframe content', async () => {
    const iframe = await windowsPage.getIframeContent();
    
    await iframe.locator('#iframe-input').fill('Test Text');
    await expect(iframe.locator('#iframe-input')).toHaveValue('Test Text');
    
    await iframe.locator('#iframe-btn').click();
    await expect(iframe.locator('#iframe-text')).toHaveText('Button clicked!');
  });

  test('should verify iframe title', async () => {
    const iframe = await windowsPage.getIframeContent();
    await expect(iframe.locator('#iframe-title')).toHaveText('Iframe Content');
  });

  test('should interact with nested iframe', async () => {
    const nestedFrame = await windowsPage.getNestedIframeContent();
    
    await expect(nestedFrame.locator('#iframe-title')).toBeVisible();
    await nestedFrame.locator('#iframe-btn').click();
    await expect(nestedFrame.locator('#iframe-text')).toHaveText('Button clicked!');
  });

  test('should scroll to bottom element', async () => {
    await windowsPage.bottomElement.scrollIntoViewIfNeeded();
    await expect(windowsPage.bottomElement).toBeInViewport();
    await expect(windowsPage.bottomElement).toHaveText('Bottom element reached!');
  });

  test('should verify scrollable container', async () => {
    const container = windowsPage.page.locator('#scrollable-container');
    await expect(container).toBeVisible();
    
    const scrollHeight = await container.evaluate(el => el.scrollHeight);
    const clientHeight = await container.evaluate(el => el.clientHeight);
    
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  });
});