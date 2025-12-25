import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import GSTINDetails from '..';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      fromBatch: true,
      fileType: 'foo',
      rowDetails: {
        referenceId: 3891,
        id: 3891,
        legalNameOfBusiness: 'UJJIVAN SMALL FINANCE BANK LIMITED',
        taxPayerType: 'Regular',
        gstInStatus: 'Active',
        dateOfRegistration: '2017-09-30',
        verifiedAt: '2023-01-11 17:07:53',
        GSTIN: '29AAICP2912R1ZR',
        nameOfBusiness: '',
        lastUpdateDate: '2022-03-01',
        stateJurisdiction: 'GUWAHATI - A - 1',
        centerJurisdiction: 'I-A RANGE',
        constitutionOfBusiness: 'Public Limited Company',
        natureOfBusinessActivities: [
          'Retail Business',
          'Supplier of Services',
          'Recipient of Goods or Services',
          'Office / Sale Office',
          'Others',
        ],
        message: 'GSTIN Exists',
        principalPlaceAddress:
          'First Floor 3512-DISPUR Prithivi Mansion opp. KFC building G.S. Road, Lachit Nagar Assam 781007',
        additionalAddressArray: [
          {
            address:
              'Mirza Santipur NH-37 Dist-Kamrup Rural PS-Palashbari, PO  Mirza Kamrup Assam 781125',
          },
          {
            address:
              'N.A.C.C.I. Foundation 3559-Tezpur CHAMBER BHAWAN Binjraj Road, P. o. and P.S. - Tezpur, Dist. Binjraj Road, P. o. and P.S. - Tezpur, Dist. Sonitpur Assam 784154',
          },
        ],
        cancellationDate: '',
        status: 'INVALID',
      },
    },
  }),
}));

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In GSTINDetails InvalidDetails', () => {
  test('checks render', async () => {
    render(<GSTINDetails />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Invalid')).toBeInTheDocument();
    });
  });
});
