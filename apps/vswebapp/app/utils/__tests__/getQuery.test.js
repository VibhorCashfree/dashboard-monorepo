import getQuery from '../getQuery'; // Update with the correct path to your file

describe('getQuery', () => {
  let originalLocation;

  beforeAll(() => {
    // Store the original window.location
    originalLocation = global.window.location;
  });

  beforeEach(() => {
    // Mock window.location
    delete global.window.location;
    global.window.location = {
      search: '',
    };
  });

  afterAll(() => {
    // Restore original window.location
    global.window.location = originalLocation;
  });

  test('it should return an empty URLSearchParams when no query parameters are present', () => {
    const query = getQuery();

    expect(query.toString()).toEqual('');
  });

  test('it should return URLSearchParams with the correct query parameters', () => {
    // Set a sample query string
    global.window.location.search = '?status=active&startDate=1631929200000';

    const query = getQuery();

    // Validate the URLSearchParams
    expect(query.get('status')).toEqual('active');
    expect(query.get('startDate')).toEqual('1631929200000');
  });
});
