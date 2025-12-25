// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getAll = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/upiVerificationList?${queryStr}`);
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
      `payout/upiVerificationList/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verify = async body => {
  try {
    const response = await http.post('payout/upiVerification', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatches = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/batchUpi?${queryStr}`);
    return listingAdapter.from(response.batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchesCount = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(`payout/batchUpi/count?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const downloadBatchReport = async (id, status) => {
  try {
    const response = await http.get(
      `payout/downloadbatchUpiReport/${id}?status=${status}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createBatch = async body => {
  try {
    const response = await http.post('payout/upi/batch/upload', body, {
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

export const updateBatch = async body => {
  try {
    const response = await http.post('payout/upi/batch/update', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getErrorLog = async batchId => {
  try {
    const response = await http.get(
      `payout/upi/batch/${batchId}/download/error-log`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchEntries = async (id, queryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(
      `payout/batchUpi/entries/${id}?${queryStr}`,
    );
    return listingAdapter.from(response.batches, queryObj, {
      stats: response.stats,
    });
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchEntriesCount = async (id, queryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `payout/batchUpi/entries/${id}/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyUPIvpa = async body => {
  try {
    const response = await http.post('/verification/upi/mobile', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyUPIAdvance = async body => {
  try {
    const response = await http.post('/verification/upi/advance', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
