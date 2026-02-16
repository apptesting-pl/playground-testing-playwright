import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablesPage extends BasePage {
  readonly staticTableRows: Locator;
  
  readonly sortableTable: Locator;
  readonly sortableTableHeaders: Locator;
  readonly sortableTableRows: Locator;
  
  readonly searchInput: Locator;
  readonly searchTableRows: Locator;
  
  readonly paginationButtons: Locator;
  readonly paginationCurrent: Locator;
  readonly paginationNext: Locator;
  readonly paginationPrev: Locator;
  
  readonly editableRows: Locator;

  constructor(page: Page) {
    super(page);
    
    this.staticTableRows = page.locator('#static-table tbody tr');
    
    this.sortableTable = page.locator('#sortable-table');
    this.sortableTableHeaders = page.locator('#sortable-table th.sortable');
    this.sortableTableRows = page.locator('#sortable-table tbody tr');
    
    this.searchInput = page.locator('#table-search');
    this.searchTableRows = page.locator('#searchable-table tbody tr');
    
    this.paginationButtons = page.locator('.pagination-btn');
    this.paginationCurrent = page.locator('.pagination-btn.active');
    this.paginationNext = page.locator('.pagination-btn:has-text("Next")');
    this.paginationPrev = page.locator('.pagination-btn:has-text("Prev")');
    
    this.editableRows = page.locator('#editable-table tbody tr');
  }

  async goto() {
    await super.goto('/pages/tables.html');
  }

  async searchTable(query: string) {
    await this.searchInput.fill(query);
  }

  async sortByColumn(columnIndex: number) {
    await this.sortableTableHeaders.nth(columnIndex).click();
  }

  async editCell(rowIndex: number, cellIndex: number, value: string) {
    const cell = this.editableRows.nth(rowIndex).locator('td').nth(cellIndex);
    await cell.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.type(value);
    await this.page.locator('h1').click();
  }

  async getVisibleRowsCount(): Promise<number> {
    return await this.searchTableRows.filter({ hasNot: this.page.locator('[style*="display: none"]') }).count();
  }
}