// Utils
import * as utils from 'utils/common';

// Constants
import { TOGGLE_FEATURES } from 'constants/common';

// Adapters
import featureToggle from '../featureToggle';

const { from, to } = featureToggle;

describe('featureToggle adapters', () => {
  describe('from()', () => {
    test('should transform response data to an object', () => {
      const mockResponse = {
        data: {
          toggles: [
            { featureName: 'feature1', value: true },
            { featureName: 'feature2', value: false },
          ],
        },
      };

      const expectedResult = {
        feature1: true,
        feature2: false,
      };

      jest.spyOn(utils, 'arrayToObject').mockReturnValue(expectedResult);

      expect(from(mockResponse)).toEqual(expectedResult);
      expect(utils.arrayToObject).toHaveBeenCalledWith(
        mockResponse.data.toggles,
        'featureName',
        'value',
      );
    });
  });

  describe('to()', () => {
    test('should transform TOGGLE_FEATURES to an object with featureName', () => {
      expect(to()).toEqual({
        toggles: TOGGLE_FEATURES.map((featureName) => ({ featureName })),
      });
    });
  });
});
