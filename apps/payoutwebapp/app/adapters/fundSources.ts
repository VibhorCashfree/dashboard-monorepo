// Utils
import { arrayToObject } from 'utils/common';

type Response = any;

const from = (response: Response[]) =>
  response.map((fundSource: Response) => {
    const preferences = arrayToObject(
      fundSource.preferences,
      'property',
      'value',
    );

    return {
      ...fundSource,
      preferences,
    };
  });

export default {
  from,
};
