import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as CashgramsService from 'services/cashgrams';

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
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import VerifyBeneficiary from '..';

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
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/cashgrams');

  jest
    .spyOn(CashgramsService, 'getVerifyBeneficiaries')
    .mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: 5873680,
            cashgramId: 'VIMOB4370',
            amount: '100',
            name: 'foo',
            nameAtBank: 'bar',
            addedOn: '2022-11-16T13:03:33+05:30',
            phone: '9765556171',
            cashgram: 'https://cg.cashfree.com/wln6qou',
            updatedOn: '2022-12-17T00:00:00+05:30',
          },
        ],
        hasNext: false,
      }),
    );

  jest
    .spyOn(CashgramsService, 'getVerifyBeneficiariesCount')
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

describe('In VerifyBeneficiary Container', () => {
  test('checks render', async () => {
    render(<VerifyBeneficiary />, { wrapper: CustomWrapper });

    expect(CashgramsService.getVerifyBeneficiaries).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );
    expect(CashgramsService.getVerifyBeneficiariesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('foo')).toBeInTheDocument();
      expect(screen.queryByText('VIMOB4370')).toBeInTheDocument();
      expect(screen.queryByText('9765556171')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Showing all cashgrams including batch cashgrams for approval.',
        ),
      ).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<VerifyBeneficiary />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(Analytics.track).toHaveBeenCalledWith(EVENTS.CHANGE_PAGE_LIMIT, {
      size: '25',
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(screen.queryByText(/Last 7 days/));
    fireEvent.click(screen.queryByText(/Last Month/));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.DATE_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.CASHGRAMS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(8);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.VERIFY}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={handleAction}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Verify Cashgrams')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to verify the selected cashgrams?',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Verify',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(handleAction).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REJECT}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={handleAction}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Reject Cashgrams')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to reject the selected cashgrams?',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Reject',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(handleAction).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.VERIFIED}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Cashgrams Verified Successfully'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REJECTED}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Cashgrams Rejected')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Row click', async () => {
    render(<VerifyBeneficiary />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.CASHGRAMS]}/5873680/details`,
      {
        state: {
          rowDetails: {
            id: 5873680,
            cashgramId: 'VIMOB4370',
            amount: '100',
            name: 'foo',
            nameAtBank: 'bar',
            addedOn: '2022-11-16T13:03:33+05:30',
            phone: '9765556171',
            cashgram: 'https://cg.cashfree.com/wln6qou',
            updatedOn: '2022-12-17T00:00:00+05:30',
          },
        },
      },
    );
  });
});
