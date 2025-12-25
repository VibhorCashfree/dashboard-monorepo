import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme } from '@cashfree-intl/coherent';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

// Components
import Wrapper from '__tests__/components/Wrapper';
import FundSourceBalanceCard from '..';

// Utils
import { getBalanceMeta } from '../utils';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

const data = {
  fundSourceId: 101,
  fsType: 'CONNECTED',
  fsDisplayType: 'PAYTM_WALLET',
  paymentInstrumentId: 'PYTM_102',
  displayName: 'PYTM_102',
  fsDescription: 'This is a test fund source',
  accountHolderName: 'Cashfree Payout',
  isDefault: false,
  isPayoutWallet: false,
  isMainAccount: false,
  bankAccount: 'PAYTM',
  ifsc: 'PYTM0123456',
  cfBankId: 0,
  cfBankName: 'PAYTM_FS',
  connBankName: 'PAYTM_FS',
  cfBankType: '',
  cfCredId: 75,
  cfGatewayId: 28,
  preferences: [],
  fsBalance: {
    balance: '100',
    availableBalance: '0',
    fundsOnHold: '0',
    overdraft: '0',
    lastUpdated: '',
  },
  supportedModes: ['paytm'],
  status: 'DEACTIVATED',
  addedOn: '2020-08-12T18:41:45+05:30',
};

describe('FundSourceBalanceCard', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <FundSourceBalanceCard fundSource={data} />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('getBalanceMeta()', () => {
    expect(
      getBalanceMeta({
        fsDisplayType: data.fsDisplayType,
        isConnected: data.fsType === 'CONNECTED',
        accountHolderName: data.accountHolderName,
        data: data.fsBalance,
      }),
    ).toStrictEqual({
      'Account Name': 'Cashfree Payout',
    });

    expect(
      getBalanceMeta({
        fsDisplayType: data.fsDisplayType,
        isConnected: false,
        accountHolderName: data.accountHolderName,
        data: data.fsBalance,
      }),
    ).toStrictEqual({});

    expect(
      getBalanceMeta({
        fsDisplayType: FS_DISPLAY_TYPE.CASHFREE_WALLET,
        isConnected: data.fsType === 'CONNECTED',
        accountHolderName: data.accountHolderName,
        data: data.fsBalance,
      }),
    ).toStrictEqual({
      'Account Balance': '₹ 100.00',
      'Funds on Hold': '₹ 0.00',
      'Overdraft Balance': '₹ 0.00',
    });

    expect(
      getBalanceMeta({
        fsDisplayType: FS_DISPLAY_TYPE.CONNECTED_WALLET,
        isConnected: data.fsType === 'CONNECTED',
        accountHolderName: data.accountHolderName,
        data: data.fsBalance,
      }),
    ).toStrictEqual({
      'Account Balance': '₹ 100.00',
      'Funds on Hold': '₹ 0.00',
    });
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach((key) => {
      const StyledComponent = StyledComponents[key];

      const tree = renderer
        .create(
          <Theme>
            <StyledComponent />
          </Theme>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
