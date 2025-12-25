// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const createBatch = async body => {
  try {
    const response = await http.post('payout/bav/batch/upload', body, {
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
    const response = await http.post('payout/bav/batch/update', body);
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
      `payout/bav/batch/${batchId}/download/error-log`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyIFSC = async body => {
  try {
    const response = await http.post('payout/ifscValidation', body);
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
    const response = await http.get(`payout/validationEntries?${queryStr}`);
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
      `payout/validationEntries/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async verificationId => {
  try {
    const response = await http.get(
      `verification/bank-account/details?reference_id=${verificationId}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const verifyBankAccount = async body => {
  try {
    const response = await http.post('verification/bank-account', body);

    return response;
  } catch (error) {
    return error;
  }
};

export const getBatches = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/batchBav?${queryStr}`);
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
    const response = await http.get(`payout/batchBav/count?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchApprovalDetails = async batchId => {
  try {
    const response = await http.get(`payout/bav/batch/${batchId}/details`);
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
      `payout/batchBav/entries/${id}?${queryStr}`,
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
      `payout/batchBav/entries/${id}/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const approveBatch = async id => {
  try {
    const response = await http.post('payout/approveBatchBav', {
      action: 'APPROVE',
      id,
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const rejectBatch = async id => {
  try {
    const response = await http.post('payout/approveBatchBav', {
      action: 'REJECT',
      id,
    });
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
      `payout/downloadbatchBavReport/${id}?status=${status}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
