import MockAdapter from 'axios-mock-adapter';

// Constants
import { METRIC_TYPE } from 'containers/APIMetrics/constants';
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as AccountsService from 'services/accounts';
import * as DevelopersService from 'services/developers';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('developers services', () => {
  test('[SUCCESS] removeAPIKey()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/apiKey/123?foo=bar&').reply(200, mockResponse);

    const response = await DevelopersService.removeAPIKey(123, { foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] removeAPIKey()', async () => {
    httpMock.onDelete('payout/apiKey/123?foo=bar&').reply(404);

    const response = await DevelopersService.removeAPIKey(123, { foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] removeIP()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/merchantIP/123').reply(200, mockResponse);

    const response = await DevelopersService.removeIP(123);

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] removeIP()', async () => {
    httpMock.onDelete('payout/merchantIP/123').reply(404);

    const response = await DevelopersService.removeIP(123);

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] removeWebhook()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/webhook').reply(200, mockResponse);

    const response = await DevelopersService.removeWebhook();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] removeWebhook()', async () => {
    httpMock.onDelete('payout/webhook').reply(404);

    const response = await DevelopersService.removeWebhook();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] removePublicKey()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onDelete('payout/publicKey').reply(200, mockResponse);

    const response = await DevelopersService.removePublicKey();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] removePublicKey()', async () => {
    httpMock.onDelete('payout/publicKey').reply(404);

    const response = await DevelopersService.removePublicKey();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getAPIKeys()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/activeAPIKeys?foo=bar&').reply(200, mockResponse);

    const response = await DevelopersService.getAPIKeys({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getAPIKeys()', async () => {
    httpMock.onGet('payout/activeAPIKeys?foo=bar&').reply(404);

    const response = await DevelopersService.getAPIKeys({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getIPs()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/merchantIPs').reply(200, mockResponse);

    const response = await DevelopersService.getIPs();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getIPs()', async () => {
    httpMock.onGet('payout/merchantIPs').reply(404);

    const response = await DevelopersService.getIPs();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getWebhook()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/webhook').reply(200, mockResponse);

    const response = await DevelopersService.getWebhook();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getWebhook()', async () => {
    httpMock.onGet('payout/webhook').reply(404);

    const response = await DevelopersService.getWebhook();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getPublicKey()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/publicKey').reply(200, mockResponse);

    const response = await DevelopersService.getPublicKey();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getPublicKey()', async () => {
    httpMock.onGet('payout/publicKey').reply(404);

    const response = await DevelopersService.getPublicKey();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] addAPIKey()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/apiKey').reply(200, mockResponse);

    const response = await DevelopersService.addAPIKey({});

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] addAPIKey()', async () => {
    httpMock.onPost('payout/apiKey').reply(404);

    const response = await DevelopersService.addAPIKey({});

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] addIPs()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/bulkIPs').reply(200, mockResponse);

    const response = await DevelopersService.addIPs();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] addIPs()', async () => {
    httpMock.onPost('payout/bulkIPs').reply(404);

    const response = await DevelopersService.addIPs();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] addWebhook()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/webhook').reply(200, mockResponse);

    const response = await DevelopersService.addWebhook();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] addWebhook()', async () => {
    httpMock.onPost('payout/webhook').reply(404);

    const response = await DevelopersService.addWebhook();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] testWebhook()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/webhook/test').reply(200, mockResponse);

    const response = await DevelopersService.testWebhook();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] testWebhook()', async () => {
    httpMock.onPost('payout/webhook/test').reply(404);

    const response = await DevelopersService.testWebhook();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] generatePublicKey()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('payout/publicKey').reply(200, mockResponse);

    const response = await DevelopersService.generatePublicKey();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] generatePublicKey()', async () => {
    httpMock.onPost('payout/publicKey').reply(404);

    const response = await DevelopersService.generatePublicKey();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getMerchantPreference()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onGet('payout/merchantPreference').reply(200, mockResponse);

    const response = await AccountsService.getMerchantPreference();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getMerchantPreference()', async () => {
    httpMock.onGet('payout/merchantPreference').reply(404);

    const response = await AccountsService.getMerchantPreference();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] setMerchantPreference()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPatch('payout/merchantPreference').reply(200, mockResponse);

    const response = await AccountsService.setMerchantPreference();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] setMerchantPreference()', async () => {
    httpMock.onPatch('payout/merchantPreference').reply(404);

    const response = await AccountsService.setMerchantPreference();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getHistoryLog()', async () => {
    const mockResponse = { batches: [] };

    httpMock.onGet('payout/authHistoryLogs?size=2&').reply(200, mockResponse);

    const response = await DevelopersService.getHistoryLog({ size: 1 });

    expect(response).toEqual({ data: [], hasNext: false });
  });

  test('[ERROR] getHistoryLog()', async () => {
    httpMock.onGet('payout/authHistoryLogs?size=2&').reply(404);

    const response = await DevelopersService.getHistoryLog({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getHistoryLogCount()', async () => {
    const mockResponse = { count: 0 };

    httpMock
      .onGet('payout/authHistoryLogs/count?size=1&')
      .reply(200, mockResponse);

    const response = await DevelopersService.getHistoryLogCount({ size: 1 });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] getHistoryLogCount()', async () => {
    httpMock.onGet('payout/authHistoryLogs/count?size=1&').reply(404);

    const response = await DevelopersService.getHistoryLogCount({ size: 1 });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getHistoryLogUsers()', async () => {
    const mockResponse = { users: [{ userName: 'john doe' }] };

    httpMock
      .onGet('payout/authHistoryLogs/users?foo=bar&')
      .reply(200, mockResponse);

    const response = await DevelopersService.getHistoryLogUsers({ foo: 'bar' });

    expect(response).toEqual(mockResponse.users.map((user) => user.userName));
  });

  test('[ERROR] getHistoryLogUsers()', async () => {
    httpMock.onGet('payout/authHistoryLogs/users?foo=bar&').reply(404);

    const response = await DevelopersService.getHistoryLogUsers({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] getMetrics()', async () => {
    const mockResponse = {
      data: [
        {
          latency: 0.14226570899999835,
          timestamp: 1669102980,
        },
        {
          latency: 0.7198977984999999,
          timestamp: 1669110760,
        },
        {
          latency: 0.07390025200000139,
          timestamp: 1669093980,
        },
      ],
    };

    httpMock.onPost('payouts/api-metric').reply(200, mockResponse);

    const response = await DevelopersService.getMetrics({
      metricType: METRIC_TYPE.LATENCY,
    });

    expect(response.dataKeys).toEqual(['latency']);
  });

  test('[ERROR] getMetrics()', async () => {
    httpMock.onPost('payouts/api-metric').reply(404);

    const response = await DevelopersService.getMetrics({
      metricType: METRIC_TYPE.LATENCY,
    });

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
