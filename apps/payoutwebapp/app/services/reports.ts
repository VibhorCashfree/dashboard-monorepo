// Utils
import http from 'utils/http';
import { getBaseURL, getQueryString } from 'utils/common';

export const getReportTypes = async () => {
  try {
    type Response = {
      reportTypes: string[];
    };

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: 'payouts/reports/type',
    });

    return (response as Response).reportTypes;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getAll = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      entries: Array<{
        id: string;
        type: string;
        reportName: string;
        size: number;
        addedOn: string;
        generatedBy: string;
        status: string;
        format: string;
      }>;
      size: number;
      num: number;
      total: number;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: `payouts/reports/list?${queryStr}`,
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const generateReport = async (body: AnyObject) => {
  try {
    type Response = { message: string };

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: 'payouts/reports',
      method: 'POST',
      data: body,
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const downloadReport = async (id: string) => {
  try {
    type Response = {
      id: string;
      url: string;
    };

    const response: unknown = await http({
      baseURL: getBaseURL(false),
      url: `payouts/reports/${id}`,
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteReport = async (id: string) => {
  try {
    const response = await http({
      baseURL: getBaseURL(false),
      url: `payouts/reports/${id}`,
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
