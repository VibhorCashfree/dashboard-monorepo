// Utils
import Banks from '../banks';

describe('Banks checks', () => {
  test('Banks module', () => {
    expect(typeof Banks.getCode).toBe('function');
    expect(typeof Banks.getIcon).toBe('function');
  });

  test('getCode()', () => {
    expect(Banks.getCode('ICIC0000009')).toBe('ICIC');
    expect(Banks.getCode('YESB0000262')).toBe('YESB');
    expect(Banks.getCode('HDFC0000001')).toBe('HDFC');
  });

  test('getIcon()', () => {
    expect(Banks.getIcon('ICIC0000009')).toBe('IMAGE_MOCK');
    expect(Banks.getIcon('HDFC0000001')).toBe('IMAGE_MOCK');
  });
});
