import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Space,
  Button,
  Image,
  Conditional,
  Text,
  toast,
} from '@cashfree-intl/coherent';

// Services
import { getActiveStatus, activate } from 'services/payoutProtect';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Images
import payoutProtectLogo from 'images/payout-protect-logo.svg';

// Styled
import { StyledBannerBackground } from '../styled';

// Constants
import { MENU, PATH_BY_MENU } from 'constants/menuItems';

// Types
import { activeStatusType } from '../types';

const PayoutProtectBanner = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<activeStatusType>();
  const [freeTrialActivationLoader, setFreeTrialActivationLoader] =
    useState(false);

  const fetchActiveStatus = async () => {
    const status = await getActiveStatus();
    setActiveStatus(status);
  };

  useEffect(() => {
    fetchActiveStatus();
  }, []);

  const handleLearnMoreRedirection = () => {
    navigate(`/${PATH_BY_MENU[MENU.RISK_SHIELD]}`);
  };

  const handleFreeTrialActivation = async () => {
    setFreeTrialActivationLoader(true);
    await activate();

    fetchActiveStatus();

    setFreeTrialActivationLoader(false);

    toast.success('Congratulations, Payout Protect free trial is now active');
  };

  const showBanner =
    !activeStatus?.isActive &&
    !activeStatus?.isFreeTrialActive &&
    !activeStatus?.freeTrialExpiryDate;

  return (
    <Conditional if={showBanner}>
      <StyledBannerBackground className="py-2 mb-2">
        <Space gap={2}>
          <Image src={payoutProtectLogo} width={36} height={36} />
          <Text
            strong
            variant="h16"
            color="white"
            style={{ lineHeight: '24px' }}
          >
            Save your business from payout fraud{' '}
            <Text as="span" variant="h20" color="white">
              Try Payout Protect for 30 days
            </Text>
            <Button
              link
              onClick={handleLearnMoreRedirection}
              data-event-name="learn_more_payout_protect_banner_from_payouts"
            >
              <Text color="white" style={{ textDecoration: 'underline' }}>
                Learn more
              </Text>
            </Button>
          </Text>
          <Space justifyContent="flex-end" style={{ flex: 1 }}>
            <Button
              secondary
              onClick={handleFreeTrialActivation}
              data-event-name="try_for_free_payout_protect_banner"
              loading={freeTrialActivationLoader}
              style={{ backgroundColor: 'white', minWidth: '8.5rem' }}
            >
              Try now for free
            </Button>
          </Space>
        </Space>
      </StyledBannerBackground>
    </Conditional>
  );
};

export default withErrorBoundary(PayoutProtectBanner);
