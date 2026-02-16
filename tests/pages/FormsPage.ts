import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormsPage extends BasePage {
  // Text inputs
  readonly textInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly numberInput: Locator;
  readonly phoneInput: Locator;
  readonly urlInput: Locator;
  readonly textarea: Locator;

  // Checkboxes and radios
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;
  readonly checkbox3: Locator;
  readonly checkboxOutput: Locator;
  readonly radio1: Locator;
  readonly radio2: Locator;
  readonly radio3: Locator;
  readonly radioOutput: Locator;

  // Dropdowns
  readonly dropdown: Locator;
  readonly multiSelect: Locator;
  readonly dropdownOutput: Locator;

  // Date/Time inputs
  readonly datePicker: Locator;
  readonly timePicker: Locator;
  readonly datetimePicker: Locator;
  readonly monthPicker: Locator;
  readonly weekPicker: Locator;

  // Other controls
  readonly rangeSlider: Locator;
  readonly rangeSliderValue: Locator;
  readonly colorPicker: Locator;
  readonly colorOutput: Locator;

  // Input states
  readonly disabledInput: Locator;
  readonly readonlyInput: Locator;
  readonly requiredInput: Locator;
  readonly patternInput: Locator;

  // Form submission
  readonly fullName: Locator;
  readonly submitEmail: Locator;
  readonly submitMessage: Locator;
  readonly agreeTerms: Locator;
  readonly submitBtn: Locator;
  readonly resetBtn: Locator;
  readonly formOutput: Locator;

  constructor(page: Page) {
    super(page);
    
    this.textInput = page.locator('#text-input');
    this.emailInput = page.locator('#email-input');
    this.passwordInput = page.locator('#password-input');
    this.numberInput = page.locator('#number-input');
    this.phoneInput = page.locator('#phone-input');
    this.urlInput = page.locator('#url-input');
    this.textarea = page.locator('#textarea');

    this.checkbox1 = page.locator('#checkbox-1');
    this.checkbox2 = page.locator('#checkbox-2');
    this.checkbox3 = page.locator('#checkbox-3');
    this.checkboxOutput = page.locator('#checkbox-output');
    
    this.radio1 = page.locator('#radio-1');
    this.radio2 = page.locator('#radio-2');
    this.radio3 = page.locator('#radio-3');
    this.radioOutput = page.locator('#radio-output');

    this.dropdown = page.locator('#dropdown');
    this.multiSelect = page.locator('#multi-select');
    this.dropdownOutput = page.locator('#dropdown-output');

    this.datePicker = page.locator('#date-picker');
    this.timePicker = page.locator('#time-picker');
    this.datetimePicker = page.locator('#datetime-picker');
    this.monthPicker = page.locator('#month-picker');
    this.weekPicker = page.locator('#week-picker');

    this.rangeSlider = page.locator('#range-slider');
    this.rangeSliderValue = page.locator('#range-slider-value');
    this.colorPicker = page.locator('#color-picker');
    this.colorOutput = page.locator('#color-output');

    this.disabledInput = page.locator('#disabled-input');
    this.readonlyInput = page.locator('#readonly-input');
    this.requiredInput = page.locator('#required-input');
    this.patternInput = page.locator('#pattern-input');

    this.fullName = page.locator('#full-name');
    this.submitEmail = page.locator('#submit-email');
    this.submitMessage = page.locator('#submit-message');
    this.agreeTerms = page.locator('#agree-terms');
    this.submitBtn = page.locator('#submit-btn');
    this.resetBtn = page.locator('#reset-btn');
    this.formOutput = page.locator('#form-output');
  }

  async goto() {
    await super.goto('/pages/forms.html');
  }

  async fillTextInputs(data: {
    text?: string;
    email?: string;
    password?: string;
    number?: string;
    phone?: string;
    url?: string;
  }) {
    if (data.text) await this.textInput.fill(data.text);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.password) await this.passwordInput.fill(data.password);
    if (data.number) await this.numberInput.fill(data.number);
    if (data.phone) await this.phoneInput.fill(data.phone);
    if (data.url) await this.urlInput.fill(data.url);
  }

  async submitForm(name: string, email: string, message: string) {
    await this.fullName.fill(name);
    await this.submitEmail.fill(email);
    await this.submitMessage.fill(message);
    await this.submitBtn.click();
  }
}