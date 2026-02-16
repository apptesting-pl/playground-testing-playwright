import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InteractionsPage extends BasePage {
  readonly draggableItem: Locator;
  readonly dropZone: Locator;
  readonly dropStatus: Locator;
  readonly droppable: Locator;
  
  readonly singleClickBtn: Locator;
  readonly doubleClickArea: Locator;
  readonly contextMenuArea: Locator;
  readonly interactionOutput: Locator;
  readonly singleClickOutput: Locator;
  readonly doubleClickOutput: Locator;
  readonly contextMenuOutput: Locator;
  
  readonly hoverTarget: Locator;
  readonly hoverOutput: Locator;
  
  readonly mouseArea: Locator;
  readonly mouseOutput: Locator;
  
  readonly keyboardInput: Locator;
  readonly keyOutput: Locator;
  
  readonly resizableBox: Locator;
  readonly resizeOutput: Locator;
  
  readonly sortableList: Locator;
  readonly sortableItems: Locator;

  constructor(page: Page) {
    super(page);
    
    this.draggableItem = page.locator('#draggable-item');
    this.dropZone = page.locator('#drop-zone');
    this.dropStatus = page.locator('#drag-drop-output');
    this.droppable = page.locator('#drop-zone');
    
    this.singleClickBtn = page.locator('#single-click-btn');
    this.doubleClickArea = page.locator('#double-click-area');
    this.contextMenuArea = page.locator('#context-menu-area');
    this.interactionOutput = page.locator('#single-click-output');
    this.singleClickOutput = page.locator('#single-click-output');
    this.doubleClickOutput = page.locator('#double-click-output');
    this.contextMenuOutput = page.locator('#context-menu-output');
    
    this.hoverTarget = page.locator('#hover-target');
    this.hoverOutput = page.locator('#hover-output');
    
    this.mouseArea = page.locator('#mouse-area');
    this.mouseOutput = page.locator('#mouse-output');
    
    this.keyboardInput = page.locator('#keyboard-input');
    this.keyOutput = page.locator('#key-output');
    
    this.resizableBox = page.locator('#resizable');
    this.resizeOutput = page.locator('#resize-output');
    
    this.sortableList = page.locator('#sortable-list');
    this.sortableItems = page.locator('.sortable-item');
  }

  async goto() {
    await super.goto('/pages/interactions.html');
  }

  async dragAndDrop() {
    await this.draggableItem.dragTo(this.dropZone);
  }

  async performDoubleClick() {
    await this.doubleClickArea.dblclick();
  }

  async performRightClick() {
    await this.contextMenuArea.click({ button: 'right' });
  }

  async typeKey(key: string) {
    await this.keyboardInput.focus();
    await this.page.keyboard.press(key);
  }

  async trackMousePosition(x: number, y: number) {
    const box = await this.mouseArea.boundingBox();
    if (box) {
      await this.page.mouse.move(box.x + x, box.y + y);
    }
  }
}