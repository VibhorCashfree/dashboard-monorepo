import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import Wrapper from '__tests__/components/Wrapper';
import FundSourceBalanceCard from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('FundSourceBalanceCard', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <FundSourceBalanceCard paymentInstrumentId="foo" />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<FundSourceBalanceCard paymentInstrumentId="foo" />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText('foo')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Unable to show the balance currently. Refresh after some time.',
        ),
      ).toBeInTheDocument();
    });
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
