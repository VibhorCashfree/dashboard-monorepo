// Utils
import http from 'utils/http';
import { getBaseURL } from 'utils/common';

export const getActiveStatus = async () => {
  try {
    type Response = AnyObject;
    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'risk-platform/product/PO/status',
    });
    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const activate = async () => {
  try {
    type Response = AnyObject;

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'risk-platform/screening-flags/activate/all?product=PO',
      method: 'POST',
    });

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
