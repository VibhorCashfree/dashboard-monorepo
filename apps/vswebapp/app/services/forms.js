// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import AccountId from 'utils/accountId';
import { getPGGrowthURL, getQueryString } from 'utils/common';

export const createBatch = async body => {
  try {
    const response = await http.post('payout/form/bulk/upload', body, {
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

export const getBatches = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/form/bulk?${queryStr}`);

    return listingAdapter.from(response.batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getBatchesCount = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/form/bulk/count?${queryStr}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateBatch = async body => {
  try {
    const response = await http.post('payout/form/bulk/update', body);
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
      `payout/form/bulk/${id}/download/report?status=${status}`,
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
      `payout/form/bulk/${batchId}/download/error-log`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getFormTheme = async () => {
  try {
    const response = await http({
      // TODO: remove after API fixed in KONG
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `/dynamic-forms/theme?productType=VRS_FORM`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const postFormTheme = async body => {
  try {
    const response = await http({
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'POST',
      baseURL: getPGGrowthURL(),
      url: `/dynamic-forms/theme?productType=VRS_FORM`,
      data: body,
    });

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
    const response = await http.get(`payout/form/entries?${queryStr}`);

    const res = listingAdapter.from(response.batches, queryObj);

    return res;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllCount = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`payout/form/entries/count?${queryStr}`);

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
      `payout/form/bulk/${id}/entries?${queryStr}`,
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
      `payout/form/bulk/${id}/entries/count?${queryStr}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDetails = async id => {
  try {
    const response = await http.get(`payout/form/detail?referenceId=${id}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getVerificationDetails = async verification => {
  try {
    const response = await http.get(
      `payout/form/product/detail?referenceId=${
        verification.referenceId
      }&verificationType=${verification.verificationType}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const sendKycForm = async formObj => {
  try {
    const response = await http.post(`payout/form/bulk/upload`, formObj, {
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

export const sendKycLink = async formObj => {
  try {
    const response = await http.post(`payout/form`, formObj);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getJourney = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http({
      // TODO: remove after API fixed in KONG
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `/dynamic-forms/templates?${queryStr}`,
    });

    return listingAdapter.from(response.data, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getJourneyCount = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http({
      // TODO: remove after API fixed in KONG
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `/dynamic-forms/templates/count?${queryStr}`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getJourneyList = async () => {
  try {
    const response = await http({
      // TODO: remove after API fixed in KONG
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `dynamic-forms/templates?productType=VRS_FORM&status=PUBLISHED`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDefaultJourneyList = async () => {
  try {
    const response = await http({
      // TODO: remove after API fixed in KONG
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `dynamic-forms/templates?productType=VRS_FORM&status=PUBLISHED&defaultTemplate=true`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteJourney = async id => {
  try {
    const response = await http({
      // TODO: remove after API fixed in KONG
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'DELETE',
      baseURL: getPGGrowthURL(),
      url: `dynamic-forms/templates/${id}?productType=VRS_FORM`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const publishJourney = async payload => {
  try {
    const response = await http({
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'POST',
      baseURL: getPGGrowthURL(),
      url: `dynamic-forms/templates/orchestrate?productType=VRS_FORM`,
      data: payload,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getWorkFlowJson = async draftId => {
  try {
    const response = await http({
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `dynamic-forms/templates/drafts/${draftId}?productType=VRS_FORM`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getDefaultWorkflow = async draftId => {
  try {
    const response = await http({
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'GET',
      baseURL: getPGGrowthURL(),
      url: `dynamic-forms/templates/drafts/${draftId}?productType=VRS_FORM&defaultTemplate=true`,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const postWorkFlowJson = async payload => {
  try {
    const response = await http({
      headers: {
        'X-Payout-Account-Id': AccountId.get(),
      },
      method: 'POST',
      baseURL: getPGGrowthURL(),
      url: 'dynamic-forms/templates/drafts?productType=VRS_FORM',
      data: payload,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
