import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WidgetsPage extends BasePage {
  readonly accordionHeaders: Locator;
  readonly accordionItems: Locator;
  
  readonly tabButtons: Locator;
  readonly tabContents: Locator;
  
  readonly modalTrigger: Locator;
  readonly modal: Locator;
  readonly modalClose: Locator;
  
  readonly tooltipBtn: Locator;
  readonly tooltip: Locator;
  
  readonly progressBar: Locator;
  
  readonly autocompleteInput: Locator;
  readonly autocompleteList: Locator;
  readonly autocompleteOutput: Locator;
  
  readonly showSpinnerBtn: Locator;
  readonly spinner: Locator;

  constructor(page: Page) {
    super(page);
    
    this.accordionHeaders = page.locator('.accordion-header');
    this.accordionItems = page.locator('.accordion-item');
    
    this.tabButtons = page.locator('.tab-btn');
    this.tabContents = page.locator('.tab-content');
    
    this.modalTrigger = page.locator('#modal-trigger');
    this.modal = page.locator('#modal-1');
    this.modalClose = page.locator('.modal-close');
    
    this.tooltipBtn = page.locator('#tooltip-btn');
    this.tooltip = page.locator('#tooltip');
    
    this.progressBar = page.locator('#progress-bar');
    
    this.autocompleteInput = page.locator('#autocomplete');
    this.autocompleteList = page.locator('#autocomplete-list');
    this.autocompleteOutput = page.locator('#autocomplete-output');
    
    this.showSpinnerBtn = page.locator('#show-spinner-btn');
    this.spinner = page.locator('#spinner-container .spinner');
  }

  async goto() {
    await super.goto('/pages/widgets.html');
  }

  async openAccordion(index: number) {
    await this.accordionHeaders.nth(index).click();
  }

  async switchTab(index: number) {
    await this.tabButtons.nth(index).click();
  }

  async selectAutocomplete(searchText: string, itemText: string) {
    await this.autocompleteInput.fill(searchText);
    await this.page.locator(`.autocomplete-item:has-text("${itemText}")`).click();
  }
}