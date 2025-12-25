import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as GSTINService from 'services/GSTIN';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import GSTIN from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/GSTIN');

  jest.spyOn(GSTINService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          referenceId: 4003,
          id: 4003,
          legalNameOfBusiness: 'UJJIVAN SMALL FINANCE BANK LIMITED',
          taxPayerType: 'Regular',
          gstInStatus: 'Active',
          dateOfRegistration: '2017-09-30',
          verifiedAt: '2023-01-20 10:18:01',
          GSTIN: '29AAICP2912R1ZR',
          nameOfBusiness: 'Cashfree',
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

describe('In GSTIN Container', () => {
  test('checks render', async () => {
    render(<GSTIN />, { wrapper: CustomWrapper });

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
      expect(screen.queryByText('29AAICP2912R1ZR')).toBeInTheDocument();
      expect(
        screen.queryByText('UJJIVAN SMALL FINANCE BANK LIMITED'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Cashfree')).toBeInTheDocument();
      expect(screen.queryByText('Regular')).toBeInTheDocument();
      expect(screen.queryByText('4003')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'GSTIN and the verification statuses are shown here.',
        ),
      ).toBeInTheDocument();

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);
      fireEvent.click(images[images.length - 2]);

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

      fireEvent.click(screen.queryByText(/Verify GSTIN/));
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest
      .spyOn(GSTINService, 'verify')
      .mockImplementation(() => Promise.resolve({ status: 'VALID' }));

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Verify GSTIN')).toBeInTheDocument();
    screen.queryByText('₹ 1.00 will be deducted from your available balance');

    const submitButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).toBeDisabled();

    const gstInput = screen.queryByPlaceholderText(/Ex. 18AABCU9603R1ZM/);
    const nameOfBusiness = screen.queryByPlaceholderText(/Name of Business/);

    await userEvent.type(gstInput, '18AABCU9603R1ZM');
    await userEvent.type(nameOfBusiness, 'Grocery');

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(GSTINService.verify).toHaveBeenCalled();

    const cancelButton = screen.queryByText('Cancel');

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest
      .spyOn(GSTINService, 'verify')
      .mockImplementation(() => Promise.resolve({ status: 'INVALID' }));

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Verify GSTIN')).toBeInTheDocument();
    screen.queryByText('₹ 1.00 will be deducted from your available balance');

    const submitButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).toBeDisabled();

    const gstInput = screen.queryByPlaceholderText(/Ex. 18AABCU9603R1ZM/);
    const nameOfBusiness = screen.queryByPlaceholderText(/Name of Business/);

    await userEvent.type(gstInput, '18AABCU9603R1ZM');
    await userEvent.type(nameOfBusiness, 'Grocery');

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(GSTINService.verify).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest
      .spyOn(GSTINService, 'verify')
      .mockImplementation(() => Promise.resolve({ status: 'FAILED' }));

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Verify GSTIN')).toBeInTheDocument();
    screen.queryByText('₹ 1.00 will be deducted from your available balance');

    const submitButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).toBeDisabled();

    const gstInput = screen.queryByPlaceholderText(/Ex. 18AABCU9603R1ZM/);
    const nameOfBusiness = screen.queryByPlaceholderText(/Name of Business/);

    await userEvent.type(gstInput, '18AABCU9603R1ZM');
    await userEvent.type(nameOfBusiness, 'Grocery');

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(GSTINService.verify).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('GSTIN is Valid')).toBeInTheDocument();
      expect(screen.queryByText('Name of Business')).toBeInTheDocument();
      expect(screen.queryByText('Tax Payer Type')).toBeInTheDocument();
      expect(screen.queryByText('GSTIN Status')).toBeInTheDocument();
      expect(screen.queryByText('Date of Registration')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Unable to Validate')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.NOT_EXIST}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('GSTIN is Invalid')).toBeInTheDocument();

      expect(screen.queryByText('GST Ref. ID')).toBeInTheDocument();
      expect(screen.queryByText('Name of Business')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
});
