import MockAdapter from 'axios-mock-adapter';

// Constants
import { MOCK_ERROR } from 'constants/errors';

// Utils
import http from 'utils/http';

// Services
import * as OTPService from 'services/otp';

// Create a new instance of the axios mock adapter
const httpMock = new MockAdapter(http);

afterEach(() => {
  httpMock.reset();
});

describe('otp services', () => {
  test('[SUCCESS] verify2FA()', async () => {
    const mockResponse = { foo: 'bar' };

    httpMock.onPost('common/2fa/verify').reply(200, mockResponse);

    const response = await OTPService.verify2FA();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] verify2FA()', async () => {
    httpMock.onPost('common/2fa/verify').reply(404);

    const response = await OTPService.verify2FA();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] sendOTP()', async () => {
    const mockResponse = {};

    httpMock.onGet('common/2fa/send').reply(200, mockResponse);

    const response = await OTPService.sendOTP();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] sendOTP()', async () => {
    httpMock.onGet('common/2fa/send').reply(404);

    const response = await OTPService.sendOTP();

    expect(response).toEqual({ error: MOCK_ERROR });
  });

  test('[SUCCESS] validate2FA()', async () => {
    const mockResponse = {};

    httpMock.onGet('common/2fa/validate').reply(200, mockResponse);

    const response = await OTPService.validate2FA();

    expect(response).toEqual(mockResponse);
  });

  test('[ERROR] validate2FA()', async () => {
    httpMock.onGet('common/2fa/validate').reply(404);

    const response = await OTPService.validate2FA();

    expect(response).toEqual({ error: MOCK_ERROR });
  });
});
