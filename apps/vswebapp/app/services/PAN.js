// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const createBatch = async body => {
  try {
    const response = await http.post('verification/pan/batch', body, {
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
    const response = await http.patch('verification/pan/batch/update', body);
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
      `verification/pan/batch/${batchId}/download/error-log`,
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
    const response = await http.get(`verification/pan?${queryStr}`);
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
    const response = await http.get(`verification/pan/count?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async verificationId => {
  try {
    const response = await http.get(`verification/pan/${verificationId}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verify = async body => {
  try {
    const response = await http.post('verification/pan', body);
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
    const response = await http.get(`verification/pan/batch?${queryStr}`);
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
    const response = await http.get(`verification/pan/batch/count?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchEntries = async (cfBulkVerificationId, queryObj) => {
  const queryStr = getQueryString(
    listingAdapter.to({ ...queryObj, cfBulkVerificationId }),
  );

  try {
    const response = await http.get(`verification/pan?${queryStr}`);
    return listingAdapter.from(response.entries, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchEntriesCount = async (cfBulkVerificationId, queryObj) => {
  const queryStr = getQueryString({ ...queryObj, cfBulkVerificationId });

  try {
    const response = await http.get(`verification/pan/count?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const downloadBatchReport = async id => {
  try {
    const response = await http.get(`verification/pan/batch/${id}/report`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchStats = async id => {
  try {
    const response = await http.get(`verification/pan/batch/${id}/stats`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyOcr = async body => {
  try {
    const response = await http.post('verification/ocr/pan', body, {
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

export const verifyPANAdvance = async body => {
  try {
    const response = await http.post('verification/pan/advance', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyPANGstin = async body => {
  try {
    const response = await http.post('verification/pan-gstin', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
