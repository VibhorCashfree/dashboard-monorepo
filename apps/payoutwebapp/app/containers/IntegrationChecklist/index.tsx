import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Text } from '@cashfree-intl/coherent';

// Constants
import { ENV, LABEL_BY_ENV } from 'constants/common';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';

// Utils
import Env from 'utils/env';

// Styled
import { Divider } from 'styled/common';
import { StyledList } from './styled';

const IntegrationChecklist: React.FC = () => (
  <>
    <PageHeader>{LABEL_BY_SUBMENU[SUBMENU.INTEGRATION_CHECKLIST]}</PageHeader>
    <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.INTEGRATION_CHECKLIST]} />

    <Paper>
      <StyledList>
        <li>
          <Text color="bodyLight">
            Please ensure that you are in the &quot;
            {LABEL_BY_ENV[Env.get() as keyof typeof LABEL_BY_ENV]}
            &quot; environment, if not then change your environment from &quot;
            {LABEL_BY_ENV[Env.get() === ENV.PROD ? ENV.TEST : ENV.PROD]}&quot;
            to &quot;{LABEL_BY_ENV[Env.get() as keyof typeof LABEL_BY_ENV]}
            &quot; by clicking on the button &quot;Switch to{' '}
            {LABEL_BY_ENV[Env.get() as keyof typeof LABEL_BY_ENV]}&quot; at the
            top of the page
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            Generate API keys from the merchant dashboard under the
            &quot;Developers &gt;&gt;{' '}
            <Link
              to={`/${PATH_BY_MENU[MENU.DEVELOPERS]}/${
                PATH_BY_SUBMENU[SUBMENU.API_KEYS]
              }`}
            >
              API Keys
            </Link>
            &quot; section
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            Whitelist your IP address under the &quot;Developers &gt;&gt;{' '}
            <Link
              to={`/${PATH_BY_MENU[MENU.DEVELOPERS]}/${
                PATH_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH]
              }`}
            >
              Two-Factor Authentication
            </Link>
            &quot; section. In case you do not have a static IP, you can
            generate a public key under the &quot;Developers &gt;&gt;{' '}
            <Link
              to={`/${PATH_BY_MENU[MENU.DEVELOPERS]}/${
                PATH_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH]
              }`}
            >
              Two-Factor Authentication
            </Link>
            &quot; section. The public key will be downloaded to your computer
            and the password to access it will be your email ID registered with
            Cashfree Payments.
            <br />
            <br />
            Please note that only one Public Key can be generated at a time.
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            Hit the Authorize API from your Whitelisted IP address, OR Proceed
            by generating the x-cf-signature using the downloaded public key.
            Please refer{' '}
            <a
              href="https://www.cashfree.com/docs/api-reference/payouts/getting-started-with-payouts-apis#generate-public-key"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{' '}
            for the steps to generate the signature.
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            Upon successful Authorization token generation, Please use this
            token in headers to call the{' '}
            <a
              href="https://www.cashfree.com/docs/api-reference/payouts/v1/direct-transfer-v12"
              target="_blank"
              rel="noopener noreferrer"
            >
              Direct transfer API
            </a>
            .
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            In the case of a successful API call, you will receive a 200 subcode
            in response, this completes your &quot;
            {LABEL_BY_ENV[Env.get() as keyof typeof LABEL_BY_ENV]}
            &quot; testing.
          </Text>
        </li>
      </StyledList>

      <Divider contain />

      <Text variant="h16">Troubleshooting</Text>

      <StyledList>
        <li>
          <Text color="bodyLight">
            Share the API request and response details along with x-client-ID
            only
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            For any Dashboard related errors, share the screenshot & .har file
            of the error screen
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            Please mention the Registered email ID and environment in the mail
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            Send an e-mail to{' '}
            <a href="mailto:care@cashfree.com">care@cashfree.com</a> from your
            registered email address (or mention your registered email address
            in the mail) and cc your Account Manager.
          </Text>
        </li>
        <li>
          <Text color="bodyLight">
            If any mode is not enabled, please get in touch with your account
            manager or write to{' '}
            <a href="mailto:care@cashfree.com">care@cashfree.com</a> to enable
            the same
          </Text>
        </li>
        {!Env.isTest() && (
          <li>
            <Text color="bodyLight">
              The initial Account balance in the production environment should
              be 10 INR. To add more funds, please recharge your wallet by
              making a transfer to the virtual account details provided on the
              merchant dashboard from your registered Bank account.
              <br />
              <br />
              a. Please follow this{' '}
              <a
                href="https://www.cashfree.com/docs/payouts/payouts/fund-management/cashfree-wallet#add-funds-to-cashfree-wallet"
                target="_blank"
                rel="noopener noreferrer"
              >
                document
              </a>{' '}
              for processing recharges to your Cashfree wallet
              <br />
              b. You can view your registered bank account details under
              &quot;Accounts &gt;&gt;{' '}
              <Link to={`/${PATH_BY_MENU[MENU.ACCOUNT]}`}>
                Registered Bank Account Details
              </Link>
              &quot; section on the merchant dashboard.
            </Text>
          </li>
        )}
      </StyledList>
    </Paper>
  </>
);

export default IntegrationChecklist;
