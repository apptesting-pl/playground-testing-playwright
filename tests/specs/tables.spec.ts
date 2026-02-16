import { test, expect } from '@playwright/test';
import { TablesPage } from '../pages/TablesPage';

test.describe('Tables', () => {
  let tablesPage: TablesPage;

  test.beforeEach(async ({ page }) => {
    tablesPage = new TablesPage(page);
    await tablesPage.goto();
  });

  test.describe('Static Table', () => {
    test('should display correct number of rows', async () => {
      const rowCount = await tablesPage.staticTableRows.count();
      expect(rowCount).toBe(3);
    });

    test('should display correct data in first row', async () => {
      await expect(tablesPage.staticTableRows.first()).toContainText('John Doe');
      await expect(tablesPage.staticTableRows.first()).toContainText('john@example.com');
    });

    test('should display status badges', async () => {
      await expect(tablesPage.page.locator('.status.status-success')).toBeVisible();
      await expect(tablesPage.page.locator('.status.status-pending')).toBeVisible();
      await expect(tablesPage.page.locator('.status.status-error')).toBeVisible();
    });
  });

  test.describe('Sortable Table', () => {
    test('should sort table by column', async () => {
      const firstRowBefore = await tablesPage.sortableTableRows.first().locator('td').nth(1).innerText();
      
      await tablesPage.sortByColumn(1);
      
      const firstRowAfter = await tablesPage.sortableTableRows.first().locator('td').nth(1).innerText();
      
      expect(firstRowBefore).toBe(firstRowAfter);
    });

    test('should toggle sort direction', async () => {
      await tablesPage.sortByColumn(2);
      const firstAgeAsc = await tablesPage.sortableTableRows.first().locator('td').nth(2).innerText();
      
      await tablesPage.sortByColumn(2);
      const firstAgeDesc = await tablesPage.sortableTableRows.first().locator('td').nth(2).innerText();
      
      expect(firstAgeAsc).not.toBe(firstAgeDesc);
    });

    test('should display sort indicator', async () => {
      await tablesPage.sortByColumn(0);
      await expect(tablesPage.sortableTableHeaders.nth(0)).toHaveClass(/sort-(asc|desc)/);
    });
  });

  test.describe('Searchable Table', () => {
    test('should filter table rows', async () => {
      await tablesPage.searchTable('Laptop');
      
      const visibleRows = await tablesPage.searchTableRows.filter({ has: tablesPage.page.locator(':visible') }).count();
      expect(visibleRows).toBeGreaterThan(0);
      
      await expect(tablesPage.searchTableRows.first()).toContainText('Laptop');
    });

    test('should show no results for invalid search', async () => {
      await tablesPage.searchTable('NonexistentProduct');
      
      const visibleRows = await tablesPage.searchTableRows.filter({ has: tablesPage.page.locator(':visible') }).count();
      expect(visibleRows).toBe(0);
    });

    test('should clear search and show all rows', async () => {
      await tablesPage.searchTable('Laptop');
      await tablesPage.searchTable('');
      
      const visibleRows = await tablesPage.searchTableRows.filter({ has: tablesPage.page.locator(':visible') }).count();
      expect(visibleRows).toBeGreaterThan(1);
    });
  });

  test.describe('Paginated Table', () => {
    test('should display first page by default', async () => {
      await expect(tablesPage.paginationCurrent).toHaveText('1');
    });

    test('should navigate to next page', async () => {
      await tablesPage.paginationNext.click();
      await expect(tablesPage.paginationCurrent).toHaveText('2');
    });

    test('should navigate to previous page', async () => {
      await tablesPage.paginationNext.click();
      await tablesPage.paginationPrev.click();
      await expect(tablesPage.paginationCurrent).toHaveText('1');
    });

    test('should disable prev button on first page', async () => {
      await expect(tablesPage.paginationPrev).toBeDisabled();
    });
  });

  test.describe('Editable Table', () => {
    test('should edit table cell', async () => {
      const newValue = 'Updated Name';
      await tablesPage.editCell(0, 1, newValue);
      
      await expect(tablesPage.editableRows.first().locator('td').nth(1)).toHaveText(newValue);
    });

    test('should update output on cell edit', async () => {
      const output = tablesPage.page.locator('#editable-output');
      
      await tablesPage.editCell(0, 1, 'Test Value');
      
      // Wait for output to contain the expected text
      await expect(output).toContainText('Cell updated', { timeout: 2000 });
    });
  });
});