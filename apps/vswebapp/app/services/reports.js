// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getReportTypes = async () => {
  try {
    const response = await http.get('payouts/reports/type');

    return response.reportTypes;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getReports = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(`payouts/reports/list?${queryStr}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const generateReport = async body => {
  try {
    const response = await http.post('payouts/reports', { ...body });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const downloadReport = async id => {
  try {
    const response = await http.get(`payouts/reports/${id}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteReport = async id => {
  try {
    const response = await http.delete(`payouts/reports/${id}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
