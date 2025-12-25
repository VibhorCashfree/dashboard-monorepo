// Adapters
import notificationsAdapter from 'adapters/notifications';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';
import Env from 'utils/env';

import Token from 'utils/token';

export const getCategories = async queryObj => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.get(
      `payout/settings/emailNotifications?${queryStr}`,
    );
    return notificationsAdapter.from(response.settings);
  } catch (error) {
    return {
      error,
    };
  }
};

export const addNewRecipient = async (queryObj, body) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.post(
      `payout/settings/emailNotifications?${queryStr}`,
      body,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const removeRecipient = async (queryObj, body) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.delete(
      `payout/settings/emailNotifications/recipient?${queryStr}`,
      { data: body },
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const toggleCategory = async (queryObj, body) => {
  const queryStr = getQueryString(queryObj);

  try {
    const response = await http.post(
      `payout/settings/emailNotifications/toggle?${queryStr}`,
      body,
    );
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getNotificationTypes = async () => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: 'common/notifications/notificationTypes',
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getNotificationDetails = async (notificationId, accountId) => {
  try {
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/notificationTypes/${notificationId}/preferences`,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateNotificationStatus = async (data, accountId) => {
  try {
    const response = await http({
      method: 'PUT',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/subscriptions/status`,
      data,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getNotificationUpdatedData = async (queryObj, accountId) => {
  try {
    const queryParams = getQueryString(queryObj);
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/subscriptions/status?${queryParams}`,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const resendApprovalEmail = async data => {
  try {
    const response = await http({
      method: 'POST',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/v2/user/resend/comms-consent-email`,
      data,
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteNotificationEmail = async (
  notificationId,
  subscriptionId,
  channelId,
  queryObj,
  accountId,
) => {
  try {
    const queryParams = getQueryString(queryObj);
    const response = await http({
      method: 'DELETE',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/notificationTypes/${notificationId}/subscriptions/${subscriptionId}/channels/${channelId}?${queryParams}`,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getUserNotificationDetails = async (queryObj, accountId) => {
  try {
    const queryParams = getQueryString(queryObj);
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/preferences?${queryParams}`,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getNotificationTabGroupsStatus = async (queryObj, accountId) => {
  try {
    const queryParams = getQueryString(queryObj);
    const response = await http({
      method: 'GET',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/subscriptions/status?${queryParams}`,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateNotificationPreferences = async (data, accountId) => {
  try {
    const response = await http({
      method: 'POST',
      baseURL: Env.isTest()
        ? process.env.TEST_COMMON_API_URL
        : process.env.COMMON_API_URL,
      url: `common/notifications/preferences`,
      data,
      headers: {
        Authorization: `Bearer ${Token.get()}`,
        'API-VERSION': '2021-02-02',
        'X-Receiver-Id': accountId,
      },
    });
    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
