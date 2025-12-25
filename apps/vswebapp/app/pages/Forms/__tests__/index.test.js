import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Services
import * as FormsService from 'services/forms';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

// Pages
import Forms from '..';

// Utils
import pitchPage from 'utils/pitchPage';

const renderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/forms');

  jest
    .mock('utils/pitchPage')
    .spyOn(pitchPage, 'get')
    .mockImplementation(() => ['UPI', 'PAN', 'AADHAAR']);

  jest.spyOn(FormsService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 46,
          addedOn: '2023-09-10 00:51:48',
          filename: 'test 999.csv',
          totalRecords: 9997,
          valid: 18,
          invalid: 9979,
          expired: 0,
          unableToValidate: 0,
          status: 'PENDING',
          uploadedBy: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(FormsService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Forms page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <MemoryRouter initialEntries={[{ pathname: '/forms', key: 'testKey' }]}>
        <Theme>
          <MerchantContext.Provider value={merchantProviderMock}>
            <AccountContext.Provider value={accountProviderMock}>
              <Forms />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['FORMS', 'PAN', 'AADHAAR']);

    render(<Forms />, { wrapper: Wrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Try KYC Link/));
    });
  });
});
