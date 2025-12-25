// Utils
import { arrayToObject } from 'utils/common';

// Constants
import { TOGGLE_FEATURES } from 'constants/common';

const from = (response: any) =>
  arrayToObject(response.data.toggles, 'featureName', 'value');

const to = () => ({
  toggles: TOGGLE_FEATURES.map((featureName) => ({ featureName })),
});

export default {
  from,
  to,
};
