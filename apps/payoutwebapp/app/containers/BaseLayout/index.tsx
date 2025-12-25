import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShellV2, Button, OpenHelpCenter } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Components
import NotificationPopover from 'components/NotificationPopover';
import NotificationBar from 'components/NotificationBar';
import RegionBasedRenderer from 'components/RegionBasedRenderer';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Utils
import { getQueryString } from 'utils/common';
import getQuery from 'utils/getQuery';
import Env from 'utils/env';
import Region from 'utils/region';
import { getProductRoute } from './utils';

// Constants
import { ENV, LABEL_BY_ENV, REGION, USER_TYPE } from 'constants/common';
import { menuItems } from './constants';

// Types
import type { BaseLayoutProps } from './types';

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { merchantDetails, accountList } = useMerchant();
  const { accountInfo, accountConfig, setOpenSwitch } = useAccount();

  const query = getQuery();
  const [env, setEnv] = useState(() => query.get('env'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!env) {
      return;
    }

    Env.set(env);

    const productCode = query.get('productCode');

    window.location.href = getProductRoute(productCode);
  }, [env]);

  const handleEnvSwitch = (): void => {
    const newEnv = Env.get() === ENV.PROD ? ENV.TEST : ENV.PROD;

    navigate({
      search: `?env=${newEnv}`,
    });

    setEnv(newEnv);
  };

  const redirectToProduct = ({ key }: { key: string }): void => {
    const queryStr = getQueryString({ env: Env.get() });

    switch (key) {
      case 'landing':
        if (Region.get() === REGION.AE) {
          window.location.href = `${process.env.DASHBOARD_URL}${process.env.PUBLIC_PATH}summary`;
        } else {
          window.location.href = `${process.env.DASHBOARD_URL}/${
            process.env.MERCHANT_APP_BASE_PATH
          }/landing?env=${Env.isTest() ? ENV.TEST : ENV.PROD}`;
        }
        break;

      case 'profile':
      case 'developers':
      case 'settings':
        window.location.href = `${process.env.DASHBOARD_URL}/${process.env.COMMON_APP_BASE_PATH}/${key}?${queryStr}`;
        break;
    }
  };

  if (env) {
    return null;
  }

  const envLabel: string =
    LABEL_BY_ENV[Env.get() === ENV.PROD ? ENV.TEST : ENV.PROD];

  const onHelpCenterClick = () => {
    OpenHelpCenter.redirectToHelpCenter(window.location.pathname);
  };
  return (
    <ShellV2>
      <ShellV2.GlobalHeader>
        <ShellV2.GlobalHeader.LeftContainer>
          <ShellV2.GlobalHeader.LeftContainer.Logo
            iconName="cf-compact"
            handleLogoClick={() => redirectToProduct({ key: 'landing' })}
          />
          <ShellV2.GlobalHeader.LeftContainer.ProductDropdown
            isTest={Env.isTest()}
            activationDetails={merchantDetails.cfProductStatus}
            accountOptions={accountList}
            selectedAccountDetails={{
              accountName: _get(accountInfo, ['name'], 'Choose Account'),
            }}
            handleProductNameClick={() => {}}
            appEnv={process.env.APP_ENV}
            selected={{
              key: 'payout',
              value: 'Payouts',
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
                data-event-name="Secondary_Button"
                secondary
                size="small"
                className="btn-text fill-btn"
                onClick={() => redirectToProduct({ key: 'developers' })}
              >
                Developers
              </Button>
              <RegionBasedRenderer regions={[REGION.IN]}>
                <Button
                  data-event-name="Secondary_Button"
                  secondary
                  size="small"
                  className="btn-text fill-btn"
                  onClick={handleEnvSwitch}
                >
                  Switch to {envLabel}
                </Button>
              </RegionBasedRenderer>
            </>
          </ShellV2.GlobalHeader.RightContainer.Buttons>

          <NotificationPopover />
          <ShellV2.GlobalHeader.RightContainer.HelpCenter
            handleHelpCenterClick={onHelpCenterClick}
          />

          <ShellV2.GlobalHeader.RightContainer.Settings
            handleSettingsClick={() => redirectToProduct({ key: 'settings' })}
          />
          {accountConfig ? (
            <ShellV2.GlobalHeader.RightContainer.Profile
              hideOldNavigationSwitch={true}
              profileMenuOptions={menuItems}
              merchantAccountDetails={
                merchantDetails.userType === USER_TYPE.MERCHANT_ALIAS
                  ? {
                      accountName: merchantDetails.name,
                      accountEmailId: merchantDetails.aliasEmail || '–',
                    }
                  : {
                      accountName: accountConfig.MerchantName,
                      accountEmailId: accountConfig.MerchantEmail,
                    }
              }
              handleManageAccountClick={() =>
                redirectToProduct({ key: 'profile' })
              }
            />
          ) : null}
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

export default BaseLayout;
