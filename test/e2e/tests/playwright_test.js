const { test, expect } = require('@playwright/test');
const { createPersonaHelpers } = require('./playwright_helper');

test.describe('Fake Persona Generation', () => {
    async function ensureOutputVisible(page) {
        await expect(page.locator('#output')).not.toHaveClass(/hidden/);
    }

    async function runPartialGeneration(page, getMethod, ...expectFns) {
        const helpers = createPersonaHelpers(page);
        await helpers.visitHome();
        await helpers.getPartialGeneration();
        await helpers[getMethod]();
        await helpers.clickGenerate();

        await ensureOutputVisible(page);
        for (const fn of expectFns) {
            await fn(page);
        }
    }

    test.describe('Partial Generation', () => {
        //eg.
        //First name: Lucas M.
        //Last name: Kjær
        //Gender: male
        test('should generate name and gender', async ({ page }) => {
            await runPartialGeneration(
                page,
                'getNameGender',
                expectNameGenderResults,
            );
        });

        //eg.
        //CPR: 2510002438
        test('should generate CPR', async ({ page }) => {
            await runPartialGeneration(page, 'getCpr', expectCpr);
        });

        //eg.
        //First name: Lucas M.
        //Last name: Kjær
        //Gender: male
        //Date of birth: 1923-12-30
        test('should generate name, gender and date of birth', async ({
            page,
        }) => {
            await runPartialGeneration(
                page,
                'getNameGenderDob',
                expectNameGenderResults,
                expectDob,
            );
        });

        //eg.
        //CPR: 2510002438
        //First name: Lucas M.
        //Last name: Kjær
        //Gender: male
        test('should generate CPR, name and gender', async ({ page }) => {
            await runPartialGeneration(
                page,
                'getCprNameGender',
                expectCpr,
                expectNameGenderResults,
            );
        });

        //eg.
        //CPR: 2510002438
        //First name: Lucas M.
        //Last name: Kjær
        //Gender: male
        //Date of birth: 1923-12-30
        test('should generate CPR, name, gender and date of birth', async ({
            page,
        }) => {
            await runPartialGeneration(
                page,
                'getCprNameGenderDob',
                expectCpr,
                expectNameGenderResults,
                expectDob,
            );
        });

        //eg.
        //Address: BzJytbiXfknhyqaNNGØQuSæLTC ZæLådRårNlXuA 523, 56.tv
        //6541 Bevtoft
        test('should generate address', async ({ page }) => {
            await runPartialGeneration(
                page,
                'getAddress',
                expectStreet,
                expectTown,
            );
        });

        //eg.
        //Phone number: 57126685
        test('should generate phone number', async ({ page }) => {
            await runPartialGeneration(page, 'getPhone', expectPhone);
        });
    });

    //1 Person instance created:
    //eg.
    //CPR: 0804141429
    // First name: Christine M.
    // Last name: Christiansen
    // Gender: female
    // Date of birth: 2014-04-08
    // Address: pWVMpøAoxdhÅu eGMLovCX DÅGXøPoERPFÆUAhiE 613G, 32.tv
    // 4622 Havdrup
    // Phone number: 49470606
    test.describe('Full Person Generation', () => {
        const testCases = [
            { count: 1, name: 'a single person' },
            { count: 2, name: 'two persons' },
            { count: 99, name: '99 persons' },
            { count: 100, name: '100 persons' },
        ];

        for (const { count, name } of testCases) {
            test(`should generate ${name} in ui`, async ({ page }) => {
                const helpers = createPersonaHelpers(page);
                await helpers.visitHome();
                await helpers.getPerson(count.toString());
                await helpers.clickGenerate();

                await expectPersonWithCount(page, count);
            });
        }
    });

    async function expectPersonWithCount(page, expectedCount = 1) {
        await ensureOutputVisible(page);

        const personCards = page.locator('article.personCard');
        await expect(personCards).toHaveCount(expectedCount);

        for (let i = 0; i < expectedCount; i++) {
            const card = personCards.nth(i);
            await expectCpr(page, card);
            await expectNameGenderResults(page, card);
            await expectDob(page, card);
            await expectStreet(page, card);
            await expectTown(page, card);
            await expectPhone(page, card);
        }
    }

    async function expectNameGenderResults(page, scope = page) {
        await expect(scope.locator('.firstNameValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
        await expect(scope.locator('.lastNameValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
        await expect(scope.locator('.genderValue')).toHaveText(
            /^(male|female)$/i,
            { useInnerText: true },
        );
    }

    async function expectCpr(page, scope = page) {
        await expect(scope.locator('.cprValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
    }

    async function expectDob(page, scope = page) {
        await expect(scope.locator('.dobValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
    }

    async function expectStreet(page, scope = page) {
        await expect(scope.locator('.streetValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
    }

    async function expectTown(page, scope = page) {
        await expect(scope.locator('.townValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
    }

    async function expectPhone(page, scope = page) {
        await expect(scope.locator('.phoneNumberValue')).toHaveText(/[^\s]/, {
            useInnerText: true,
        });
    }
});
