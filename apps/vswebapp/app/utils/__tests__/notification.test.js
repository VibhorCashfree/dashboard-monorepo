// Utils
import Env from 'utils/env';
import Notification from '../notification';

beforeEach(() => {
  jest
    .mock('utils/env')
    .spyOn(Env, 'get')
    .mockImplementation(() => 'PROD');

  window.localStorage.clear();
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('Notification checks', () => {
  test('Notification set and get', () => {
    Notification.set(['2FA']);

    expect(Notification.get('NOTIFICATION')).toEqual(['2FA']);
  });
});
