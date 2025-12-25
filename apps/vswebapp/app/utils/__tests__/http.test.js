import http from '../http';

describe('http() checks', () => {
  test('valid axios instance', () => {
    expect(http).toHaveProperty('defaults.headers.post');
    expect(http).toHaveProperty('interceptors');
  });
});
