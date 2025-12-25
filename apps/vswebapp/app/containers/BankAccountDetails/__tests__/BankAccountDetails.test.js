import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Components
import BankAccountDetails from '..';

import Wrapper from '__tests__/components/Wrapper';

// Services
import * as BAVservice from 'services/bav';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      rowDetails: {
        accountStatus: 'UNABLE_TO_VALIDATE',
        bankAccount: '12345678910',
        id: '2006969',
        ifsc: 'SBIN0000001',
        nameAtBank: '',
        nameMatchResult: '',
        nameMatchScore: '',
        nameProvided: 'John Doe',
        phone: '9999999999',
        processedOn: '2023-04-21T16:03:26+05:30',
        verificationId: 'BV2006969',
        vpa: '',
      },
    },
  }),
}));

beforeEach(() => {
  jest.mock('services/bav');

  jest.spyOn(BAVservice, 'getDetails').mockImplementation(() =>
    Promise.resolve({
      nameProvided: 'John Doe',
      phone: '9999999999',
      bankAccount: '12345678910',
      ifsc: 'SBIN0000001',
      nameAtBank: '',
      bankName: 'STATE BANK OF INDIA',
      branch: 'KOLKATA MAIN',
      city: 'KOLKATA',
      micr: 0,
      utr: '',
      amountSent: '0',
      processedOn: '2023-04-21T16:03:26+05:30',
      accountStatus: 'FAILED_AT_BANK',
      reason: 'Verification attempt failed',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

const renderer = new ShallowRenderer();

describe('BankAccountDetails', () => {
  test('shallow render & match the snapshot', () => {
    render(<BankAccountDetails />, { wrapper: Wrapper });

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('should render the API response', async () => {
    render(<BankAccountDetails />, { wrapper: Wrapper });

    expect(BAVservice.getDetails).toHaveBeenCalledWith(undefined);

    await waitFor(() => {
      expect(screen.queryByText('Details Provided')).toBeInTheDocument();
      expect(screen.queryByText('Bank A/c No.')).toBeInTheDocument();
      expect(screen.queryByText('Verification Details')).toBeInTheDocument();

      fireEvent.click(screen.queryByText(/Back/));
    });
  });
});
