import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme } from '@cashfree-intl/coherent';

// Components
import ContentLoader from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('ContentLoader', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <ContentLoader loading>
        <h3>Anything here</h3>
        <p>Some more content</p>
      </ContentLoader>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach((key) => {
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
