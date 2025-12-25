// Utils
import Env from 'utils/env';
import PitchPage from '../pitchPage';

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

describe('Pitch Page checks', () => {
  test('Pitch Page set and get', () => {
    PitchPage.set(['PAN', 'BAV', 'AADHAAR']);

    expect(PitchPage.get('PITCH_PAGES_PROD')).toEqual([
      'PAN',
      'BAV',
      'AADHAAR',
    ]);
  });
});
