import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Load environment variables from the specified environment file
 * @param env - Environment name (e.g., 'gamma', 'qa', 'prod')
 */
export function loadEnv(env: string = 'gamma'): void {
  const envPath = path.resolve(__dirname, `../../env/.env.${env}`);
  dotenv.config({ path: envPath });
}

/**
 * Get environment variable with optional default value
 * @param key - Environment variable key
 * @param defaultValue - Default value if key is not found
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue || '';
}

/**
 * Get test credentials from environment
 */
export function getTestCredentials() {
  return {
    email: getEnv('STANDARD_MERCHANT_USERNAME', 'kisley.shirish+cfmain@cashfree.com'),
    password: getEnv('STANDARD_MERCHANT_PASSWORD', 'cashfree.123')
  };
}

/**
 * Get merchant dashboard base URL from environment
 */
export function getMerchantDashboardUrl(): string {
  return getEnv('MERCHANT_DASHBOARD_BASE_URL', 'https://merchant-gamma.cashfree.com');
}