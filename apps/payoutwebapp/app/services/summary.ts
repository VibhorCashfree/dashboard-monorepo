// Utils
import http from 'utils/http';
import { getBaseURL, getQueryString } from 'utils/common';

export const getStats = async (queryObj: {
  startDate: string;
  endDate: string;
  fundSourceIds: number[];
  reportType: string;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = AnyObject;

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: `payouts/summaries?${queryStr}`,
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getSuccessRate = async (queryObj: {
  startDate: string;
  endDate: string;
  mode: string;
  fsId?: number;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      data: AnyObject[];
      status: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: `payouts/summaries/sr?${queryStr}`,
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getTransferTAT = async (queryObj: {
  startDate: string;
  endDate: string;
  mode: string;
  fsId?: number;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      data: AnyObject[];
      status: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: `payouts/summaries/tat?${queryStr}`,
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
