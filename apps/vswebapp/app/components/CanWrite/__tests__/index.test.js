import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme } from '@cashfree-intl/coherent';

// Components
import Wrapper from '__tests__/components/Wrapper';
import CanWrite from '..';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';

// Mocks
import { merchantProviderMock } from '__mocks__/common.mock';

// Utils
import Env from 'utils/env';
import { store } from '__tests__/utils';

const renderer = new ShallowRenderer();

const customMerchantProviderValue = {
  ...merchantProviderMock,
  ...{
    activationDetails: {
      ...merchantProviderMock.activationDetails,
      userType: 'MERCHANT_ALIAS',
    },
  },
};

const CustomWrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
    <Provider store={store}>
      <Theme>
        <MerchantContext.Provider value={customMerchantProviderValue}>
          {children}
        </MerchantContext.Provider>
      </Theme>
    </Provider>
  </MemoryRouter>
);

describe('CanWrite', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <CanWrite code={21002}>
          <div>Some content</div>
        </CanWrite>
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Hide Content', () => {
    jest
      .mock('utils/env')
      .spyOn(Env, 'isTest')
      .mockImplementation(() => false);

    render(
      <CustomWrapper>
        <CanWrite code={232423} remove>
          <div>Some content</div>
        </CanWrite>
      </CustomWrapper>,
    );

    expect(screen.getByTestId('can-write')).toHaveClass('hide');
  });
});
