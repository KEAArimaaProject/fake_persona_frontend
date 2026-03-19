const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: '**/playwright_test.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  // App is served on 5500; API is at http://localhost:8080/api (see src/js/info.js).
  // Backend must allow CORS from http://localhost:5500 for e2e tests to pass.
  use: {
    baseURL: 'http://localhost:5500',
    trace: 'on-first-retry',
    headless: process.env.HEADLESS === 'true',
    launchOptions: {
      slowMo: process.env.SLOW_MO ? Number.parseInt(process.env.SLOW_MO) : 0,
    },
  },
  webServer: {
    command: 'npx http-server ../.. -p 5500 -c-1 --silent',
    port: 5500,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});