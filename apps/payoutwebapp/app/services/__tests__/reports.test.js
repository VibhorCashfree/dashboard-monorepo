import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as ReportsService from 'services/reports';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('reports services', () => {
  test('[SUCCESS] getAll()', async () => {
    const mockResponse = [];

    httpMock.onGet('payouts/reports/list?size=1&').reply(200, mockResponse);

    const response = await ReportsService.getAll({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAll()', async () => {
    httpMock.onGet('payouts/reports/list?size=1&').reply(404);

    const response = await ReportsService.getAll({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getReportTypes()', async () => {
    const mockResponse = { reportTypes: [] };

    httpMock.onGet('payouts/reports/type').reply(200, mockResponse);

    const response = await ReportsService.getReportTypes();

    expect(response).toEqual(mockResponse.reportTypes);
  });

  test('[ERROR] getReportTypes()', async () => {
    httpMock.onGet('payouts/reports/type').reply(404);

    const response = await ReportsService.getReportTypes();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] generateReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payouts/reports').reply(200, mockResponse);

    const response = await ReportsService.generateReport();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] generateReport()', async () => {
    httpMock.onPost('payouts/reports').reply(404);

    const response = await ReportsService.generateReport();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] downloadReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payouts/reports/123').reply(200, mockResponse);

    const response = await ReportsService.downloadReport(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] downloadReport()', async () => {
    httpMock.onGet('payouts/reports/123').reply(404);

    const response = await ReportsService.downloadReport(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] deleteReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payouts/reports/123').reply(200, mockResponse);

    const response = await ReportsService.deleteReport(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] deleteReport()', async () => {
    httpMock.onDelete('payouts/reports/123').reply(404);

    const response = await ReportsService.deleteReport(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
