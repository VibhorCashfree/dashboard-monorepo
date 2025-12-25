import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as SettingsService from 'services/settings';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('settings services', () => {
  test('[SUCCESS] getCategories()', async () => {
    const mockResponse = { settings: [] };

    httpMock
      .onGet('payout/settings/emailNotifications?foo=bar&')
      .reply(200, mockResponse);

    const response = await SettingsService.getCategories({ foo: 'bar' });

    expect(response).toEqual(mockResponse.settings);
  });

  test('[ERROR] getCategories()', async () => {
    httpMock.onGet('payout/settings/emailNotifications?foo=bar&').reply(404);

    const response = await SettingsService.getCategories({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] addNewRecipient()', async () => {
    const mockResponse = {};

    httpMock
      .onPost('payout/settings/emailNotifications?foo=bar&')
      .reply(200, mockResponse);

    const response = await SettingsService.addNewRecipient({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] addNewRecipient()', async () => {
    httpMock.onPost('payout/settings/emailNotifications?foo=bar&').reply(404);

    const response = await SettingsService.addNewRecipient({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] removeRecipient()', async () => {
    const mockResponse = {};

    httpMock
      .onDelete('payout/settings/emailNotifications/recipient?foo=bar&')
      .reply(200, mockResponse);

    const response = await SettingsService.removeRecipient({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] removeRecipient()', async () => {
    httpMock
      .onDelete('payout/settings/emailNotifications/recipient?foo=bar&')
      .reply(404);

    const response = await SettingsService.removeRecipient({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] toggleCategory()', async () => {
    const mockResponse = {};

    httpMock
      .onPost('payout/settings/emailNotifications/toggle?foo=bar&')
      .reply(200, mockResponse);

    const response = await SettingsService.toggleCategory({ foo: 'bar' });

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] toggleCategory()', async () => {
    httpMock
      .onPost('payout/settings/emailNotifications/toggle?foo=bar&')
      .reply(404);

    const response = await SettingsService.toggleCategory({ foo: 'bar' });

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
