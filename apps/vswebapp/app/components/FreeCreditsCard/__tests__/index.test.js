import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import FreeCreditsCard from '..';

// Utils
import Env from 'utils/env';
import { store } from '__tests__/utils';

const shallowRenderer = new ShallowRenderer();

beforeEach(() => {
  jest
    .mock('utils/env')
    .spyOn(Env, 'isTest')
    .mockImplementation(() => false);

  store.dispatch({
    type: 'FETCH_FREE_CREDITS',
    payload: { amount: '2.13', valid: true },
  });
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('FreeCreditsCard', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <FreeCreditsCard />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<FreeCreditsCard />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText('2.13')).toBeInTheDocument();
      expect(
        screen.queryByText('Use the trial balance to test KYC services.'),
      ).toBeInTheDocument();
      expect(screen.queryByText('PAN')).toBeInTheDocument();
      expect(screen.queryByText('GSTIN')).toBeInTheDocument();
    });
  });
});
