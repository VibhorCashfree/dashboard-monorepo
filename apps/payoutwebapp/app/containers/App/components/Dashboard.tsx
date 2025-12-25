import React, { useState, useEffect } from 'react';
import { Image } from '@cashfree-intl/coherent';
import moment from 'moment';
import 'moment-timezone';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Images
import logoIcon from 'images/pitch-page/logos/payout.svg';
import thumbnail from 'images/pitch-page/thumbnails/payout-pitch.png';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Services
import { get2FASettings } from 'services/accounts';

// Constants
import { REGION } from 'constants/common';
import { descriptions, features } from '../constants';

// Components
import MetaTags from 'components/MetaTags';
import PitchPage from 'components/PitchPage';
import AppRoutes from './AppRoutes';
import OTPModal from './OTPModal';
import AccountSwitcherModal from './AccountSwitcherModal';

// Utils
import Env from 'utils/env';
import Region from 'utils/region';

const Dashboard: React.FC = () => {
  const { merchantDetails, accountList } = useMerchant();
  const { accountConfig } = useAccount();

  const [authSettings, setAuthSettings] = useState<AnyObject>();

  useEffect(() => {
    (async function fetchData() {
      const response = await get2FASettings();

      if (!('error' in response)) {
        setAuthSettings(response.data);
      }
    })();
  }, []);

  // Set default timezone if accountConfig.timezone is defined
  if (Region.get() === REGION.AE && accountConfig.Timezone) {
    moment.tz.setDefault(accountConfig.Timezone);
  }

  if (
    !Env.isTest() &&
    (merchantDetails.cfProductStatus.CSP !== 'APPROVED' ||
      _size(accountList) === 0)
  ) {
    return (
      <div className="p-4">
        <MetaTags title="Payouts" />
        <PitchPage
          title={
            <>
              <Image
                inline
                className="mr-1 mb-1"
                width="24"
                height="24"
                src={logoIcon}
              />{' '}
              Payouts
            </>
          }
          product="Payouts"
          descriptions={descriptions}
          features={features}
          thumbnail={thumbnail}
          embedKey="PITCH_SUMMARY"
        />
      </div>
    );
  }

  return (
    <>
      <AppRoutes />
      <OTPModal authSettings={authSettings} />
      <AccountSwitcherModal />
    </>
  );
};

export default withErrorBoundary(Dashboard);
