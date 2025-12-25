// Utils
import hasPermission from '../hasPermission';

describe('hasPermission() checks', () => {
  test('hasPermission()', () => {
    expect(hasPermission('', [])).toBe(true);
    expect(hasPermission('MERCHANT_OWNER', [])).toBe(true);
    expect(hasPermission('MERCHANT_ALIAS', [])).toBe(false);
    expect(hasPermission('MERCHANT_ALIAS', [], 200)).toBe(false);
    expect(hasPermission('MERCHANT_ALIAS', [100, 200, 300], 200)).toBe(true);
    expect(hasPermission('MERCHANT_OWNER', [], 200)).toBe(true);
  });
});
