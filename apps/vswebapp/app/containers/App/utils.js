import React from 'react';
import _isEmpty from 'lodash/isEmpty';

// Images
import iciciFullLogo from 'images/brands/icici/full.svg';
import iciciCompactLogo from 'images/brands/icici/compact.svg';

// Constants
import { THEME_CONFIG, ICICI } from './constants';

const [brand] = window.location.hostname.split('.');

export const getProductItems = activationDetails => {
  const hiddenItems = [];

  if (activationDetails.CES !== 'APPROVED') {
    hiddenItems.push({
      key: 'settlements',
      visible: false,
    });
  }

  if (activationDetails.BAAS !== 'APPROVED') {
    hiddenItems.push({
      key: 'baas',
      visible: false,
    });
  }

  if (brand === ICICI) {
    hiddenItems.push(
      {
        key: 'payout',
        visible: false,
      },
      {
        key: 'settlements',
        visible: false,
      },
      {
        key: 'subscriptions',
        visible: false,
      },
      {
        key: 'verification-suite',
        visible: false,
      },
    );
  }

  return hiddenItems;
};

export const getLogos = () => {
  switch (brand) {
    case ICICI:
      return {
        fullLogo: iciciFullLogo,
        compactLogo: iciciCompactLogo,
      };

    default:
      return null;
  }
};

export const getThemeConfig = () => THEME_CONFIG[brand] || null;

export const getInfoLabel = authSettings => {
  if (_isEmpty(authSettings)) {
    return '';
  }
  if (authSettings.authType === 'G2FA') {
    return (
      <>Enter the 6-digit authentication code from your authenticator app</>
    );
  }
  if (
    authSettings.otpChannel.includes('SMS') &&
    authSettings.otpChannel.includes('EMAIL')
  ) {
    return (
      <>
        Enter the 6-digit OTP sent to your phone number{' '}
        <strong>{authSettings.phone}</strong> and email{' '}
        <strong>{authSettings.email}</strong>
      </>
    );
  }
  if (authSettings.otpChannel.includes('SMS')) {
    return (
      <>
        Enter the 6-digit OTP sent to your phone number{' '}
        <strong>{authSettings.phone}</strong>
      </>
    );
  }
  return (
    <>
      Enter the 6-digit OTP sent to your email{' '}
      <strong>{authSettings.email}</strong>
    </>
  );
};
