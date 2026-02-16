import { test, expect } from '@playwright/test';
import { FormsPage } from '../pages/FormsPage';

test.describe('Forms Page', () => {
  let formsPage: FormsPage;

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.goto();
  });

  test.describe('Text Inputs', () => {
    test('should fill and verify all text input types', async () => {
      await formsPage.fillTextInputs({
        text: 'Sample Text',
        email: 'test@example.com',
        password: 'SecurePass123',
        number: '42',
        phone: '+48123456789',
        url: 'https://example.com'
      });

      await expect(formsPage.textInput).toHaveValue('Sample Text');
      await expect(formsPage.emailInput).toHaveValue('test@example.com');
      await expect(formsPage.passwordInput).toHaveValue('SecurePass123');
      await expect(formsPage.numberInput).toHaveValue('42');
      await expect(formsPage.phoneInput).toHaveValue('+48123456789');
      await expect(formsPage.urlInput).toHaveValue('https://example.com');
    });

    test('should fill and verify textarea', async () => {
      const multilineText = 'Line 1\nLine 2\nLine 3';
      await formsPage.textarea.fill(multilineText);
      await expect(formsPage.textarea).toHaveValue(multilineText);
    });
  });

  test.describe('Checkboxes', () => {
    test('should check and uncheck checkboxes', async () => {
      await formsPage.checkbox1.check();
      await expect(formsPage.checkbox1).toBeChecked();
      
      await formsPage.checkbox2.check();
      await expect(formsPage.checkbox2).toBeChecked();
      
      await formsPage.checkbox1.uncheck();
      await expect(formsPage.checkbox1).not.toBeChecked();
    });

    test('should update checkbox output when checked', async () => {
      await formsPage.checkbox1.check();
      await expect(formsPage.checkboxOutput).toContainText('option1');
      
      await formsPage.checkbox2.check();
      await expect(formsPage.checkboxOutput).toContainText('option2');
    });

    test('should verify pre-checked checkbox', async () => {
      await expect(formsPage.checkbox3).toBeChecked();
    });
  });

  test.describe('Radio Buttons', () => {
    test('should select radio buttons', async () => {
      await formsPage.radio1.check();
      await expect(formsPage.radio1).toBeChecked();
      await expect(formsPage.radioOutput).toHaveText('Selected: radio1');
    });

    test('should update selection when different radio is selected', async () => {
      await formsPage.radio1.check();
      await expect(formsPage.radio1).toBeChecked();
      
      await formsPage.radio2.check();
      await expect(formsPage.radio1).not.toBeChecked();
      await expect(formsPage.radio2).toBeChecked();
      await expect(formsPage.radioOutput).toHaveText('Selected: radio2');
    });

    test('should verify pre-selected radio button', async () => {
      await expect(formsPage.radio3).toBeChecked();
    });
  });

  test.describe('Dropdowns', () => {
    test('should select option from single dropdown', async () => {
      await formsPage.dropdown.selectOption('option2');
      await expect(formsPage.dropdownOutput).toHaveText('Selected: option2');
    });

    test('should select multiple options from multi-select', async () => {
      await formsPage.multiSelect.selectOption(['item1', 'item3']);
      await expect(formsPage.dropdownOutput).toContainText('item1');
      await expect(formsPage.dropdownOutput).toContainText('item3');
    });
  });

  test.describe('Date and Time Inputs', () => {
    test('should set date picker value', async () => {
      await formsPage.datePicker.fill('2026-12-31');
      await expect(formsPage.datePicker).toHaveValue('2026-12-31');
    });

    test('should set time picker value', async () => {
      await formsPage.timePicker.fill('14:30');
      await expect(formsPage.timePicker).toHaveValue('14:30');
    });

    test('should set datetime picker value', async () => {
      await formsPage.datetimePicker.fill('2026-06-15T10:00');
      await expect(formsPage.datetimePicker).toHaveValue('2026-06-15T10:00');
    });
  });

  test.describe('Range Slider', () => {
    test('should adjust range slider value', async () => {
      await formsPage.rangeSlider.fill('75');
      await expect(formsPage.rangeSliderValue).toHaveText('75');
    });
  });

  test.describe('Color Picker', () => {
    test('should select color', async () => {
      await formsPage.colorPicker.fill('#ff0000');
      await expect(formsPage.colorOutput).toContainText('#ff0000');
    });
  });

  test.describe('Input States', () => {
    test('should verify disabled input', async () => {
      await expect(formsPage.disabledInput).toBeDisabled();
    });

    test('should verify readonly input', async () => {
      await expect(formsPage.readonlyInput).toHaveAttribute('readonly');
    });

    test('should verify required input attribute', async () => {
      await expect(formsPage.requiredInput).toHaveAttribute('required');
    });
  });

  test.describe('Form Submission', () => {
    test('should submit form with valid data', async () => {
      await formsPage.submitForm('John Doe', 'john@example.com', 'Test message');
      await expect(formsPage.formOutput).toContainText('John Doe');
      await expect(formsPage.formOutput).toContainText('john@example.com');
    });

    test('should reset form', async () => {
      await formsPage.fullName.fill('Test User');
      await formsPage.resetBtn.click();
      await expect(formsPage.fullName).toHaveValue('');
    });
  });
});