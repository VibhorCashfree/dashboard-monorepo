// Utils
import http from 'utils/http';

export const retrieveData = async body => {
  try {
    const response = await http.post('/verification/mobile360/otpless', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
