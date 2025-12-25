// Adapters
import notificationsAdapter from 'adapters/notifications';

// Utils
import http from 'utils/http';
import { getQueryString } from 'utils/common';

export const getCategories = async (queryObj: {
  selectedAccountId: number;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      settings: Array<{
        notifType: string;
        notifSubType: string;
        name: string;
        description: string;
        enabled: boolean;
        recipients: Array<string>;
      }>;
    };

    const response: unknown = await http.get(
      `payout/settings/emailNotifications?${queryStr}`,
    );

    return notificationsAdapter.from((response as Response).settings);
  } catch (error) {
    return {
      error,
    };
  }
};

export const addNewRecipient = async (
  queryObj: {
    selectedAccountId: number | undefined;
  },
  body: {
    product: string;
    notifType: string[];
    notifSubType: string[];
    recipients: string[];
  },
) => {
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

export const removeRecipient = async (
  queryObj: { selectedAccountId: number | undefined },
  body: {
    product: string;
    notifType: any;
    notifSubType: any;
    recipient: string;
  },
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      status: string;
      message: string;
    };

    const response: unknown = await http.delete(
      `payout/settings/emailNotifications/recipient?${queryStr}`,
      { data: body },
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const toggleCategory = async (
  queryObj: { selectedAccountId: number | undefined },
  body: AnyObject,
) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = {
      status: string;
      message: string;
    };

    const response: unknown = await http.post(
      `payout/settings/emailNotifications/toggle?${queryStr}`,
      body,
    );

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};
