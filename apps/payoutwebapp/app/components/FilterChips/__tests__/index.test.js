import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme } from '@cashfree-intl/coherent';

// Components
import FilterChips from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('FilterChips', () => {
  test('shallow render & match the snapshot', () => {
    const chips = [
      { key: 1, text: 'Ford' },
      { key: 2, text: 'Maruti' },
      { key: 3, text: 'Honda' },
    ];

    shallowRenderer.render(<FilterChips chips={chips} onRemove={jest.fn()} />);

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
