import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import OKYCDetails from '..';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      fromBatch: true,
      fileType: 'foo',
      rowDetails: {
        status: 'VALID',
        message: 'Aadhaar Card Exists',
        careOf: 'S/O: Fakkirappa Dollin',
        address:
          'Shri Kanaka Nilaya,,Umashankar Nagar 1st Main 5th Cross,Ranebennur,Haveri-Karnataka,India',
        dob: '02-02-1995',
        email: '',
        gender: 'M',
        name: 'Mallesh Fakkirappa Dollin',
        splitAddress: {
          country: 'India',
          dist: 'Haveri',
          house: 'Shri Kanaka Nilaya',
          landmark: '',
          pincode: '581115',
          po: 'Ranebennur',
          state: 'Karnataka',
          street: 'Umashankar Nagar 1st Main 5th Cross',
          subdist: 'Ranibennur',
          vtc: 'Ranibennur',
        },
        yearOfBirth: '',
        refId: '3264',
        id: 3264,
        serviceCharge: '0',
        serviceTax: '0',
        gateway: '',
        processedOn: '2023-02-01 00:52:09',
        aadhaarReference: '',
        mobileHash: 'ed189eb73247cb90b769e7e8d7dfd2',
        photoLink: '',
      },
    },
  }),
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In OKYCDetails Container', () => {
  test('checks render', async () => {
    render(<OKYCDetails />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('02-02-1995')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(screen.queryByText('3264')).toBeInTheDocument();
      expect(screen.queryByText('Karnataka')).toBeInTheDocument();
      expect(screen.queryByText(/Umashankar Nagar/)).toBeInTheDocument();
      expect(screen.queryByText('S/O: Fakkirappa Dollin')).toBeInTheDocument();
      expect(screen.queryByText('Aadhaar Card Exists')).toBeInTheDocument();
    });
  });
});
