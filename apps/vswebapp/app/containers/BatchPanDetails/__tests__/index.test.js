import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as PANService from 'services/PAN';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import BatchPanDetails from '..';

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
        id: 739,
        addedOn: '2023-01-10T12:16:25+05:30',
        filename: '2023Tue10121624780',
        totalRecords: 2,
        valid: 2,
        invalid: 0,
        uploadedBy: '',
        status: 'PROCESSED',
        maxApprovals: 0,
        noOfApprovals: 0,
      },
    },
  }),
}));

beforeEach(() => {
  jest.mock('services/PAN');

  jest.spyOn(PANService, 'getBatchStats').mockImplementation(() =>
    Promise.resolve({
      valid: 0,
      invalid: 2,
      unableToVerify: 0,
      pending: 0,
      rejected: 0,
      cancelled: 0,
      manuallyRejected: 0,
    }),
  );

  jest.spyOn(PANService, 'getBatchEntries').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          pan: 'ABCCD8000T',
          type: '',
          id: 1872424,
          nameProvided: 'Mazie',
          registeredName: '',
          fatherName: '',
          status: 'INVALID',
          statusCode: '',
          message: 'Invalid PAN',
          verifiedAt: '2023-01-10 12:16:26',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(PANService, 'getBatchEntriesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchPanDetails Container', () => {
  test('checks render', async () => {
    render(<BatchPanDetails />, { wrapper: CustomWrapper });

    expect(PANService.getBatchStats).toHaveBeenCalledWith(739);
    expect(PANService.getBatchEntries).toHaveBeenCalledWith(739, {
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(PANService.getBatchEntriesCount).toHaveBeenCalledWith(739, {
      size: 10,
      lastId: '0',
      status: [],
    });

    await waitFor(() => {
      expect(screen.queryByText('2023Tue10121624780')).toBeInTheDocument();
      expect(screen.queryByText('739')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('File ID')).toBeInTheDocument();
      expect(screen.queryByText('Processed')).toBeInTheDocument();
      expect(screen.queryByText('Registered Name')).toBeInTheDocument();
      expect(screen.queryAllByText('Invalid').length).toBe(2);
      expect(screen.queryByText('ABCCD8000T')).toBeInTheDocument();
      expect(screen.queryByText('Mazie')).toBeInTheDocument();

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

      const pendingApprovalOption = document.getElementsByName('VALID')[0];

      fireEvent.click(pendingApprovalOption);

      expect(screen.queryByText('Apply')).not.toBeDisabled();

      fireEvent.click(screen.queryByText('Apply'));

      expect(screen.queryByText(/Valid/)).toBeInTheDocument();

      fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

      fireEvent.click(screen.queryByText(/Back/));
    });
  });
});
