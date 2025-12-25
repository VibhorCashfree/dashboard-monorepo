import _get from 'lodash/get';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';
import Env from 'utils/env';

export const requestActivation = async body => {
  try {
    const response = await http.post('payout/requestActivation', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAliasPermissions = async () => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: 'common/alias/permissions',
    });

    return _get(response, 'permissionCodes', []);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getSampleFile = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(`payout/sampleFile?${queryStr}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
