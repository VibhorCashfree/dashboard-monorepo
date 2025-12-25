// Utils
import http from 'utils/http';

export const verify = async body => {
  try {
    const response = await http.post('verification/voter-id', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
