import React from 'react';
import renderer from 'react-test-renderer';
import { Theme } from '@cashfree-intl/coherent';

// Styled
import * as StyledComponents from '../common';

describe('Common Styled checks', () => {
  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach(key => {
      const StyledComponent = StyledComponents[key];

      const tree = renderer
        .create(
          <Theme>
            <StyledComponent />
          </Theme>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
