// Adapters
import listingAdapter from 'adapters/listing';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getRole = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(
      `verification/vkyc/agent-auditor/entries?${queryStr}`,
    );

    return listingAdapter.from(response.batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRoleCount = async queryObj => {
  const queryStr = getQueryString(queryObj);
  try {
    const response = await http.get(
      `verification/vkyc/agent-auditor/entries/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getRoleStatus = async queryObj => {
  const queryStr = getQueryString(queryObj);
  try {
    const response = await http.get(
      `verification/vkyc/agent-auditor/status-count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const enableRole = async queryObj => {
  try {
    const response = await http.post(
      'verification/vkyc/agent-auditor/enable-disable',
      queryObj,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createRole = async queryObj => {
  try {
    const response = await http.post(
      'verification/vkyc/agent-auditor',
      queryObj,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteRole = async payload => {
  try {
    const response = await http.delete(`verification/vkyc/agent-auditor`, {
      data: payload,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllVerification = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(
      `verification/vkyc/all-verification/entries?${queryStr}`,
    );

    return listingAdapter.from(response.batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllVerificationCount = async queryObj => {
  const queryStr = getQueryString(queryObj);
  try {
    const response = await http.get(
      `verification/vkyc/all-verification/entries/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAllVerificationStatus = async queryObj => {
  const queryStr = getQueryString(queryObj);
  try {
    const response = await http.get(
      `verification/vkyc/all-verification/status-count?${queryStr}`,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const createVKYCLink = async queryObj => {
  try {
    const response = await http.post(
      'verification/vkyc/initiate-vkyc',
      queryObj,
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getVideoKycDetails = async id => {
  try {
    const response = await http.get(`verification/vkyc/details/${id}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
