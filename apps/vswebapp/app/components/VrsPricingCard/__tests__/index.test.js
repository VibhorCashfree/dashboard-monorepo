import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import VrsPricingCard from '..';

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

describe('VrsPricingCard', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <VrsPricingCard />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<VrsPricingCard />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText('PAN')).toBeInTheDocument();
      expect(screen.queryByText('GSTIN')).toBeInTheDocument();
    });
  });
});
