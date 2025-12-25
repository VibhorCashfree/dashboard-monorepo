// Constants
import { USER_TYPE } from 'constants/common';

// Utils
import hasPermission from '../hasPermission';

describe('hasPermission() checks', () => {
  test('hasPermission()', () => {
    expect(hasPermission([], '', [])).toBe(true);
    expect(hasPermission([], USER_TYPE.MERCHANT_OWNER, [])).toBe(true);
    // expect(hasPermission([], USER_TYPE.MERCHANT_ALIAS, [])).toBe(false);
    // expect(hasPermission([], USER_TYPE.MERCHANT_ALIAS, [200])).toBe(false);
    // expect(
    //   hasPermission([], USER_TYPE.MERCHANT_ALIAS, [200]),
    // ).toBe(true);
    // expect(
    //   hasPermission([], USER_TYPE.MERCHANT_ALIAS, [100, 200]),
    // ).toBe(true);
    // expect(
    //   hasPermission([], USER_TYPE.MERCHANT_ALIAS, [50, 100]),
    // ).toBe(true);
    expect(
      hasPermission([100, 200, 300], USER_TYPE.MERCHANT_OWNER, [200]),
    ).toBe(false);
    expect(hasPermission([], USER_TYPE.MERCHANT_OWNER, [200])).toBe(true);
  });
});
