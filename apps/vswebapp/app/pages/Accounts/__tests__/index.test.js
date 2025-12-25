import React from 'react';
import moment from 'moment';
import Router from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Constants
import { FORMATS } from 'constants/date';

// Services
import * as AccountsService from 'services/accounts';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import Accounts from '..';

const renderer = new ShallowRenderer();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/accounts');

  jest
    .spyOn(AccountsService, 'getRegisteredBankAccounts')
    .mockImplementation(() =>
      Promise.resolve({
        entries: [
          {
            name: 'Rohit Playground',
            bankAccount: '259620050705',
            ifsc: 'INDB0000008',
            bankName: 'Indusind bank',
          },
          {
            name: 'test',
            bankAccount: '2424274874',
            ifsc: 'ICIC0002233',
            bankName: 'ICICI',
          },
        ],
      }),
    );

  jest
    .spyOn(AccountsService, 'getRechargeBankAccounts')
    .mockImplementation(() => Promise.resolve([]));

  jest
    .spyOn(AccountsService, 'getLastRechargeDetails')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(AccountsService, 'getLowBalanceThreshold')
    .mockImplementation(() => Promise.resolve({}));
});

jest.spyOn(AccountsService, 'getStatements').mockImplementation(() =>
  Promise.resolve({
    data: [
      {
        id: 1002505070,
        txTime: '2022-11-30T18:46:02+05:30',
        eventType: 'PANDETAILS_VERIFICATION',
        maskedEventType: 'PAN Details Verification',
        event: 'DEBIT',
        amount: '0',
        remarks: 'RefId-1642658/PAN Verification',
        closingBalance: '2024306.72',
      },
    ],
    hasNext: false,
  }),
);

jest.spyOn(AccountsService, 'getStatementsCount').mockImplementation(() =>
  Promise.resolve({
    count: 1,
  }),
);

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Accounts page', () => {
  // jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'statement' });
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <Accounts />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render Information Route', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'information' });
    render(<Accounts />, { wrapper: Wrapper });

    expect(AccountsService.getRegisteredBankAccounts).toHaveBeenCalled();

    await waitFor(() => {
      expect(
        screen.queryByText('How does Accounts section help?'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Account Information')).toBeInTheDocument();
      expect(screen.queryAllByText('Raj Nandan Sharma').length).toBe(2);
      expect(
        screen.queryByText('kisley.shirish+cfmain@cashfree.com'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Koramangala')).toBeInTheDocument();
      expect(screen.queryByText('1234567890')).toBeInTheDocument();
      expect(screen.queryByText('Primary Account')).toBeInTheDocument();
      expect(screen.queryByText('INDB0000008')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Recharges will be accepted from these accounts only.',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('2424274874')).toBeInTheDocument();
      expect(screen.queryByText('care@cashfree.com')).toBeInTheDocument();
    });
  });

  test('checks render Summary Route', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'summary' });
    render(<Accounts />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(AccountsService.getRechargeBankAccounts).toHaveBeenCalledWith(
        516730,
      );
      expect(AccountsService.getLastRechargeDetails).toHaveBeenCalledWith(
        516730,
      );
      expect(AccountsService.getLowBalanceThreshold).toHaveBeenCalledWith({
        fundSourceId: 516730,
      });
    });
  });

  test('checks render Statement Route', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'statement' });
    render(<Accounts />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(AccountsService.getStatements).toHaveBeenCalledWith({
        eventType: [],
        size: 10,
        startDate: moment()
          .subtract(6, 'days')
          .startOf('day')
          .format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
        lastId: '0',
      });

      expect(AccountsService.getStatementsCount).toHaveBeenCalledWith({
        eventType: [],
        size: 10,
        startDate: moment()
          .subtract(6, 'days')
          .startOf('day')
          .format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
        lastId: '0',
      });

      const lastTab = document.querySelector(
        '.ui.pointing.secondary.menu .item:last-child',
      );

      fireEvent.click(lastTab);
    });
  });
});
