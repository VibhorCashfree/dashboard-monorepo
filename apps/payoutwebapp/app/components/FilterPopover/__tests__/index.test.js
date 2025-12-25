import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme } from '@cashfree-intl/coherent';

// Components
import FilterPopover from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('FilterPopover', () => {
  test('shallow render & match the snapshot', () => {
    const options = [
      { text: 'Beneficiary ID', value: 'beneId' },
      { text: 'Beneficiary Phone No.', value: 'phone' },
      { text: 'Bank A/c Number', value: 'bankAccount' },
    ];

    const filters = {};

    shallowRenderer.render(
      <FilterPopover
        searchOptions={options}
        value={filters}
        onChange={jest.fn()}
      />,
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
