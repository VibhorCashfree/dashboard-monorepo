import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Componentw
import Wrapper from '__tests__/components/Wrapper';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Services
import * as OKYCService from 'services/okyc';

// Mocks
import {
  accountProviderMock,
  merchantProviderMock,
} from '__mocks__/common.mock';

// Pages
import OKYC from '..';

// Utils
import pitchPage from 'utils/pitchPage';

const renderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/okyc');

  jest
    .mock('utils/pitchPage')
    .spyOn(pitchPage, 'get')
    .mockImplementation(() => ['UPI', 'PAN', 'GSTIN']);

  jest.spyOn(OKYCService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
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
          refId: '3244',
          id: 3244,
          serviceCharge: '0',
          serviceTax: '0',
          gateway: '',
          processedOn: '2023-01-31 00:51:46',
          aadhaarReference: '',
          mobileHash: 'ed189eb73247cb90b769e7e8d7dfd2',
          photoLink: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(OKYCService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In OKYC page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <MemoryRouter initialEntries={[{ pathname: '/okyc', key: 'testKey' }]}>
        <Theme>
          <MerchantContext.Provider value={merchantProviderMock}>
            <AccountContext.Provider value={accountProviderMock}>
              <OKYC />
            </AccountContext.Provider>
          </MerchantContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<OKYC />, { wrapper: Wrapper });

    expect(OKYCService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(OKYCService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Last 7 days')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Verify Aadhaar')).toBeInTheDocument();
      expect(screen.queryByText('Verification ID')).toBeInTheDocument();
      expect(
        screen.queryByText('Mallesh Fakkirappa Dollin'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Karnataka')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(screen.queryByText('No record found')).not.toBeInTheDocument();

      expect(screen.queryByText('How to verify an OKYC Number?'));
      expect(
        screen.queryByText(
          'Aadhaar and the verification statuses are shown here.',
        ),
      );
    });
  });

  test('checks render', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['AADHAAR', 'PAN', 'AADHAAR']);

    render(<OKYC />, { wrapper: Wrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Try Aadhaar Verification/));
    });
  });
});
