import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Services
import * as PanService from 'services/PAN';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import PanDetails from '..';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      fromBatch: true,
      fileType: 'foo',
      rowDetails: {
        pan: 'ABCPV1234D',
        type: 'Individual',
        id: 68229,
        nameProvided: 'Timothy',
        registeredName: 'JOHN DOE',
        fatherName: '',
        status: 'VALID',
        statusCode: '',
        message: 'PAN verified successfully',
        verifiedAt: '2023-02-03 00:51:15',
      },
    },
  }),
}));

beforeEach(() => {
  jest.mock('services/PAN');

  jest.spyOn(PanService, 'getDetails').mockImplementation(() =>
    Promise.resolve({
      pan: 'ABCPV1234D',
      type: 'Individual',
      referenceId: 68229,
      nameProvided: 'Timothy',
      registeredName: 'JOHN DOE',
      fatherName: '',
      status: 'VALID',
      statusCode: '',
      message: 'PAN verified successfully',
      verifiedAt: '2023-02-03 00:51:15',
      namePanCard: '',
      aadhaarSeedingStatus: '',
      aadhaarSeedingStatusDesc: '',
      panStatus: '',
      lastUpdatedAt: '',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In PanDetails Container', () => {
  test('checks render', async () => {
    render(<PanDetails />, { wrapper: Wrapper });

    expect(PanService.getDetails).toHaveBeenCalledWith(undefined);

    await waitFor(() => {
      expect(screen.queryByText('68229')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(screen.queryByText('ABCPV1234D')).toBeInTheDocument();
      expect(screen.queryByText('Timothy')).toBeInTheDocument();
      expect(
        screen.queryByText('PAN verified successfully'),
      ).toBeInTheDocument();
    });
  });
});
