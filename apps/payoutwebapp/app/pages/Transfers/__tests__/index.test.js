import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as TransfersService from 'services/transfers';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Pages
import Transfers from '..';

const renderer = new ShallowRenderer();

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/batch' }]}>
    <Theme>
      <MerchantContext.Provider value={mockMerchantProvider}>
        <AccountContext.Provider value={mockAccountProvider}>
          <ListProvider>
            <BatchDetailsProvider>{children}</BatchDetailsProvider>
          </ListProvider>
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

beforeEach(() => {
  jest.mock('services/transfers');

  jest.spyOn(TransfersService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          fileName: 'filename.csv',
          id: 1234,
          status: 'PENDING_APPROVAL',
          countTransfers: 3,
          addedOn: '2021-11-24T14:35:56+05:30',
          valid: 3,
          invalid: 0,
          uploadedBy: 'mehul',
          approvalCount: 0,
          totalApprovalCount: 1,
          fileType: 'CFTRANSFER_ACCOUNT',
          totalAmount: '6',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(TransfersService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Transfers page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <Transfers />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks Transfers', async () => {
    render(<Transfers />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(screen.queryByText('Uploaded At')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Invalid')).toBeInTheDocument();
      expect(screen.queryByText('Uploaded By')).toBeInTheDocument();
      expect(screen.queryByText('Last 7 days')).toBeInTheDocument();
      expect(
        screen.queryByText('How to make a Batch Transfer?'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('All batch files and transfers are shown here.'),
      );
    });
  });

  test('checks Filters', async () => {
    render(<Transfers />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(screen.queryByText(/Last 7 days/));
    fireEvent.click(screen.queryByText(/Last Month/));

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('PENDING_APPROVAL')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(screen.queryAllByText(/Pending Approval/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(8);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });
});
