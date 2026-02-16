import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test.describe('Alerts and Dialogs', () => {
  let alertsPage: AlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.goto();
  });

  test('should handle JavaScript alert', async () => {
    await alertsPage.handleAlert('accept');
    await expect(alertsPage.alertOutput).toContainText('Alert was shown');
  });

  test('should handle confirm dialog - accept', async () => {
    await alertsPage.handleConfirm('accept');
    await expect(alertsPage.confirmOutput).toContainText('OK');
  });

  test('should handle confirm dialog - dismiss', async () => {
    await alertsPage.handleConfirm('dismiss');
    await expect(alertsPage.confirmOutput).toContainText('Cancel');
  });

  test('should handle prompt dialog', async () => {
    const testText = 'Playwright Test';
    await alertsPage.handlePrompt(testText);
    await expect(alertsPage.promptOutput).toContainText(testText);
  });

  test.describe('Toast Notifications', () => {
    test('should show success toast', async () => {
      await alertsPage.showToast('success');
      await expect(alertsPage.toast.first()).toBeVisible();
      await expect(alertsPage.toast.first()).toHaveClass(/success/);
    });

    test('should show error toast', async () => {
      await alertsPage.showToast('error');
      await expect(alertsPage.toast.first()).toBeVisible();
      await expect(alertsPage.toast.first()).toHaveClass(/error/);
    });

    test('should show warning toast', async () => {
      await alertsPage.showToast('warning');
      await expect(alertsPage.toast.first()).toBeVisible();
      await expect(alertsPage.toast.first()).toHaveClass(/warning/);
    });

    test('should show info toast', async () => {
      await alertsPage.showToast('info');
      await expect(alertsPage.toast.first()).toBeVisible();
      await expect(alertsPage.toast.first()).toHaveClass(/info/);
    });

    test('should auto-hide toast after delay', async () => {
      await alertsPage.showToast('success');
      await expect(alertsPage.toast.first()).toBeVisible();
      await alertsPage.page.waitForTimeout(3500);
      await expect(alertsPage.toast.first()).toBeHidden();
    });
  });
});