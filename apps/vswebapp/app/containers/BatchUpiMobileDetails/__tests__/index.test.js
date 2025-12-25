import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as UPIService from 'services/UPI';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import BatchUpiDetails from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      batchRowDetails: {
        id: 112828,
        addedOn: '2023-01-27T09:32:11+05:30',
        filename: 'fafsafasfa',
        totalRecords: 2,
        valid: 0,
        invalid: 0,
        status: 'SUCCESS',
        uploadedBy: '',
        maxApprovals: 0,
        noOfApprovals: 0,
      },
      toBeApproved: true,
    },
    key: '3223',
  }),
}));

beforeEach(() => {
  jest.mock('services/UPI');

  jest.spyOn(UPIService, 'getBatchEntries').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 463237698,
          processedOn: '2023-01-27T09:32:12+05:30',
          verificationId: 'BV463237698',
          nameProvided: 'Ajeet Makvana',
          nameAtBank: 'AJEET MAKVANA',
          accountStatus: 'VALID',
          nameMatchScore: '',
          nameMatchResult: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(UPIService, 'getBatchEntriesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchUpiDetails Container', () => {
  test('checks render', async () => {
    render(<BatchUpiDetails />, { wrapper: CustomWrapper });

    expect(UPIService.getBatchEntries).toHaveBeenCalledWith(112828, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(UPIService.getBatchEntriesCount).toHaveBeenCalledWith(112828, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });

    await waitFor(() => {
      expect(screen.queryByText('fafsafasfa')).toBeInTheDocument();
      expect(screen.queryByText('Success')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Ajeet Makvana')).toBeInTheDocument();

      fireEvent.click(screen.queryByText(/Back/));

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      document.querySelector('tbody tr').click();

      const searchFilter = screen.queryByText(/Search & Filter/);

      fireEvent.click(searchFilter);

      expect(screen.queryByText('Apply')).toBeDisabled();

      const pendingApprovalOption = document.getElementsByName('INVALID')[0];

      fireEvent.click(pendingApprovalOption);

      expect(screen.queryByText('Apply')).not.toBeDisabled();

      fireEvent.click(screen.queryByText('Apply'));

      expect(screen.queryByText(/Invalid/)).toBeInTheDocument();

      fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);
    });
  });
});
