// Utils
import http from 'utils/http';

export const getApps = async () => {
  try {
    const response = await http.get('verification/oauth2/app');

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllScropes = async () => {
  try {
    const response = await http.get('verification/scopes');

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createApp = async queryObj => {
  try {
    const response = await http.post('verification/oauth2/app', queryObj);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteApp = async payload => {
  try {
    const response = await http.delete(`verification/oauth2/app`, {
      data: payload,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const sendOTPForOnboarding = async payload => {
  try {
    const response = await http.post(
      'verification/mobile360/otp/send',
      payload,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyOTPForOnboarding = async payload => {
  try {
    const response = await http.post(
      'verification/mobile360/otp/verify',
      payload,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
