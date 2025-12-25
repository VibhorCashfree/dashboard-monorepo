// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';
// Adapters
import listingAdapter from 'adapters/listing';

export const requestVerificationTypes = async body => {
  try {
    const response = await http.post('/verification/digilocker', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDigilockerDetails = async id => {
  try {
    const response = await http.get(
      `verification/digilocker?verification_id=${id}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDocDetails = async (docs, id) => {
  try {
    const response = await http.get(
      `verification/digilocker/document/${docs}?verification_id=${id}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAll = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(
      `verification/digilocker/all-verification/entries?${queryStr}`,
    );
    return listingAdapter.from(response.batches, queryObj);
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
      `verification/digilocker/all-verification/entries/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
