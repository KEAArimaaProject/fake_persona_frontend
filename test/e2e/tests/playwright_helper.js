const { expect } = require('@playwright/test');

function createPersonaHelpers(page) {
  async function visitHome() {
    await page.goto('/');
  }

  async function getPartialGeneration() {
    const radio = page.locator('#chkPartialOptions');
    await expect(radio).toBeVisible();
    if (!(await radio.isChecked())) {
      await radio.check();
    }
  }

  async function getNameGender() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('name-gender');
  }

  async function getCpr() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('cpr');
  }

  async function getNameGenderDob() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('name-gender-dob');
  }

  async function getCprNameGender() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('cpr-name-gender');
  }

  async function getCprNameGenderDob() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('cpr-name-gender-dob');
  }

  async function getAddress() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('address');
  }

  async function getPhone() {
    const dropdown = page.locator('#cmbPartialOptions');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('phone');
  }

  async function getPerson(count) {
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
    getPartialGeneration,
    getNameGender,
    getCpr,
    getNameGenderDob,
    getCprNameGender,
    getCprNameGenderDob,
    getAddress,
    getPhone,
    getPerson,
    clickGenerate
  };
}

module.exports = { createPersonaHelpers };