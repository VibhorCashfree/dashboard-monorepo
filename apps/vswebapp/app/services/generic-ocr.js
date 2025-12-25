// Utils
import http from 'utils/http';

export const verify = async body => {
  try {
    const response = await http.post('verification/bharat-ocr', body, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
