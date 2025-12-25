// Utils
import http from 'utils/http';
import { getBaseURL } from 'utils/common';
import { getQueryString } from 'utils/common';

// Adapters
import featureToggleAdapter from 'adapters/featureToggle';

export const requestActivation = async (body: AnyObject) => {
  try {
    const response = await http.post('payout/requestActivation', body);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getSampleFile = async (queryObj: {
  fileType: string;
  type: string;
}) => {
  const queryStr = getQueryString(queryObj);

  try {
    type Response = { fileUrl: string };

    const response: unknown = await http.get(`payout/sampleFile?${queryStr}`);

    return response as Response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getFeatureToggle = async () => {
  try {
    type Response = {
      data: {
        toggles: Array<{
          featureName: string;
          value: boolean;
        }>;
      };
    };

    const response: unknown = await http({
      baseURL: getBaseURL(true),
      url: 'common/feature-toggle',
      method: 'POST',
      data: featureToggleAdapter.to(),
    });

    return featureToggleAdapter.from(response as Response);
  } catch (error) {
    return { error };
  }
};

export const getTnC = async (tncType: string) => {
  try {
    const response = await http({
      baseURL: getBaseURL(true),
      url: 'common/merchant/tnc-list',
      method: 'POST',
      data: {
        tncNames: [tncType],
      },
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

export const acceptTnC = async (body: AnyObject) => {
  try {
    const response = await http({
      baseURL: getBaseURL(true),
      url: 'common/merchant/terms-and-conditions',
      method: 'POST',
      data: body,
    });

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
