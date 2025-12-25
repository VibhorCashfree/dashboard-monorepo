import React from 'react';
import { Text } from '@cashfree-intl/coherent';

// Constants
import { REGION } from 'constants/common';
import { KNOW_MORE } from 'constants/urls';
import { MENU, LABEL_BY_MENU } from 'constants/menuItems';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Alert from 'components/Alert';
import RegionBasedRenderer from 'components/RegionBasedRenderer';
import RegisteredAccountDetails from './components/RegisteredAccountDetails';
import AccountDetails from './components/AccountDetails';

const Account = () => (
  <>
    <PageHeader embedKey="ACCOUNT">{LABEL_BY_MENU[MENU.ACCOUNT]}</PageHeader>
    <MetaTags title={LABEL_BY_MENU[MENU.ACCOUNT]} />

    <Text variant="h16" className="m-0 mt-3">
      Account Details
    </Text>
    <AccountDetails />
    <RegionBasedRenderer regions={[REGION.IN]}>
      <Text variant="h16" className="mt-3 mb-2">
        Registered Bank Account Details
      </Text>
      <Alert className="mb-2" type="warning" bordered rounded>
        <Alert.Content size="md">
          Recharges will be accepted from the below bank accounts only. Write to{' '}
          <a href="mailto:care@cashfree.com">care@cashfree.com</a> to register
          your bank details. <br />
          Any recharges made from other accounts will be refunded to the source
          account within 7 business days.{' '}
          <a
            href={KNOW_MORE.ACCOUNT.REGISTERED}
            target="_blank"
            rel="noopener noreferrer"
            data-event-name="Link"
            className="link"
          >
            Know more
          </a>{' '}
        </Alert.Content>
      </Alert>
      <RegisteredAccountDetails />
    </RegionBasedRenderer>
  </>
);

export default withReadPermission(Account, {
  code: 2800,
  description: `access ${LABEL_BY_MENU[MENU.ACCOUNT]}`,
});
