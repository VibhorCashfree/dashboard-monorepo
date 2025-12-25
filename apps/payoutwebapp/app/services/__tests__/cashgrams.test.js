import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as CashgramsService from 'services/cashgrams';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('cashgrams services', () => {
  test('[SUCCESS] getAll()', async () => {
    const mockResponse = { cashgrams: [] };

    httpMock.onGet('payout/cashgrams?size=2&').reply(200, mockResponse);

    const response = await CashgramsService.getAll({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getAll()', async () => {
    httpMock.onGet('payout/cashgrams?size=2&').reply(404);

    const response = await CashgramsService.getAll({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] searchCashgram()', async () => {
    const mockResponse = { cashgrams: [] };

    httpMock
      .onGet('payout/cashgrams?cashgramId=abc123&')
      .reply(200, mockResponse);

    const response = await CashgramsService.searchCashgram('abc123');

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] searchCashgram()', async () => {
    httpMock.onGet('payout/cashgrams?cashgramId=abc123&').reply(404);

    const response = await CashgramsService.searchCashgram('abc123');

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getVerifyBeneficiaries()', async () => {
    const mockResponse = { cashgrams: [] };

    httpMock.onGet('payout/cashgrams/premium?size=2&').reply(200, mockResponse);

    const response = await CashgramsService.getVerifyBeneficiaries({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getVerifyBeneficiaries()', async () => {
    httpMock.onGet('payout/cashgrams/premium?size=2&').reply(404);

    const response = await CashgramsService.getVerifyBeneficiaries({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getVerifyBeneficiariesCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/cashgrams/premium/count?size=1&')
      .reply(200, mockResponse);

    const response = await CashgramsService.getVerifyBeneficiariesCount({
      size: 1,
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getVerifyBeneficiariesCount()', async () => {
    httpMock.onGet('payout/cashgrams/premium/count?size=1&').reply(404);

    const response = await CashgramsService.getVerifyBeneficiariesCount({
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock.onGet('payout/cashgrams/count?size=1&').reply(200, mockResponse);

    const response = await CashgramsService.getAllCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAllCount()', async () => {
    httpMock.onGet('payout/cashgrams/count?size=1&').reply(404);

    const response = await CashgramsService.getAllCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/cashgrams/details?cfCashgramID=123&')
      .reply(200, mockResponse);

    const response = await CashgramsService.getDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getDetails()', async () => {
    httpMock.onGet('payout/cashgrams/123?cfCashgramID=123&').reply(404);

    const response = await CashgramsService.getDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchApprovalDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/cashgrams/batch/123/details')
      .reply(200, mockResponse);

    const response = await CashgramsService.getBatchApprovalDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchApprovalDetails()', async () => {
    httpMock.onGet('payout/cashgrams/batch/123/details').reply(404);

    const response = await CashgramsService.getBatchApprovalDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] create()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/cashgrams').reply(200, mockResponse);

    const response = await CashgramsService.create();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] create()', async () => {
    httpMock.onPost('payout/cashgrams').reply(404);

    const response = await CashgramsService.create();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] verifyBeneficiaries()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/cashgrams/verify').reply(200, mockResponse);

    const response = await CashgramsService.verifyBeneficiaries();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] verifyBeneficiaries()', async () => {
    httpMock.onPost('payout/cashgrams/verify').reply(404);

    const response = await CashgramsService.verifyBeneficiaries();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] rejectBeneficiaries()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/cashgrams/reject').reply(200, mockResponse);

    const response = await CashgramsService.rejectBeneficiaries();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] rejectBeneficiaries()', async () => {
    httpMock.onPost('payout/cashgrams/reject').reply(404);

    const response = await CashgramsService.rejectBeneficiaries();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] createBatch()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/cashgrams/batch/upload').reply(200, mockResponse);

    const response = await CashgramsService.createBatch();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] createBatch()', async () => {
    httpMock.onPost('payout/cashgrams/batch/upload').reply(404);

    const response = await CashgramsService.createBatch();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateBatch()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/cashgrams/batch/update').reply(200, mockResponse);

    const response = await CashgramsService.updateBatch();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateBatch()', async () => {
    httpMock.onPost('payout/cashgrams/batch/update').reply(404);

    const response = await CashgramsService.updateBatch();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateBatchEntries()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPatch('payout/cashgrams/batch/record/update')
      .reply(200, mockResponse);

    const response = await CashgramsService.updateBatchEntries();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateBatchEntries()', async () => {
    httpMock.onPatch('payout/cashgrams/batch/record/update').reply(404);

    const response = await CashgramsService.updateBatchEntries();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatches()', async () => {
    const mockResponse = { batches: [] };

    httpMock.onGet('payout/cashgrams/batch?size=2&').reply(200, mockResponse);

    const response = await CashgramsService.getBatches({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getBatches()', async () => {
    httpMock.onGet('payout/cashgrams/batch?size=2&').reply(404);

    const response = await CashgramsService.getBatches({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchesCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/cashgrams/batch/count?size=1&')
      .reply(200, mockResponse);

    const response = await CashgramsService.getBatchesCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchesCount()', async () => {
    httpMock.onGet('payout/cashgrams/batch/count?size=1&').reply(404);

    const response = await CashgramsService.getBatchesCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getErrorLog()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/cashgrams/batch/123/download/error-log')
      .reply(200, mockResponse);

    const response = await CashgramsService.getErrorLog(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getErrorLog()', async () => {
    httpMock.onGet('payout/cashgrams/batch/123/download/error-log').reply(404);

    const response = await CashgramsService.getErrorLog(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] downloadBatchReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/cashgrams/batch/123/download/report')
      .reply(200, mockResponse);

    const response = await CashgramsService.downloadBatchReport(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] downloadBatchReport()', async () => {
    httpMock.onGet('payout/cashgrams/batch/123/download/report').reply(404);

    const response = await CashgramsService.downloadBatchReport(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchStats()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/cashgrams/batch/123/stats?approveSection=false')
      .reply(200, mockResponse);

    const response = await CashgramsService.getBatchStats(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchStats()', async () => {
    httpMock
      .onGet('payout/cashgrams/batch/123/stats?approveSection=false')
      .reply(404);

    const response = await CashgramsService.getBatchStats(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchEntries()', async () => {
    const mockResponse = { cashgrams: [] };

    httpMock
      .onGet('payout/cashgrams/batch/123?size=2&')
      .reply(200, mockResponse);

    const response = await CashgramsService.getBatchEntries(123, {
      size: 1,
    });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getBatchEntries()', async () => {
    httpMock.onGet('payout/cashgrams/batch/123?size=2&').reply(404);

    const response = await CashgramsService.getBatchEntries(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchEntriesCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/cashgrams/batch/123/count?size=1&')
      .reply(200, mockResponse);

    const response = await CashgramsService.getBatchEntriesCount(123, {
      size: 1,
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchEntriesCount()', async () => {
    httpMock.onGet('payout/cashgrams/batch/123/count?size=1&').reply(404);

    const response = await CashgramsService.getBatchEntriesCount(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] send()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/cashgrams/notify').reply(200, mockResponse);

    const response = await CashgramsService.send();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] send()', async () => {
    httpMock.onPost('payout/cashgrams/notify').reply(404);

    const response = await CashgramsService.send();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] deactivate()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/cashgrams/123').reply(200, mockResponse);

    const response = await CashgramsService.deactivate(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] deactivate()', async () => {
    httpMock.onDelete('payout/cashgrams/123').reply(404);

    const response = await CashgramsService.deactivate(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
