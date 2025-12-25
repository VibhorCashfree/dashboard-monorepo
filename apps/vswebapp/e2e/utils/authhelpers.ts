import { Page ,expect} from '@playwright/test';
import { loadEnv, getTestCredentials, getMerchantDashboardUrl } from './envLoader';
import { 
  MENU_ITEMS, 
} from './testConstants';


// Load environment variables on module initialization
loadEnv('gamma');

/**
 * Switch to a different environment (useful for testing different environments)
 * @param env - Environment name (e.g., 'gamma', 'qa', 'prod', 'development')
 */
export function switchEnvironment(env: string): void {
  loadEnv(env);
  // Update default credentials and config after loading new environment
  Object.assign(DEFAULT_CREDENTIALS, getTestCredentials());
  Object.assign(DEFAULT_CONFIG, { baseUrl: getMerchantDashboardUrl() });
}

/**
 * Generic credentials interface for login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Configuration interface for environment URLs
 */
export interface Config {
  baseUrl?: string;
}

/**
 * Default login credentials (loaded from environment)
 */
export const DEFAULT_CREDENTIALS: LoginCredentials = getTestCredentials();

/**
 * Default configuration (loaded from environment)
 */
export const DEFAULT_CONFIG: Config = {
  baseUrl: getMerchantDashboardUrl()
};

/**
 * Login to Cashfree merchant dashboard
 * @param page - Playwright page object
 * @param credentials - Login credentials (optional, uses defaults if not provided)
 * @param config - Configuration object (optional, uses defaults if not provided)
 */
export async function loginToCashfree(
  page: Page,
  credentials: LoginCredentials = DEFAULT_CREDENTIALS,
  config: Config = DEFAULT_CONFIG
): Promise<void> {
  
  await page.goto(`${config.baseUrl}/auth/login`);

  await page.getByRole('textbox', { name: 'Registered Email Address' }).fill(credentials.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Log In' }).click();
await page.waitForURL(/merchantwebapp\/landing/, { timeout: 60000 });

}

export async function openSecureId(page: Page) {
  await page.goto('https://merchant-gamma.cashfree.com/merchantwebapp/landing?env=prod');
  await page.getByText('Secure ID').nth(2).click();
  await page.locator('div:nth-child(8) > .btn-container > .styled__StyledButton-sc-1m1fxle-0').click();
  await page.goto('https://merchant-gamma.cashfree.com/vswebapp/home');
}

export async function loginAndNavigateToBankAccount(page: Page) {
  await loginToCashfree(page);
  await openSecureId(page);

  await page.getByTestId('sidebar-menu')
    .locator('a')
    .filter({ hasText: MENU_ITEMS.bankAccount })
    .click();
}


/**
 * Logs in, opens Secure ID, and navigates to Aadhaar/PAN → PAN page.
 */
export async function loginAndNavigateToPAN(page: Page) {
  // Step 1 - Login
  await loginToCashfree(page);

  // Step 2 - Navigate to Secure ID
  await openSecureId(page);

  // Step 3 - Aadhaar/PAN → PAN
  await page.getByTestId('sidebar-menu')
    .getByText(MENU_ITEMS.aadhaarPan)
    .click();

  await page.locator('a')
    .filter({ hasText: MENU_ITEMS.pan })
    .click();
}



