import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as SummaryService from 'services/summary';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('summary services', () => {
  test('[SUCCESS] getStats()', async () => {
    const mockResponse = {};

    httpMock.onGet('payouts/summaries?foo=bar&').reply(200, mockResponse);

    const response = await SummaryService.getStats({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getStats()', async () => {
    httpMock.onGet('payouts/summaries?foo=bar&').reply(404);

    const response = await SummaryService.getStats({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getSuccessRate()', async () => {
    const mockResponse = {};

    httpMock.onGet('payouts/summaries/sr?foo=bar&').reply(200, mockResponse);

    const response = await SummaryService.getSuccessRate({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getSuccessRate()', async () => {
    httpMock.onGet('payouts/summaries/sr?foo=bar&').reply(404);

    const response = await SummaryService.getSuccessRate({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getTransferTAT()', async () => {
    const mockResponse = {};

    httpMock.onGet('payouts/summaries/tat?foo=bar&').reply(200, mockResponse);

    const response = await SummaryService.getTransferTAT({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getTransferTAT()', async () => {
    httpMock.onGet('payouts/summaries/tat?foo=bar&').reply(404);

    const response = await SummaryService.getTransferTAT({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
