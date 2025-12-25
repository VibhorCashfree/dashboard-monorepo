// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

// Adapters
import usersList from 'adapters/developers';
import listingAdapter from 'adapters/listing';
import apiMetricsAdapter from 'adapters/apiMetrics';

export const getAPIKeys = async () => {
  try {
    const response = await http.get('payout/activeAPIKeys');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getIPs = async () => {
  try {
    const response = await http.get('payout/merchantIPs');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getPublicKey = async () => {
  try {
    const response = await http.get('payout/publicKey');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeAPIKey = async clientId => {
  try {
    const response = await http.delete(`payout/apiKey/${clientId}`);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeIP = async ip => {
  try {
    const response = await http.delete(`payout/merchantIP/${ip}`);
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

export const addAPIKey = async () => {
  try {
    const response = await http.post('payout/apiKey');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const addIPs = async bulkIPs => {
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

export const generatePublicKey = async () => {
  try {
    const response = await http.post(
      'payout/publicKey',
      {},
      {
        responseType: 'arraybuffer',
      },
    );

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const get2FAMethod = async () => {
  try {
    const response = await http.get('payout/merchantPreference');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const update2FAMethod = async body => {
  try {
    const response = await http.patch('payout/merchantPreference', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getHistoryLog = async queryObj => {
  const queryStr = getQueryString(listingAdapter.to(queryObj));

  try {
    const response = await http.get(`/payout/authHistoryLogs?${queryStr}`);
    return listingAdapter.from(response.batches, queryObj);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getHistoryLogCount = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `/payout/authHistoryLogs/count?${queryStr}`,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getHistoryLogUsers = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `/payout/authHistoryLogs/users?${queryStr}`,
    );
    return usersList(response.users);
  } catch (error) {
    return {
      error,
    };
  }
};

export const getWebhook = async () => {
  try {
    const response = await http.get('payout/webhook?isBavWebhook=true');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const addWebhook = async body => {
  try {
    const response = await http.post('payout/webhook', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const testWebhook = async body => {
  try {
    const response = await http.post('payout/webhook/test', body);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeWebhook = async () => {
  try {
    const response = await http.delete('payout/webhook?isBavWebhook=true');
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getMetrics = async body => {
  try {
    const response = await http.post('/verification/api-metric', body);

    return apiMetricsAdapter.from(response.data, body.metricType);
  } catch (error) {
    return {
      error,
    };
  }
};
