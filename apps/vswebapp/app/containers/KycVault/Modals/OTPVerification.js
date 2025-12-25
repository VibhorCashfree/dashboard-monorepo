import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TwoFactorAuthModal, toast } from '@cashfree-intl/coherent';

// Constants
import { INITIAL_AUTH_INFO, INVALID_OTP } from '../../../constants/otp';

// Helpers
import { maskPhoneNumber } from '../helpers';

const OTPVerification = ({ onClose, onSubmit, onResend, mobileNumber }) => {
  const [authInfo, setAuthInfo] = useState(INITIAL_AUTH_INFO);

  // Mock auth settings for SMS OTP
  const authSettings = {
    authType: 'SMS',
    phone: mobileNumber,
    otpChannel: ['SMS'],
  };

  const getInfoLabel = () => (
    <>
      Enter the 6-digit OTP sent to your phone number{' '}
      <strong>{maskPhoneNumber(mobileNumber)}</strong>
    </>
  );

  const handleClose = () => {
    setAuthInfo(INITIAL_AUTH_INFO);
    onClose();
  };

  const handleConfirm = async value => {
    try {
      const response = await onSubmit(value);

      if (response && (response.status === 'SUCCESS' || response.status === 'DETAILS_NOT_FOUND')) {
        return response.status;
      }

      return 'ERROR';
    } catch (error) {
      setAuthInfo(prev => ({
        ...prev,
        errorType: INVALID_OTP,
      }));
      return 'ERROR';
    }
  };

  const handleResend = async () => {
    try {
      setAuthInfo(INITIAL_AUTH_INFO);
      await onResend();
      toast.success('OTP sent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <TwoFactorAuthModal
      open
      type={'OTP'}
      infoLabel={getInfoLabel()}
      authInfo={authInfo}
      phone={mobileNumber}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onResend={handleResend}
    />
  );
};

OTPVerification.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  mobileNumber: PropTypes.string.isRequired,
};

export default OTPVerification;
