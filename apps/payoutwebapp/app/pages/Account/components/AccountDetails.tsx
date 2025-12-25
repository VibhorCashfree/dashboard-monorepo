import React from 'react';
import { Paper, Text } from '@cashfree-intl/coherent';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Styled
import { DetailsRow } from 'styled/common';

const AccountDetails = () => {
  const { accountInfo } = useAccount();

  return (
    <Paper className="mt-2">
      <DetailsRow>
        <div>
          <Text color="bodyLight">Name</Text>
        </div>
        <div>
          <Text className="text-wrap">{accountInfo.name}</Text>
        </div>
        <div>
          <Text color="bodyLight">Email ID</Text>
        </div>
        <div>
          <Text className="text-wrap">{accountInfo.email}</Text>
        </div>
      </DetailsRow>

      <DetailsRow>
        <div>
          <Text color="bodyLight">Phone Number</Text>
        </div>
        <div>
          <Text className="text-wrap">{accountInfo.phone}</Text>
        </div>
        <div>
          <Text color="bodyLight">Address</Text>
        </div>
        <div>
          <Text className="text-wrap">{accountInfo.address}</Text>
        </div>
      </DetailsRow>

      <DetailsRow className="mb-0">
        <div>
          <Text color="bodyLight">State</Text>
        </div>
        <div>
          <Text className="text-wrap">{accountInfo.state}</Text>
        </div>
        <div>
          <Text color="bodyLight">City</Text>
        </div>
        <div>
          <Text className="text-wrap">{accountInfo.city}</Text>
        </div>
      </DetailsRow>
    </Paper>
  );
};

export default AccountDetails;
