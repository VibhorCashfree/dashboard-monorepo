import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Space, Text, Image } from '@cashfree-intl/coherent';

// Constants
import { BANK_CODES } from 'constants/banks';

// Utils
import Banks from 'utils/banks';

const RechargeSection = ({ accounts }) => (
  <>
    <Text variant="h16" className="m-0 mt-3">
      Recharge Account Details
    </Text>
    <Text variant="b12" color="bodyLight" className="m-0 mt-1">
      To add funds to your Payouts A/c, transfer funds via <br /> RTGS/NEFT/IMPS
      to either of the accounts below.
    </Text>
    <Space gap={3} wrap className="mt-3">
      {accounts.map(account => {
        const code = Banks.getCode(account.ifsc);

        const idfcCheck =
          code === BANK_CODES.IDFB &&
          account.accountNumber.startsWith('909110');

        const rblCheck =
          code === BANK_CODES.RBLB &&
          account.accountNumber.startsWith('770210000000');

        const newTag = idfcCheck || rblCheck;

        if (!newTag) {
          return;
        }

        return (
          <Paper style={{ width: 327 }} key={account.accountNumber}>
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

RechargeSection.propTypes = {
  accounts: PropTypes.array,
};

export default RechargeSection;
