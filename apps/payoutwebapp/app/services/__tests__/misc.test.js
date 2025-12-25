import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as MiscService from 'services/misc';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('misc services', () => {
  test('[SUCCESS] requestActivation()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/requestActivation').reply(200, mockResponse);

    const response = await MiscService.requestActivation();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] requestActivation()', async () => {
    httpMock.onPost('payout/requestActivation').reply(404);

    const response = await MiscService.requestActivation();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getSampleFile()', async () => {
    const mockResponse = {};

    httpMock.onGet('payout/sampleFile?foo=bar&').reply(200, mockResponse);

    const response = await MiscService.getSampleFile({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getSampleFile()', async () => {
    httpMock.onGet('payout/sampleFile?foo=bar&').reply(404);

    const response = await MiscService.getSampleFile({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getFeatureToggle()', async () => {
    const mockResponse = {
      data: { toggles: [{ featureName: 'X', value: 'Y' }] },
    };

    httpMock.onPost('common/feature-toggle').reply(200, mockResponse);

    const response = await MiscService.getFeatureToggle();

    expect(response).toEqual({ X: 'Y' });
  });

  test('[ERROR] getFeatureToggle()', async () => {
    httpMock.onPost('common/feature-toggle').reply(404);

    const response = await MiscService.getFeatureToggle();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getTnC()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('common/merchant/tnc-list').reply(200, mockResponse);

    const response = await MiscService.getTnC();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getTnC()', async () => {
    httpMock.onPost('common/merchant/tnc-list').reply(404);

    const response = await MiscService.getTnC();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] acceptTnC()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('common/merchant/terms-and-conditions')
      .reply(200, mockResponse);

    const response = await MiscService.acceptTnC();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] acceptTnC()', async () => {
    httpMock.onPost('common/merchant/terms-and-conditions').reply(404);

    const response = await MiscService.acceptTnC();

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
