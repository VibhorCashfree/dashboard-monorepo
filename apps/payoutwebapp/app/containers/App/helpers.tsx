import React from 'react';
import _isEmpty from 'lodash/isEmpty';

export const getInfoLabel = (authSettings: AuthSettings['data']) => {
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
