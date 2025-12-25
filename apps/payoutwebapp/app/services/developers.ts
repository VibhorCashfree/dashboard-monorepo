// Utils
import http from 'utils/http';
import { getBaseURL, getQueryString } from 'utils/common';

// Adapters
import developersAdapter from 'adapters/developers';
import listingAdapter from 'adapters/listing';
import apiMetricsAdapter from 'adapters/apiMetrics';

export const getAPIKeys = async (queryObj: { agent?: string }) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      activeAPIKeys: Array<{
        clientId: string;
        clientSecret: string;
        addedOn: string;
        generatedBy: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/activeAPIKeys?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getIPs = async () => {
  try {
    type Response = {
      authIPs: Array<{
        merchantIP: string;
        addedOn: string;
        isActive: number;
        isApproved: number;
        generatedBy: string;
      }>;
    };

    const response: unknown = await http.get('payout/merchantIPs');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getWebhook = async () => {
  try {
    type Response = {
      webhookUrl: string;
    };

    const response: unknown = await http.get('payout/webhook');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getWebhookVersions = async () => {
  try {
    type Response = {
      entries: Array<{
        version: string;
        releaseDate: string;
      }>;
    };

    const response: unknown = await http.get('payout/webhook/versions');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getPublicKey = async () => {
  try {
    type Response = {
      keyExists: string;
      addedOn: string;
      merchantEmail: string;
      generatedBy: string;
    };

    const response: unknown = await http.get('payout/publicKey');

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeAPIKey = async (
  clientId: string,
  queryObj: { agent?: string },
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { response: 'SUCCESS' };

    const response: unknown = await http.delete(
      `payout/apiKey/${clientId}?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeIP = async (ip: string) => {
  try {
    const response = await http.delete(`payout/merchantIP/${ip}`);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeWebhook = async () => {
  try {
    const response = await http.delete('payout/webhook');

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removePublicKey = async () => {
  try {
    const response = await http.delete('payout/publicKey');

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const addAPIKey = async (body: { agent: string }) => {
  try {
    type Response = {
      clientId: string;
      clientSecret: string;
    };

    const response: unknown = await http.post('payout/apiKey', body);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const addIPs = async (bulkIPs: string[]) => {
  try {
    const response = await http.post('payout/bulkIPs', {
      bulkIPs,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const addWebhook = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/webhook', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const testWebhook = async (body: {
  url: string;
  contentType: 'JSON';
}) => {
  try {
    type Response = {
      data: string;
      statusCode: number;
    };

    const response: unknown = await http.post('payout/webhook/test', body);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const generatePublicKey = async () => {
  try {
    type Response = string;

    const response: unknown = await http.post(
      'payout/publicKey',
      {},
      {
        responseType: 'arraybuffer',
      },
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getHistoryLog = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    type Response = {
      batches: Array<{
        id: number;
        addedOn: string;
        value: string;
        action: string;
        userName: string;
      }>;
    };

    const response: unknown = await http.get(
      `payout/authHistoryLogs?${queryStr}`,
    );

    return listingAdapter.from((response as Response).batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getHistoryLogCount = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { count: number };

    const response: unknown = await http.get(
      `payout/authHistoryLogs/count?${queryStr}`,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getHistoryLogUsers = async (queryObj: PaginationQueryObj) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      users: { userName: string }[];
    };

    const response: unknown = await http.get(
      `payout/authHistoryLogs/users?${queryStr}`,
    );
    return developersAdapter.from((response as Response).users);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getMetrics = async (body: AnyObject) => {
  try {
    const response = await http({
      baseURL: getBaseURL(false),
      url: 'payouts/api-metric',
      method: 'POST',
      data: body,
    });

    return apiMetricsAdapter.from(response.data, body.metricType);
  } catch (error) {
    return {
      error,
    };
  }
};
