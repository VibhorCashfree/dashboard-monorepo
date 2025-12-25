// Utils
import getAlertIcon from '../getAlertIcon';

describe('getAlertIcon helpers', () => {
  test('getAlertIcon()', () => {
    expect(getAlertIcon('info', 'md')).toBe('IMAGE_MOCK');
    expect(getAlertIcon('warning', 'lg')).toBe('IMAGE_MOCK');
    expect(getAlertIcon('danger')).toBe('IMAGE_MOCK');
    expect(getAlertIcon('something')).toBe(undefined);
  });
});
