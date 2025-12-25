// Utils
import http from '../http';

describe('http() checks', () => {
  test('axios instance', () => {
    expect(http).toHaveProperty(
      'defaults.headers.Authorization',
      'Bearer null',
    );

    expect(http).toHaveProperty('interceptors.request.handlers');
    expect(http).toHaveProperty('interceptors.response.handlers');
  });
});
