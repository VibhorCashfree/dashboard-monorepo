import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import Wrapper from '__tests__/components/Wrapper';
import EmptyTableView from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('EmptyTableView', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <EmptyTableView />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<EmptyTableView />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('No data found!')).toBeInTheDocument();
    });
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
