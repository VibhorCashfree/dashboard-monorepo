import React from 'react';
import classNames from 'classnames';
import { Image, Label, Paper, Space, Text } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import Banks from 'utils/banks';

// Constants
import { BANK_CODE } from 'constants/banks';

// Types
import type { RechargeSectionProps, AccountType } from '../types';

const RechargeSection: React.FC<RechargeSectionProps> = ({ accounts }) => (
  <>
    <Text variant="h16" className="m-0 mt-3">
      Recharge Account Details
    </Text>
    <Text variant="b12" color="bodyLight" className="m-0 mt-1">
      To add funds to your Payouts A/c, transfer funds via <br /> RTGS/NEFT/IMPS
      to either of the accounts below.
    </Text>
    <Space gap={3} wrap className="mt-3">
      {accounts.map((account: AccountType) => {
        const code: string = Banks.getCode(account.ifsc);

        const idfcCheck: boolean =
          code === BANK_CODE.IDFB && account.accountNumber.startsWith('909110');

        // const rblCheck: boolean =
        //   code === BANK_CODE.RBLB &&
        //   account.accountNumber.startsWith('770210000000');

        return (
          <Paper style={{ width: 327 }} key={account.accountNumber}>
            <div className="text-right mb-1">
              <Label
                size="mini"
                color="blue"
                className={classNames({
                  invisible: !idfcCheck,
                })}
              >
                Recommended
              </Label>
            </div>

            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-2"
            >
              <Text color="bodyLight">Bank Name</Text>
              <Image width="70" src={Banks.getIcon(account.ifsc)} inline />
            </Space>
            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-2"
            >
              <Text color="bodyLight">A/c Holder&apos;s Name</Text>
              <span>Cashfree</span>
            </Space>
            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-2"
            >
              <Text color="bodyLight">A/c Number</Text>
              <span>{account.accountNumber}</span>
            </Space>
            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-2"
            >
              <Text color="bodyLight">IFSC</Text>
              <span>{account.ifsc}</span>
            </Space>
          </Paper>
        );
      })}
    </Space>
  </>
);

export default withErrorBoundary(RechargeSection);
