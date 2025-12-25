import React, { useState } from 'react';
import { Space, Text } from '@cashfree-intl/coherent';

// Constants
import { KNOW_MORE } from 'constants/urls';

// Providers
import { ListProvider } from 'providers/ListProvider';

// Containers
import Vault from 'containers/KycVault';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Styled
import { PageHeading } from 'styled/common';

const KycVault = () => (
  <ListProvider>
    <PageHeading className="m-0">1-Click Onboarding</PageHeading>
    <MetaTags title="Secure ID – 1-Click Onboarding" />
    <Space gap={0.5} alignItems="center">
      <Text color="bodyLight" className="my-1">
        Customise onboarding experiences for your business with 1-Click
        Onboarding.
      </Text>
      <a
        href="https://www.cashfree.com/docs/api-reference/vrs/v2/1-click-onboarding/1-click-onboarding-sdk"
        target="_blank"
        data-event-name="Link"
      >
        Learn more
      </a>{' '}
    </Space>

    <Vault />
  </ListProvider>
);

export default KycVault;
