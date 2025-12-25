import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Components
import AadhaarOCR from '..';
import Wrapper from '__tests__/components/Wrapper';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

describe('AadhaarOCR Page', () => {
  test('Render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <AadhaarOCR />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });

  test('Aadhaar OCR Summary', async () => {
    const customAccountProviderMock = {
      ...accountProviderMock,
      preferences: {
        ...accountProviderMock.preferences,
        ...{ activated: { 'aadhaar-ocr': false } },
      },
    };

    const CustomWrapper = ({ children }) => (
      <MemoryRouter
        initialEntries={[{ pathname: '/aadhaar-ocr', key: 'testKey' }]}
      >
        <Theme>
          <MerchantContext.Provider value={merchantProviderMock}>
            <AccountContext.Provider value={customAccountProviderMock}>
              {children}
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>
    );

    render(<AadhaarOCR />, { wrapper: CustomWrapper });
  });
});
