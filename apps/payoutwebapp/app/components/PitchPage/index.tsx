import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  toast,
  Button,
  Paper,
  Space,
} from '@cashfree-intl/coherent';
import classNames from 'classnames';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';

// Constants
import { ENV } from 'constants/common';
import { MODAL_TYPE } from './constants';

// Services
import {
  getPitchCardDetails,
  requestProductActivation,
} from 'services/accounts';

// Providers
import { useMerchant } from 'providers/MerchantProvider';

// Images
import bannerImage from 'images/pitch-page/banner.png';

// Components
import Modals from './components/Modals';

// Styled
import { FlexGrid } from 'styled/common';
import { StyledFeature, StyledBanner, StyledTitle } from './styled';

// Types
import type { Props } from './types';

const PitchPage = ({
  title,
  descriptions,
  product,
  features,
  activationContent,
  thumbnail,
  embedKey,
}: Props) => {
  const { merchantDetails } = useMerchant();

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [productCard, setProductCard] = useState<{
    cta: string;
    description?: string;
    docLink?: string;
    productCode: string;
    productDashboardAccess: boolean;
    productName: string;
    testEnvAccess: boolean;
    title?: string;
  }>();

  const productActivationDetails = merchantDetails.cfProductStatus.CSP;

  useEffect(() => {
    (async function fetchData() {
      const response = await getPitchCardDetails();

      if (!('error' in response)) {
        const productCard = (
          _get(response, 'data.productCards', []) || []
        ).find((productCard) => productCard.productName === product);

        if (productCard) {
          setProductCard(productCard);
        }
      }
    })();
  }, []);

  const handleActivation = async () => {
    await requestProductActivation({ productNames: [product] });

    toast.success(
      'Request for activation is successful. We will contact you for more details.',
    );

    window.location.href = `${process.env.DASHBOARD_URL}/onboarding`;
  };

  const handleClick = () => {
    if (activationContent) {
      setModalType(MODAL_TYPE.CONFIRM);
    } else {
      handleActivation();
    }
  };

  const testSwitch = () => {
    window.location.href += `?env=${ENV.TEST}`;
  };

  const status = productActivationDetails
    ? _capitalize(_startCase(productActivationDetails))
    : productCard?.cta;

  return (
    <>
      <StyledBanner $backgroundImage={bannerImage}>
        <div className="text-section">
          <Text variant="h28" color="white" className="mb-3" strong>
            {title}
          </Text>
          {descriptions.map((description) => (
            <Text
              variant="h16"
              color="white"
              className="mb-4 description"
              key={description}
            >
              {description}
            </Text>
          ))}
          <Space alignItems="center" justifyContent="start">
            <Button
              data-event-name="Primary_Button_Pitch_Page"
              className={classNames('mr-4', {
                hide: embedKey === 'PITCH_GLOBAL_PAYOUTS',
              })}
              disabled={!!productActivationDetails}
              onClick={handleClick}
            >
              <Text color="primary" strong>
                {status || 'Request Activation'}
              </Text>
            </Button>
            {productCard?.testEnvAccess ? (
              <Text
                variant="b14"
                className="pointer"
                color="white"
                onClick={testSwitch}
                strong
              >
                Try Test Environment
              </Text>
            ) : null}
          </Space>
        </div>

        {thumbnail && (
          <div className="embed-section">
            <Image
              inline
              src={thumbnail}
              className="pointer"
              onClick={() => embedKey && setModalType(MODAL_TYPE.EMBED)}
            />
          </div>
        )}
      </StyledBanner>

      <StyledTitle>How does {product} work?</StyledTitle>

      <FlexGrid gap={[2.4, 2.4]}>
        {features.map((feature) => (
          <Paper key={feature.heading}>
            <StyledFeature key={feature.heading}>
              <div className="title">{feature.heading}</div>
              <Text variant="p14" color="bodyLight">
                {feature.body}
              </Text>
            </StyledFeature>
          </Paper>
        ))}
      </FlexGrid>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          handleActivation={handleActivation}
          embedKey={embedKey}
          product={product}
          activationContent={activationContent}
        />
      )}
    </>
  );
};

export default PitchPage;
