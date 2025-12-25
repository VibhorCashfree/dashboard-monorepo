import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as TransfersService from 'services/transfers';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('transfers services', () => {
  test('[SUCCESS] getAll()', async () => {
    const mockResponse = [];

    httpMock.onGet('payout/transfers?size=1&').reply(200, mockResponse);

    const response = await TransfersService.getAll({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAll()', async () => {
    httpMock.onGet('payout/transfers?size=1&').reply(404);

    const response = await TransfersService.getAll({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllCount()', async () => {
    const mockResponse = { result: 0 };

    httpMock.onGet('payout/transfers/count?size=1&').reply(200, mockResponse);

    const response = await TransfersService.getAllCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAllCount()', async () => {
    httpMock.onGet('payout/transfers/count?size=1&').reply(404);

    const response = await TransfersService.getAllCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/transfers/123?fileType=SOME_TYPE&')
      .reply(200, mockResponse);

    const response = await TransfersService.getDetails(123, 'SOME_TYPE');

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getDetails()', async () => {
    httpMock.onGet('payout/transfers/123?fileType=SOME_TYPE&').reply(404);

    const response = await TransfersService.getDetails(123, 'SOME_TYPE');

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchApprovalDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/transfers/batch/123/approvalsDetails')
      .reply(200, mockResponse);

    const response = await TransfersService.getBatchApprovalDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchApprovalDetails()', async () => {
    httpMock.onGet('payout/transfers/batch/123/approvalsDetails').reply(404);

    const response = await TransfersService.getBatchApprovalDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] create()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onPost('payout/transfers?quickTransfer=true')
      .reply(200, mockResponse);

    const response = await TransfersService.create();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] create()', async () => {
    httpMock.onPost('payout/transfers?quickTransfer=true').reply(404);

    const response = await TransfersService.create(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] createBatch()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/transfers/batch').reply(200, mockResponse);

    const response = await TransfersService.createBatch();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] createBatch()', async () => {
    httpMock.onPost('payout/transfers/batch').reply(404);

    const response = await TransfersService.createBatch();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateBatch()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPatch('payout/transfers/batch').reply(200, mockResponse);

    const response = await TransfersService.updateBatch();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateBatch()', async () => {
    httpMock.onPatch('payout/transfers/batch').reply(404);

    const response = await TransfersService.updateBatch();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] updateBatchEntries()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPatch('payout/transfers/batch/record').reply(200, mockResponse);

    const response = await TransfersService.updateBatchEntries();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] updateBatchEntries()', async () => {
    httpMock.onPatch('payout/transfers/batch/record').reply(404);

    const response = await TransfersService.updateBatchEntries();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllReversed()', async () => {
    const mockResponse = { transfers: [] };

    httpMock
      .onGet('payout/transfers/reversed?size=2&')
      .reply(200, mockResponse);

    const response = await TransfersService.getAllReversed({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getAllReversed()', async () => {
    httpMock.onGet('payout/transfers/reversed?size=2&').reply(404);

    const response = await TransfersService.getAllReversed({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllReversedCount()', async () => {
    const mockResponse = { result: 0 };

    httpMock
      .onGet('payout/transfers/reversed/count?size=1&')
      .reply(200, mockResponse);

    const response = await TransfersService.getAllReversedCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAllReversedCount()', async () => {
    httpMock.onGet('payout/transfers/reversed/count?size=1&').reply(404);

    const response = await TransfersService.getAllReversedCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatches()', async () => {
    const mockResponse = { batches: [] };

    httpMock.onGet('payout/transfers/batch?size=2&').reply(200, mockResponse);

    const response = await TransfersService.getBatches({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getBatches()', async () => {
    httpMock.onGet('payout/transfers/batch?size=2&').reply(404);

    const response = await TransfersService.getBatches({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchesCount()', async () => {
    const mockResponse = { result: 0 };

    httpMock
      .onGet('payout/transfers/batch/count?size=1&')
      .reply(200, mockResponse);

    const response = await TransfersService.getBatchesCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchesCount()', async () => {
    httpMock.onGet('payout/transfers/batch/count?size=1&').reply(404);

    const response = await TransfersService.getBatchesCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getErrorLog()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/transfers/batch/123/download/error-log')
      .reply(200, mockResponse);

    const response = await TransfersService.getErrorLog(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getErrorLog()', async () => {
    httpMock.onGet('payout/transfers/batch/123/download/error-log').reply(404);

    const response = await TransfersService.getErrorLog(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] downloadBatchReport()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/transfers/batch/123/download/report')
      .reply(200, mockResponse);

    const response = await TransfersService.downloadBatchReport(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] downloadBatchReport()', async () => {
    httpMock.onGet('payout/transfers/batch/123/download/report').reply(404);

    const response = await TransfersService.downloadBatchReport(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchStats()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/transfers/batch/123/stats?approveSection=false')
      .reply(200, mockResponse);

    const response = await TransfersService.getBatchStats(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchStats()', async () => {
    httpMock
      .onGet('payout/transfers/batch/123/stats?approveSection=false')
      .reply(404);

    const response = await TransfersService.getBatchStats(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchEntries()', async () => {
    const mockResponse = { transfers: [] };

    httpMock
      .onGet('payout/transfers/batch/123?size=2&')
      .reply(200, mockResponse);

    const response = await TransfersService.getBatchEntries(123, {
      size: 1,
    });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getBatchEntries()', async () => {
    httpMock.onGet('payout/transfers/batch/123?size=2&').reply(404);

    const response = await TransfersService.getBatchEntries(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBatchEntriesCount()', async () => {
    const mockResponse = { result: 0 };

    httpMock
      .onGet('payout/transfers/batch/123/count?size=1&')
      .reply(200, mockResponse);

    const response = await TransfersService.getBatchEntriesCount(123, {
      size: 1,
    });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBatchEntriesCount()', async () => {
    httpMock.onGet('payout/transfers/batch/123/count?size=1&').reply(404);

    const response = await TransfersService.getBatchEntriesCount(123, {
      size: 1,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] update()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPatch('payout/transfers').reply(200, mockResponse);

    const response = await TransfersService.update();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] update()', async () => {
    httpMock.onPatch('payout/transfers').reply(404);

    const response = await TransfersService.update();

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
