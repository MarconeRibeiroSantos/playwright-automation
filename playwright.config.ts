import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  timeout: 30000,
  retries: 2,
  reporter: 'list',
  testDir: 'tests', // Specify the test directory
};

export default config;