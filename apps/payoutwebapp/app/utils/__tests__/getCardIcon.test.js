// Utils
import getCardIcon from '../getCardIcon';

describe('getCardIcon helpers', () => {
  test('getCardIcon()', () => {
    expect(getCardIcon('NAME', 'visa')).toBe('IMAGE_MOCK');
    expect(getCardIcon('NUMBER', '4111111111111111')).toBe('IMAGE_MOCK');
    expect(getCardIcon('NAME', 'foo')).toBe(undefined);
    expect(getCardIcon('NUMBER', '411111')).toBe(null);
    expect(getCardIcon()).toBe(null);
  });
});
