// Utils
import http from 'utils/http';

export const verify = async body => {
  try {
    const response = await http.post('verification/name-match', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
