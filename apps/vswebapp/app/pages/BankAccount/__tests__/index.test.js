import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Router, { MemoryRouter } from 'react-router-dom';

import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Services
import * as BAVService from 'services/bav';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Pages
import BankAccount from '..';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

// Utils
import pitchPage from 'utils/pitchPage';

const renderer = new ShallowRenderer();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest
  .mock('utils/pitchPage')
  .spyOn(pitchPage, 'get')
  .mockImplementation(() => ['UPI', 'PAN', 'AADHAAR', 'GSTIN']);

beforeEach(() => {
  jest.mock('services/bav');

  jest.spyOn(BAVService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1621935,
          processedOn: '2023-02-01T15:01:00+05:30',
          verificationId: 'BV1621935',
          bankAccount: '026291800001191',
          ifsc: 'YESB0000262',
          phone: '9999999999',
          nameProvided: 'JOHN DOE',
          nameAtBank: 'JOHN DOE',
          accountStatus: 'VALID',
          nameMatchScore: '100.00',
          nameMatchResult: 'DIRECT_MATCH',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BAVService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(BAVService, 'verifyBankAccount')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(BAVService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1459,
          addedOn: '2022-06-16T17:57:27+05:30',
          filename: 'bulk_bav12.csv',
          totalRecords: 1,
          valid: 1,
          invalid: 0,
          status: 'PENDING_APPROVAL',
          uploadedBy: 'Raj Nandans',
          maxApprovals: 1,
          noOfApprovals: 0,
        },
      ],
      hasNext: false,
    }),
  );

  jest
    .spyOn(BAVService, 'downloadBatchReport')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(BAVService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();

  jest
    .mock('utils/pitchPage')
    .spyOn(pitchPage, 'get')
    .mockImplementation(() => ['UPI', 'PAN', 'AADHAAR', 'GSTIN']);
});

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

describe('In BankAccount page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <BankAccount />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks BankAccount Batch', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'batch' });

    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['BAV', 'PAN', 'AADHAAR', 'GSTIN']);

    render(<BankAccount />, { wrapper: CustomWrapper });

    screen.debug(undefined, Infinity);

    await fireEvent.click(screen.queryByText(/Try Bank Account Verification/));

    expect(screen.queryByText('Uploaded At')).toBeInTheDocument();
    expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
    expect(screen.queryByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('Uploaded By')).toBeInTheDocument();
    expect(screen.queryByText('Batch')).toHaveClass('active');
    expect(screen.queryByText('All batch files are shown here.'));
  });

  test('checks BankAccount Batch', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['BAV', 'PAN', 'AADHAAR', 'GSTIN']);

    const customAccountProviderMock = {
      ...accountProviderMock,
      preferences: {
        ...accountProviderMock.preferences,
        ...{ activated: { bav: false } },
      },
    };

    const preferenceWrapper = ({ children }) => (
      <MemoryRouter initialEntries={[{ pathname: '/bav', key: 'testKey' }]}>
        <Theme>
          <MerchantContext.Provider value={merchantProviderMock}>
            <AccountContext.Provider value={customAccountProviderMock}>
              {children}
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>
    );

    render(<BankAccount />, { wrapper: preferenceWrapper });
  });

  test('checks BankAccount All', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'all' });
    render(<BankAccount />, { wrapper: CustomWrapper });

    expect(BAVService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(BAVService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('YESB0000262')).toBeInTheDocument();
      expect(screen.queryByText('026291800001191')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Bank account details and the verification statuses are shown here.',
        ),
      ).toBeInTheDocument();

      const lastTab = document.querySelector(
        '.ui.pointing.secondary.menu .item:last-child',
      );

      fireEvent.click(lastTab);
    });
  });

  test('checks BankAccount Approve-Batch', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'approve-batch' });
    render(<BankAccount />, { wrapper: CustomWrapper });

    expect(BAVService.getBatches).toHaveBeenCalledWith({
      isApprovalBatch: true,
      size: 10,
      lastId: '0',
    });
    expect(BAVService.getBatchesCount).toHaveBeenCalledWith({
      isApprovalBatch: true,
      size: 10,
      lastId: '0',
    });

    await waitFor(() => {
      expect(screen.queryByText('Raj Nandans')).toBeInTheDocument();
      expect(screen.queryByText('bulk_bav12.csv')).toBeInTheDocument();
      expect(screen.queryByText('Pending Approval')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'All batch files that are pending for approval are shown here.',
        ),
      ).toBeInTheDocument();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);

      expect(BAVService.downloadBatchReport).toHaveBeenCalledWith(
        1459,
        'PENDING_APPROVAL',
      );
    });
  });
});
