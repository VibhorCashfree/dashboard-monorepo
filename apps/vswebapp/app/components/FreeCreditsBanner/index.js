import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Text, Button, Space, Image } from '@cashfree-intl/coherent';

// Actions
import fetchFreeCreditsAction from 'redux/actions/fetchFreeCredits';

// Services
import { enableFreeTrial } from 'services/accounts';

// Images
import bannerImage from 'images/pitch-page/banner.png';
import secureIcon from 'images/secured.svg';
import instantKycIcon from 'images/instant-kyc.svg';
import highAccuracyIcon from 'images/high-accuracy.svg';
import costEffectiveIcon from 'images/cost-effective.svg';

// Utils
import { formatAmount } from 'utils/common';
import Env from 'utils/env';

// Styled
import { ProductTag, StyledBanner } from 'styled/common';

const FreeCreditsBanner = ({ freeCredits, productLabel, fetchFreeCredits }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await enableFreeTrial();

    if (!response.error && response.VrsFreeTrialEnabled) {
      if (!productLabel) {
        fetchFreeCredits();
      } else {
        navigate('/home');
      }
    }
  };

  if (Env.isTest() || freeCredits.valid) {
    return null;
  }

  if (productLabel) {
    return (
      <StyledBanner $backgroundImage={bannerImage} className="p-2 mb-3">
        <Space alignItems="center" justifyContent="space-between">
          <Space gap={2} alignItems="center">
            <Image src={secureIcon} inline />
            <Text variant="h16" color="white">
              Claim your Free credits worth {formatAmount('100')} and start
              verifying {productLabel} for free.
            </Text>
          </Space>
          <Button onClick={handleClick} data-event-name="Primary_Button">
            <Text color="primary">Claim Free credits</Text>
          </Button>
        </Space>
      </StyledBanner>
    );
  }

  return (
    <StyledBanner $backgroundImage={bannerImage} className="px-4 py-3 mb-3">
      <ProductTag>Free Credits</ProductTag>
      <div className="mt-3">
        <Image inline src={secureIcon} className="mr-2" />
        <Text as="span" variant="h16" color="white">
          Congratulations! Claim free credits worth {formatAmount('100')} and
          start testing KYC services before it expires.
        </Text>
      </div>
      <Space alignItems="center" justifyContent="space-between">
        <div className="mt-3">
          <span>
            <Image inline src={instantKycIcon} className="mr-1" />
            <Text as="span" variant="h16" color="white" className="mr-4">
              Instant KYC
            </Text>
          </span>
          <span>
            <Image inline src={costEffectiveIcon} className="mr-1" />
            <Text as="span" variant="h16" color="white" className="mr-4">
              Cost Effective
            </Text>
          </span>
          <span>
            <Image inline src={highAccuracyIcon} className="mr-1" />
            <Text as="span" variant="h16" color="white" className="mr-4">
              High Accuracy
            </Text>
          </span>
        </div>
        <Button onClick={handleClick} data-event-name="Primary_Button">
          <Text color="primary">Claim Free credits</Text>
        </Button>
      </Space>
    </StyledBanner>
  );
};

FreeCreditsBanner.propTypes = {
  freeCredits: PropTypes.object.isRequired,
  productLabel: PropTypes.string,
  fetchFreeCredits: PropTypes.func.isRequired,
};

const mapStateToProps = ({ freeCredits }) => ({ freeCredits });

const mapDispatchToProps = dispatch => ({
  fetchFreeCredits: () => dispatch(fetchFreeCreditsAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(FreeCreditsBanner);
