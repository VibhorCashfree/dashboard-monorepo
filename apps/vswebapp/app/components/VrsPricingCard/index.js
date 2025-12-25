import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Space, Text, Popup, Image } from '@cashfree-intl/coherent';

// Components
import SummaryCard from 'components/SummaryCard';

// Constants
import { MERCHANT_TO_HIDE, STATUS_CODES_PRICING } from './constants';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { MerchantContext } from 'providers/MerchantProvider';

// Icons
import cashfreeIcon from 'images/cashfree.svg';

// Utils
import Env from 'utils/env';
import { formatAmount } from 'utils/common';

// Styled
import { StyledIcon } from './styled';

export const VrsPricingCard = ({ freeCredits }) => {
  const { freeCreditRates } = useContext(AccountContext);
  const { activationDetails } = useContext(MerchantContext);

  if (Env.isTest() || !freeCredits.valid) {
    return null;
  }
  const showRates = !MERCHANT_TO_HIDE.includes(activationDetails.merchantId);

  const pricingStatusCode = product => (
    <Popup
      content={
        <>
          <Text className="mb-1">
            You will be charged for the following status codes:
          </Text>
          {STATUS_CODES_PRICING[product].map(data => (
            <Text variant="b12" color="success">
              <li className="mb-1">200 ( {data} ) </li>
            </Text>
          ))}
        </>
      }
      trigger={
        <span>
          <StyledIcon name="info" className="pointer" />
        </span>
      }
    />
  );

  return (
    showRates && (
      <SummaryCard>
        <SummaryCard.Header>
          <div>
            <Text variant="h16">VRS PRICING</Text>
          </div>
          <Image width="70" src={cashfreeIcon} inline />
        </SummaryCard.Header>
        <SummaryCard.Content>
          <Space direction="column" gap={1}>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                BAV
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.BANKDETAILS_VALIDATION)}
                {pricingStatusCode('BAV')}
              </Space>
            </Space>

            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                UPI Mobile
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.UPI_MOBILE_V)}
                {pricingStatusCode('UPI_MOBILE')}
              </Space>
            </Space>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                UPI
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.UPIDETAILS_VALIDATION)}
                {pricingStatusCode('UPI')}
              </Space>
            </Space>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                Aadhaar
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.OFFLINE_AADHAAR_VERIFICATION)}
                {pricingStatusCode('AADHAAR')}
              </Space>
            </Space>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                Aadhaar OCR
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.AADHAAR_OCR_V)}
                {pricingStatusCode('AADHAAR_OCR')}
              </Space>
            </Space>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                PAN
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.PANDETAILS_VERIFICATION)}
                {pricingStatusCode('PAN')}
              </Space>
            </Space>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                PAN OCR
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.PAN_OCR_V)}
                {pricingStatusCode('PAN_OCR')}
              </Space>
            </Space>
            <Space justifyContent="space-between" alignItems="center">
              <Text variant="b14" color="bodyLight">
                GSTIN
              </Text>
              <Space justifyContent="center" alignItems="center" gap={1}>
                {formatAmount(freeCreditRates.GSTIN_VERIFICATION)}
                {pricingStatusCode('GSTIN')}
              </Space>
            </Space>
          </Space>
        </SummaryCard.Content>
      </SummaryCard>
    )
  );
};

VrsPricingCard.propTypes = {
  freeCredits: PropTypes.object.isRequired,
};

const mapStateToProps = ({ freeCredits }) => ({ freeCredits });

const withConnect = connect(mapStateToProps);

export default withConnect(VrsPricingCard);
