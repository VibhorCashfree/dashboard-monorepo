// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getAll = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`verification/offline-aadhaar?${queryStr}`);
    return listingAdapter.from(response.entries, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllCount = async queryObj => {
  const queryStr = getQueryString(queryObj);
  try {
    const response = await http.get(
      `verification/offline-aadhaar/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const sendOTP = async body => {
  try {
    const response = await http.post(
      'verification/offline-aadhaar/send-otp',
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyOTP = async body => {
  try {
    const response = await http.post(
      'verification/offline-aadhaar/submit-aadhaar',
      body,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyOcr = async body => {
  try {
    const response = await http.post('verification/ocr/aadhaar', body, {
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

export const verifyAadhaarMasking = async body => {
  try {
    const response = await http.post('verification/aadhaar-masking', body, {
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
