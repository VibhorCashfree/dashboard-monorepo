import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Services
import * as GSTINService from 'services/GSTIN';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

// Pages
import GSTIN from '..';

// Utils
import pitchPage from 'utils/pitchPage';

const renderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/GSTIN');

  jest
    .mock('utils/pitchPage')
    .spyOn(pitchPage, 'get')
    .mockImplementation(() => ['UPI', 'PAN', 'AADHAAR']);

  jest.spyOn(GSTINService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          referenceId: 3673,
          id: 3673,
          legalNameOfBusiness: 'UJJIVAN SMALL FINANCE BANK LIMITED',
          taxPayerType: 'Regular',
          gstInStatus: 'Active',
          dateOfRegistration: '2017-09-30',
          verifiedAt: '2022-12-31 15:31:55',
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
          status: 'VALID',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(GSTINService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In GSTIN page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <MemoryRouter initialEntries={[{ pathname: '/gstIn', key: 'testKey' }]}>
        <Theme>
          <MerchantContext.Provider value={merchantProviderMock}>
            <AccountContext.Provider value={accountProviderMock}>
              <GSTIN />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<GSTIN />, { wrapper: Wrapper });

    expect(GSTINService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(GSTINService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Last 7 days')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Verify GSTIN')).toBeInTheDocument();
      expect(screen.queryByText('Legal Name of Business')).toBeInTheDocument();
      expect(
        screen.queryByText('UJJIVAN SMALL FINANCE BANK LIMITED'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Regular')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(screen.queryByText('No record found')).not.toBeInTheDocument();

      expect(screen.queryByText('Learn to verify a GSTIN'));
      expect(
        screen.queryByText(
          'GSTIN and the verification statuses are shown here.',
        ),
      );
    });
  });

  test('checks render', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['GSTIN', 'PAN', 'AADHAAR']);

    render(<GSTIN />, { wrapper: Wrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Try GSTIN Verification/));
    });
  });
});
