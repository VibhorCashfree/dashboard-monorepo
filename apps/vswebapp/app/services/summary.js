// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getStats = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(`payouts/reports/summaries?${queryStr}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
