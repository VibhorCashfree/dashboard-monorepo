import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TwoFactorAuthModal } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import { sendOTP, verifyOTP } from 'services/okyc';

// Utils
import Emitter from 'utils/emitter';

// Constants
import { INITIAL_AUTH_INFO } from '../constants';

let otpCallback;
let phone;

const AadhaarOTPModal = ({ aadhaarData, validAadhaar }) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState(INITIAL_AUTH_INFO);
  const [resend, setResend] = useState({});

  const { aadhaarNo, refId } = aadhaarData;

  useEffect(() => {
    Emitter.on('VALIDATE_AADHAAR', handleOpen);

    return () => {
      Emitter.off('VALIDATE_AADHAAR');
    };
  });

  const handleOpen = async callback => {
    otpCallback = callback;

    setOpenAuth(true);
  };

  const handleClose = () => {
    setAuthInfo(INITIAL_AUTH_INFO);
    setOpenAuth(false);
  };

  const handleResend = async () => {
    const response = await sendOTP({ aadhaarNo });

    if (response.status === 'SUCCESS') {
      setAuthInfo(INITIAL_AUTH_INFO);
      setResend(response);
    }
  };

  const handleConfirm = async value => {
    const currentRefId = resend.refId || refId;
    const response = await verifyOTP({ otp: value, refId: currentRefId });

    if (response.status === 'VALID') {
      validAadhaar(response);
      otpCallback();

      return response.status;
    }

    const errorType = _get(response, 'error.title');

    setAuthInfo(prev => ({
      ...prev,
      errorType,
    }));

    return response.error.status;
  };

  return (
    openAuth && (
      <TwoFactorAuthModal
        open
        infoLabel={
          <>
            Enter the 6-digit OTP sent to your aadhaar linked phone number by
            UIDAI.
          </>
        }
        type="OTP"
        authInfo={authInfo}
        phone={phone}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onResend={handleResend}
      />
    )
  );
};

AadhaarOTPModal.propTypes = {
  aadhaarData: PropTypes.object.isRequired,
  validAadhaar: PropTypes.func.isRequired,
};

export default AadhaarOTPModal;
