// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getConfig = async () => {
  const response = await http.get('bulkupload/file/feature/UPI_MOBILE/config');
  return response;
};

export const getBatches = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(
      `bulkupload/file/feature/UPI_MOBILE?${queryStr}`,
    );

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
    const response = await http.get(
      `bulkupload/file/feature/UPI_MOBILE/count?${queryStr}`,
    );
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
      `bulkupload/file/feature/UPI_MOBILE/fileId/${id}/download/report?status=${status}`,
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
    const response = await http.post(
      'bulkupload/file/feature/UPI_MOBILE/upload',
      body,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      },
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateBatch = async body => {
  try {
    const response = await http.post(
      'bulkupload/file/feature/UPI_MOBILE/update',
      body,
    );
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
      `bulkupload/file/feature/UPI_MOBILE/fileId/${batchId}/download/error-log`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

// @TODO - to test and update bottom three

export const getBatchEntries = async (id, queryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(
      `bulkupload/file/feature/UPI_MOBILE/fileId/${id}/entries?${queryStr}`,
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
      `bulkupload/file/feature/UPI_MOBILE/fileId/${id}/entries/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getEntryDetails = async (fileId, referenceId) => {
  try {
    const response = await http.get(
      `bulkupload/file/feature/UPI_MOBILE/fileId/${fileId}/referenceId/${referenceId}`,
    );
    return response?.data;
  } catch (error) {
    return {
      error,
    };
  }
};
