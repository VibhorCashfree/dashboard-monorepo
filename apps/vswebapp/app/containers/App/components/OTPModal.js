import React, { useState, useContext, useEffect } from 'react';
import { TwoFactorAuthModal } from '@cashfree-intl/coherent';
import moment from 'moment';
import _get from 'lodash/get';

// Services
import { validate2FA, verify2FA, sendOTP, get2FASettings } from 'services/otp';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';

// Utils
import Emitter from 'utils/emitter';
import { getInfoLabel } from '../utils';

// Constants
import { INITIAL_AUTH_INFO, MAX_LIMIT_ERROR } from 'constants/otp';

let otpCallback;
let phone;

const OTPModal = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState(INITIAL_AUTH_INFO);
  const [authSettings, setAuthSettings] = useState({});

  useEffect(() => {
    Emitter.on('VALIDATE_USER', handleOpen);

    return () => {
      Emitter.off('VALIDATE_USER');
    };
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const response = await get2FASettings();

      if (!('error' in response)) {
        setAuthSettings(response.data);
      }
    })();
  }, []);

  const handleOpen = async callback => {
    otpCallback = callback;

    const response = await validate2FA();

    if (response.status === 'SUCCESS') {
      callback();
      return;
    }

    phone = _get(response, 'error.data.phoneNumber');

    const errorType = _get(response, 'error.title');

    const errors = Object.values(MAX_LIMIT_ERROR);

    if (errors.includes(errorType)) {
      const retryAfter = _get(response, 'error.data.retryAfter');

      const currentTime = moment();
      const retryAfterTime = moment(retryAfter);

      const timerInSeconds = retryAfterTime.diff(currentTime, 'seconds');

      setAuthInfo(prev => ({
        ...prev,
        errorType,
        timerInSeconds,
      }));
    }

    setOpenAuth(true);
  };

  const handleClose = () => {
    setAuthInfo(INITIAL_AUTH_INFO);
    setOpenAuth(false);
  };

  const handleResend = async () => {
    const response = await sendOTP();

    if (response.status === 'SUCCESS') {
      setAuthInfo(INITIAL_AUTH_INFO);
      return;
    }

    const errorType = _get(response, 'error.title');

    if (errorType === MAX_LIMIT_ERROR.SEND) {
      const retryAfter = _get(response, 'error.data.retryAfter');

      const currentTime = moment();
      const retryAfterTime = moment(retryAfter);

      const timerInSeconds = retryAfterTime.diff(currentTime, 'seconds');

      setAuthInfo(prev => ({
        ...prev,
        errorType,
        timerInSeconds,
      }));
    }
  };

  const handleConfirm = async value => {
    const response = await verify2FA(value);

    if (response.status === 'SUCCESS') {
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
        type={authSettings.authType}
        infoLabel={getInfoLabel(authSettings)}
        authInfo={authInfo}
        phone={phone}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onResend={handleResend}
      />
    )
  );
};

export default OTPModal;
