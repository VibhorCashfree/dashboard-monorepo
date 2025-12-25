import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme } from '@cashfree-intl/coherent';

// Components
import StatusLabel from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('StatusLabel', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(<StatusLabel>SELF_WITHDRAWAL</StatusLabel>);

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

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
