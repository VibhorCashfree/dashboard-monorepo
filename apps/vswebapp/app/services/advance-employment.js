// Utils
import http from 'utils/http';

export const verifyAdvancedEmployment = async body => {
  try {
    const response = await http.post('verification/advance-employment', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
