import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ShellV2, OpenHelpCenter } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Utils
import Env from 'utils/env';

// Provider
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Constants
import { MENU_ITEMS } from './constants';

// Components
import NortificationPopover from 'components/NotificationPopover';
import NotificationBar from 'components/NotificationBar';

const BaseLayout = ({ children, onEnvSwitch }) => {
  const { accountList, activationDetails } = useContext(MerchantContext);
  const { accountInfo, setOpenSwitch } = useContext(AccountContext);

  const onLogoClick = () => {
    window.location.href = `${process.env.MERCHANT_APP_URL}/landing`;
  };

  const onHelpCenterClick = () => {
    OpenHelpCenter.redirectToHelpCenter(window.location.pathname);
  };

  return (
    <ShellV2>
      <ShellV2.GlobalHeader>
        <ShellV2.GlobalHeader.LeftContainer>
          <ShellV2.GlobalHeader.LeftContainer.Logo
            iconName="cf-compact"
            handleLogoClick={onLogoClick}
          />
          <ShellV2.GlobalHeader.LeftContainer.ProductDropdown
            isTest={Env.isTest()}
            activationDetails={activationDetails}
            accountOptions={accountList}
            selectedAccountDetails={{
              accountName: _get(accountInfo, 'name', ''),
            }}
            handleProductNameClick={() => {}}
            appEnv={`${process.env.APP_ENV}`}
            selected={{
              key: 'verification-suite',
              value: 'Secure ID',
              hasMultipleAccounts: accountList.length > 1,
            }}
            onAccountSwitchClick={() =>
              accountList.length > 1 ? setOpenSwitch(true) : undefined
            }
          />
        </ShellV2.GlobalHeader.LeftContainer>
        <ShellV2.GlobalHeader.RightContainer>
          <ShellV2.GlobalHeader.RightContainer.Buttons>
            <>
              <Button
                secondary
                size="small"
                className="btn-text fill-btn"
                onClick={() => {
                  window.location.href = `${
                    process.env.COMMON_APP_URL
                  }/developers${Env.isTest() ? `?env=test` : ''}`;
                }}
              >
                Developers
              </Button>
              <Button
                secondary
                size="small"
                className="btn-text fill-btn"
                onClick={() => {
                  onEnvSwitch();
                }}
              >
                Switch to {Env.isTest() ? 'Prod' : 'Test'}
              </Button>
            </>
          </ShellV2.GlobalHeader.RightContainer.Buttons>
          <NortificationPopover isShellV2 />
          <ShellV2.GlobalHeader.RightContainer.HelpCenter
            handleHelpCenterClick={onHelpCenterClick}
          />
          <ShellV2.GlobalHeader.RightContainer.Settings
            handleSettingsClick={() => {
              window.location.href = `${process.env.COMMON_APP_URL}/settings`;
            }}
          />
          <ShellV2.GlobalHeader.RightContainer.Profile
            hideOldNavigationSwitch
            profileMenuOptions={MENU_ITEMS}
            merchantAccountDetails={{
              accountName: _get(accountInfo, 'name', ''),
              accountEmailId: _get(accountInfo, 'email', ''),
            }}
            handleManageAccountClick={() => {
              window.location.href = `${
                process.env.COMMON_APP_URL
              }/profile/my-information`;
            }}
          />
        </ShellV2.GlobalHeader.RightContainer>
        {Env.isTest() && (
          <ShellV2.GlobalHeader.Banner.TextBanner bannerText="Test Environment" />
        )}
      </ShellV2.GlobalHeader>
      <NotificationBar />
      <ShellV2.MainLayout>{children}</ShellV2.MainLayout>
    </ShellV2>
  );
};

BaseLayout.propTypes = {
  onEnvSwitch: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
export default BaseLayout;
