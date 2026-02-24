// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  timeout: 90000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    screenshot: 'on',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    navigationTimeout: 60000,
    actionTimeout: 0,
  },

  /* Configure projects for major browsers */
  projects: [
    /* --- 1 & 2. NAVEGADORES Y SO (EMULADOS) --- */
    {
      name: 'Chrome_Windows_Recent',
      use: { ...devices['Desktop Chrome'] }, // Cubre Chrome/Windows/Linux
    },
    {
      name: 'Safari_macOS_Recent',
      use: { ...devices['Desktop Safari'] }, // Motor WebKit (Safari macOS)
    },
    {
      name: 'Firefox_Desktop',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Edge_Windows',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    /* --- 3. RESOLUCIONES ESCRITORIO --- */
    { name: 'Res_1366x768', use: { viewport: { width: 1366, height: 768 } } },
    { name: 'Res_1920x1080', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'Res_1536x864', use: { viewport: { width: 1536, height: 864 } } },
    { name: 'Res_1280x720', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'Res_1280x665_UOC', use: { viewport: { width: 1280, height: 665 } } },
    { name: 'Res_1440x900', use: { viewport: { width: 1440, height: 900 } } },

    /* --- 3. MÓVIL Y TABLET (iOS 16+ / Android 12+) --- */
    // Android Estándares (Samsung/Xiaomi)
    { name: 'Android_360x800', use: { viewport: { width: 360, height: 800 }, isMobile: true } },
    { name: 'Android_360x640', use: { viewport: { width: 360, height: 640 }, isMobile: true } },

    // iPhone Base y Pro Max
    { name: 'iPhone_16_Base', use: { ...devices['iPhone 14'] } }, // 393 x 852
    { name: 'iPhone_16_Pro_Max', use: { ...devices['iPhone 14 Pro Max'] } }, // 430 x 932
    { name: 'iPhone_Res_390x844', use: { viewport: { width: 390, height: 844 }, isMobile: true } },

    // Orientación Horizontal (Ejemplo con iPhone)
    {
      name: 'iPhone_Landscape',
      use: { ...devices['iPhone 14 Pro Max'], viewport: { width: 932, height: 430 } },
    },

    // Tablet: iPad Clásico
    { name: 'iPad_Classic', use: { ...devices['iPad (gen 7)'] } }, // 768 x 1024

    /* --- 4. ACCESIBILIDAD Y ZOOM (ESCALADO) --- */
    {
      name: 'Zoom_125',
      use: { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1.25 },
    },
    {
      name: 'Zoom_150',
      use: { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1.5 },
    },
    {
      name: 'Zoom_200',
      use: { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 },
    }
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

