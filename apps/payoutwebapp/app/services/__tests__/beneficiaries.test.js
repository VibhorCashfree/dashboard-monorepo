import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as BeneficiariesService from 'services/beneficiaries';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('beneficiaries services', () => {
  test('[SUCCESS] getAll()', async () => {
    const mockResponse = { entries: [] };

    httpMock
      .onGet('payout/beneficiaries/paginatedBeneList?size=2&')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getAll({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getAll()', async () => {
    httpMock.onGet('payout/beneficiaries/paginatedBeneList?size=2&').reply(404);

    const response = await BeneficiariesService.getAll({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/beneficiaries/paginatedBeneList/count?size=1&')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getAllCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAllCount()', async () => {
    httpMock
      .onGet('payout/beneficiaries/paginatedBeneList/count?size=1&')
      .reply(404);

    const response = await BeneficiariesService.getAllCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/beneficiaries/info/123').reply(200, mockResponse);

    const response = await BeneficiariesService.getDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getDetails()', async () => {
    httpMock.onGet('payout/beneficiaries/info/123').reply(404);

    const response = await BeneficiariesService.getDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] remove()', async () => {
    const mockResponse = true;

    httpMock
      .onDelete('payout/beneficiaries/delete/123')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.remove(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] remove()', async () => {
    httpMock.onDelete('payout/beneficiaries/delete/123').reply(404);

    const response = await BeneficiariesService.remove(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] create()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/beneficiaries/createBene').reply(200, mockResponse);

    const response = await BeneficiariesService.create(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] create()', async () => {
    httpMock.onPost('payout/beneficiaries/createBene').reply(404);

    const response = await BeneficiariesService.create(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getSuggestions()', async () => {
    const mockResponse = { entries: [] };

    httpMock
      .onGet('payout/beneficiaries/beneSuggestions?query=123')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getSuggestions(123);

    expect(response).toEqual(mockResponse.entries.slice(0, 5));
  });

  test('[ERROR] getSuggestions()', async () => {
    httpMock.onGet('payout/beneficiaries/beneSuggestions?query=123').reply(404);

    const response = await BeneficiariesService.getSuggestions(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] createBatch()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/beneficiaries/batch').reply(200, mockResponse);

    const response = await BeneficiariesService.createBatch(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] createBatch()', async () => {
    httpMock.onPost('payout/beneficiaries/batch').reply(404);

    const response = await BeneficiariesService.createBatch(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateBatch()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPatch('payout/beneficiaries/batch/update')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.updateBatch(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateBatch()', async () => {
    httpMock.onPatch('payout/beneficiaries/batch/update').reply(404);

    const response = await BeneficiariesService.updateBatch(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatches()', async () => {
    const mockResponse = { batches: [] };

    httpMock
      .onGet('payout/beneficiaries/batch?size=2&')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getBatches({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getBatches()', async () => {
    httpMock.onGet('payout/beneficiaries/batch?size=2&').reply(404);

    const response = await BeneficiariesService.getBatches({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchesCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/beneficiaries/batch/count?size=1&')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getBatchesCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchesCount()', async () => {
    httpMock.onGet('payout/beneficiaries/batch/count?size=1&').reply(404);

    const response = await BeneficiariesService.getBatchesCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getErrorLog()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/beneficiaries/batch/123/download/error-log')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getErrorLog(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getErrorLog()', async () => {
    httpMock
      .onGet('payout/beneficiaries/batch/123/download/error-log')
      .reply(404);

    const response = await BeneficiariesService.getErrorLog(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] downloadBatchReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/beneficiaries/batch/123/download/report')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.downloadBatchReport(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] downloadBatchReport()', async () => {
    httpMock.onGet('payout/beneficiaries/batch/123/download/report').reply(404);

    const response = await BeneficiariesService.downloadBatchReport(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchStats()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/beneficiaries/batch/123/stats')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getBatchStats(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchStats()', async () => {
    httpMock.onGet('payout/beneficiaries/batch/123/stats').reply(404);

    const response = await BeneficiariesService.getBatchStats(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchEntries()', async () => {
    const mockResponse = { entries: [] };

    httpMock
      .onGet('payout/beneficiaries/batch/123?size=2&')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getBatchEntries(123, {
      size: 1,
    });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getBatchEntries()', async () => {
    httpMock.onGet('payout/beneficiaries/batch/123?size=2&').reply(404);

    const response = await BeneficiariesService.getBatchEntries(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchEntriesCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/beneficiaries/batch/123/count?size=1&')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.getBatchEntriesCount(123, {
      size: 1,
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchEntriesCount()', async () => {
    httpMock.onGet('payout/beneficiaries/batch/123/count?size=1&').reply(404);

    const response = await BeneficiariesService.getBatchEntriesCount(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] update()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPut('payout/beneficiaries/updateBene/123')
      .reply(200, mockResponse);

    const response = await BeneficiariesService.update(123, {});

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] update()', async () => {
    httpMock.onPut('payout/beneficiaries/updateBene/123').reply(404);

    const response = await BeneficiariesService.update(123, {});

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
