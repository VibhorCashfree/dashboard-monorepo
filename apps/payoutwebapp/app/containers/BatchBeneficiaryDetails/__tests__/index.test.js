import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as BeneficiariesService from 'services/beneficiaries';

// Utils
import Analytics from 'utils/analytics';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import BatchBeneficiaryDetails from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      batchRowDetails: {
        name: 'filename.csv',
        id: 1234,
        status: 'REJECTED',
        total: 1,
        addedOn: '2022-09-01T14:46:59',
        valid: 0,
        invalid: 1,
        uploadedBy: 'mehul',
      },
    },
  }),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/beneficiaries');

  jest.spyOn(BeneficiariesService, 'getBatchStats').mockImplementation(() =>
    Promise.resolve({
      success: 0,
      failed: 0,
      invalid: 1,
      total: 1,
      cancelled: 0,
      initiated: 0,
    }),
  );

  jest.spyOn(BeneficiariesService, 'getBatchEntries').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          name: 'john doe',
          phone: '9876543210',
          bankAccount: '1111222233',
          ifsc: 'HDFC0000001',
          vpa: 'johndoe@hdfcbank',
          addedOn: '2022-09-01T14:46:59',
          beneId: 'johndoe180122',
          id: 265152416,
          status: 'INVALID',
        },
      ],
      hasNext: false,
    }),
  );

  jest
    .spyOn(BeneficiariesService, 'getBatchEntriesCount')
    .mockImplementation(() =>
      Promise.resolve({
        count: 1,
      }),
    );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchBeneficiaryDetails Container', () => {
  test('checks render', async () => {
    render(<BatchBeneficiaryDetails />, { wrapper: CustomWrapper });

    expect(BeneficiariesService.getBatchStats).toHaveBeenCalledWith(1234);
    expect(BeneficiariesService.getBatchEntries).toHaveBeenCalledWith(1234, {
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(BeneficiariesService.getBatchEntriesCount).toHaveBeenCalledWith(
      1234,
      {
        size: 10,
        lastId: '0',
        status: [],
      },
    );

    await waitFor(() => {
      expect(screen.queryByText('mehul')).toBeInTheDocument();
      expect(screen.queryByText('1234')).toBeInTheDocument();
      expect(screen.queryByText('9876543210')).toBeInTheDocument();
      expect(screen.queryByText('Rejected')).toBeInTheDocument();
      expect(screen.queryByText('HDFC0000001')).toBeInTheDocument();
      expect(screen.queryByText('johndoe@hdfcbank')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<BatchBeneficiaryDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('INVALID')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.BENEFICIARIES],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
        filters: { INVALID: true },
        search_by: 'beneId',
      }),
    );

    expect(screen.queryAllByText(/Invalid/).length).toBe(2);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(7);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('back button is functional', async () => {
    render(<BatchBeneficiaryDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('checks Row click', async () => {
    render(<BatchBeneficiaryDetails />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.BENEFICIARIES]}/265152416/details`,
      {
        state: {
          rowDetails: {
            name: 'john doe',
            phone: '9876543210',
            bankAccount: '1111222233',
            ifsc: 'HDFC0000001',
            vpa: 'johndoe@hdfcbank',
            addedOn: '2022-09-01T14:46:59',
            beneId: 'johndoe180122',
            id: 265152416,
            status: 'INVALID',
          },
          fromBatch: true,
        },
      },
    );
  });
});
