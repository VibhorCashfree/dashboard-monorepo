// Utils
import Analytics from '../analytics';

beforeEach(() => {
  jest.mock('services/misc', () => ({
    track: jest.fn(() => Promise.resolve()),
  }));
});

describe('Analytics checks', () => {
  test('sendEvent()', async () => {
    expect(typeof Analytics.track).toBe('function');
  });
});
