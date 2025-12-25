import React, { useState, useEffect, useContext } from 'react';
import { Paper, Text, Image, Label } from '@cashfree-intl/coherent';
import _uniqBy from 'lodash/uniqBy';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Banks from 'utils/banks';

// Components
import Loader from 'components/Loader';

// Services
import { getRegisteredBankAccounts } from 'services/accounts';

// Styled
import { DetailsRow } from 'styled/common';

const RegisteredAccountDetails = () => {
  const { accountInfo, preferences } = useContext(AccountContext);

  const [data, setData] = useState();

  useEffect(() => {
    (async function fetchData() {
      const response = await getRegisteredBankAccounts();

      if (!response.error) {
        const data = [
          {
            name: accountInfo.name,
            bankAccount: accountInfo.bankAccount,
            ifsc: accountInfo.ifsc,
            bankName: accountInfo.bankname,
          },
        ].concat(response.entries);

        setData(_uniqBy(data, 'bankAccount'));
      } else {
        setData([]);
      }
    })();
  }, []);

  const isPrimary = account =>
    !preferences.isConnected && account.bankAccount === accountInfo.bankAccount;

  if (!data) {
    return <Loader />;
  }

  return data.map(account => (
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
          <Text color="bodyLight">A/c Holder’s Name</Text>
        </div>
        <div>
          <Text className="text-wrap">{account.name}</Text>
        </div>
      </DetailsRow>
      <DetailsRow className="mb-0">
        <div>
          <Text color="bodyLight">IFSC</Text>
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
  ));
};

export default RegisteredAccountDetails;
