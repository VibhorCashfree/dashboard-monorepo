import React, { useState, useEffect } from 'react';
import { Loader, Paper, Text, Image, Label } from '@cashfree-intl/coherent';
import _uniqBy from 'lodash/uniqBy';

// Constants
import { REGION } from 'constants/common';

// Components
import RegionBasedRenderer from 'components/RegionBasedRenderer';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import Banks from 'utils/banks';

// Services
import { getRegisteredBankAccounts } from 'services/accounts';

// Styled
import { DetailsRow } from 'styled/common';

// Types
import type { AccountType } from '../types';

const RegisteredAccountDetails = () => {
  const { accountInfo, preferences } = useAccount();

  const [data, setData] = useState<AccountType[]>();

  useEffect(() => {
    (async function fetchData() {
      const response = await getRegisteredBankAccounts();

      let data = [
        {
          name: accountInfo.name,
          bankAccount: accountInfo.bankAccount,
          ifsc: accountInfo.ifsc,
          bankName: accountInfo.bankname,
        },
      ];

      if (!('error' in response)) {
        data = data.concat(response.entries);
      }

      setData(_uniqBy(data, 'bankAccount'));
    })();
  }, []);

  const isPrimary = (account: {
    name: string;
    bankAccount: string;
    ifsc: string;
    bankName: string;
  }) =>
    !preferences.isConnected && account.bankAccount === accountInfo.bankAccount;

  if (!data) {
    return <Loader active />;
  }

  return (
    <>
      {data.map((account) => (
        <Paper key={account.bankAccount} className="mb-1">
          {isPrimary(account) && (
            <div className="mb-4">
              <Label size="mini" className="ml-0">
                Primary Account
              </Label>
              <Text as="span" variant="b12" color="bodyLight" className="ml-1">
                *Self Withdrawal will be processed to this account
              </Text>
            </div>
          )}

          <DetailsRow>
            <div>
              <Text color="bodyLight">Bank Name </Text>
            </div>
            <div>
              <Image width="70" src={Banks.getIcon(account.ifsc)} inline />
            </div>
            <div>
              <Text color="bodyLight">A/c Holder&apos;s Name</Text>
            </div>
            <div>
              <Text className="text-wrap">{account.name}</Text>
            </div>
          </DetailsRow>
          <DetailsRow className="mb-0">
            <div>
              <RegionBasedRenderer regions={[REGION.AE]}>
                <Text color="bodyLight">SWIFT Code</Text>
              </RegionBasedRenderer>
              <RegionBasedRenderer regions={[REGION.IN]}>
                <Text color="bodyLight">IFSC</Text>
              </RegionBasedRenderer>
            </div>
            <div>
              <Text className="text-wrap">{account.ifsc}</Text>
            </div>
            <div>
              <Text color="bodyLight">A/c Number</Text>
            </div>
            <div>
              <Text className="text-wrap">{account.bankAccount}</Text>
            </div>
          </DetailsRow>
        </Paper>
      ))}
    </>
  );
};

export default RegisteredAccountDetails;
