import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as AgreementsService from 'services/agreements';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('agreements services', () => {
  test('[SUCCESS] getAll()', async () => {
    const mockResponse = [];

    httpMock.onGet('payout/escrow/agreement?size=2&').reply(200, mockResponse);

    const response = await AgreementsService.getAll({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getAll()', async () => {
    httpMock.onGet('payout/escrow/agreement?size=2&').reply(404);

    const response = await AgreementsService.getAll({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAllCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/escrow/agreement/count?size=1&')
      .reply(200, mockResponse);

    const response = await AgreementsService.getAllCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAllCount()', async () => {
    httpMock.onGet('payout/escrow/agreement/count?size=1&').reply(404);

    const response = await AgreementsService.getAllCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] create()', async () => {
    const mockResponse = [];

    httpMock.onPost('payout/escrow/agreement').reply(200, mockResponse);

    const response = await AgreementsService.create();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] create()', async () => {
    httpMock.onPost('payout/escrow/agreement').reply(404);

    const response = await AgreementsService.create();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getDetails()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/escrow/agreement/123').reply(200, mockResponse);

    const response = await AgreementsService.getDetails(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getDetails()', async () => {
    httpMock.onGet('payout/escrow/agreement/123').reply(404);

    const response = await AgreementsService.getDetails(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getStatement()', async () => {
    const mockResponse = [];

    httpMock
      .onGet('payout/escrow/agreement/123/statement?size=2&')
      .reply(200, mockResponse);

    const response = await AgreementsService.getStatement(123, { size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getStatement()', async () => {
    httpMock.onGet('payout/escrow/agreement/123/statement?size=2&').reply(404);

    const response = await AgreementsService.getStatement(123, { size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getBalance()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/escrow/agreement/123/bank-account')
      .reply(200, mockResponse);

    const response = await AgreementsService.getBalance(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getBalance()', async () => {
    httpMock.onGet('payout/escrow/agreement/123/bank-account').reply(404);

    const response = await AgreementsService.getBalance(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] markTerminalStatus()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPatch('payout/escrow/agreement').reply(200, mockResponse);

    const response = await AgreementsService.markTerminalStatus(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] markTerminalStatus()', async () => {
    httpMock.onPatch('payout/escrow/agreement').reply(404);

    const response = await AgreementsService.markTerminalStatus(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] download()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock
      .onGet('payout/escrow/agreement/123/signed-agreement')
      .reply(200, mockResponse);

    const response = await AgreementsService.download(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] download()', async () => {
    httpMock.onGet('payout/escrow/agreement/123/signed-agreement').reply(404);

    const response = await AgreementsService.download(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
