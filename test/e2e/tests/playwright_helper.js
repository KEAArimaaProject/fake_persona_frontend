const { expect } = require('@playwright/test');

function createPersonaHelpers(page) {
  async function visitHome() {
    await page.goto('/');
  }

  async function selectPartialGeneration() {
    const radio = page.locator('#chkPartialOptions');
    await expect(radio).toBeVisible();
    if (!(await radio.isChecked())) {
      await radio.check();
    }
  }

  async function selectNameGender() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('name-gender');
  }

  async function selectCpr() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('cpr');
  }

  async function selectNameGenderDob() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('name-gender-dob');
  }

  async function selectCprNameGender() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('cpr-name-gender');
  }

  async function selectCprNameGenderDob() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('cpr-name-gender-dob');
  }

  async function selectAddress() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('address');
  }

  async function selectPhone() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('phone');
  }

  async function selectPerson(count) {
    const radio = page.locator('#chkPerson');
    await expect(radio).toBeVisible();
    if (!(await radio.isChecked())) {
      await radio.check();
    }
    const numberInput = page.locator('#txtNumberPersons');
    await expect(numberInput).toBeVisible();
    await numberInput.fill(count);
  }

  async function clickGenerate() {
    const button = page.locator('#frmGenerate input[type="submit"]');
    await expect(button).toBeVisible();
    await button.click();
  }


  return {
    visitHome,
    selectPartialGeneration,
    selectNameGender,
    selectCpr,
    selectNameGenderDob,
    selectCprNameGender,
    selectCprNameGenderDob,
    selectAddress,
    selectPhone,
    selectPerson,
    clickGenerate
  };
}

module.exports = { createPersonaHelpers };