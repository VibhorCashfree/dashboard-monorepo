import React, { useState, useEffect } from 'react';
import { TwoFactorAuthModal } from '@cashfree-intl/coherent';
import moment from 'moment';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { validate2FA, verify2FA, sendOTP } from 'services/otp';

// Utils
import Emitter from 'utils/emitter';

// Helpers
import { getInfoLabel } from '../helpers';

// Constants
import { INITIAL_AUTH_INFO, MAX_LIMIT_ERROR } from '../constants';

let otpCallback: (() => void) | undefined;

const OTPModal = ({ authSettings }: { authSettings: AuthSettings['data'] }) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState(INITIAL_AUTH_INFO);

  useEffect(() => {
    Emitter.on('VALIDATE_USER', handleOpen);

    return () => {
      Emitter.off('VALIDATE_USER');
    };
  }, []);

  const handleOpen = async (callback: () => void) => {
    otpCallback = callback;

    const response = await validate2FA();

    if (!('error' in response)) {
      if (response.status === 'SUCCESS') {
        callback();
        return;
      }
    }

    const errorType = _get(response, 'error.title', '');

    const errors = Object.values(MAX_LIMIT_ERROR);

    if (errors.includes(errorType)) {
      const retryAfter = _get(response, 'error.data.retryAfter');

      const currentTime = moment();
      const retryAfterTime = moment(retryAfter);

      const timerInSeconds: number = retryAfterTime.diff(
        currentTime,
        'seconds',
      );

      setAuthInfo((prev) => ({
        ...prev,
        errorType,
        timerInSeconds,
      }));
    }

    setOpenAuth(true);
  };

  const handleClose = (): void => {
    setAuthInfo(INITIAL_AUTH_INFO);
    setOpenAuth(false);
  };

  const handleResend = async () => {
    const response = await sendOTP();

    if (!('error' in response)) {
      if (response.status === 'SUCCESS') {
        setAuthInfo(INITIAL_AUTH_INFO);
        return;
      }
    }

    const errorType = _get(response, 'error.title');

    if (errorType === MAX_LIMIT_ERROR.SEND) {
      const retryAfter = _get(response, 'error.data.retryAfter');

      const currentTime = moment();
      const retryAfterTime = moment(retryAfter);

      const timerInSeconds: number = retryAfterTime.diff(
        currentTime,
        'seconds',
      );

      setAuthInfo((prev) => ({
        ...prev,
        errorType,
        timerInSeconds,
      }));
    }
  };

  const handleConfirm = async (value: string) => {
    const response = await verify2FA(value);

    if (!('error' in response)) {
      if (response.status === 'SUCCESS') {
        otpCallback!();
        return response.status;
      }
    }
    const errorType = _get(response, 'error.title', '');

    setAuthInfo((prev) => ({
      ...prev,
      errorType,
    }));

    return (response as { error: { status: string } }).error.status;
  };

  return openAuth ? (
    <TwoFactorAuthModal
      open
      type={authSettings.authType}
      infoLabel={getInfoLabel(authSettings)}
      authInfo={authInfo}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onResend={handleResend}
    />
  ) : null;
};

export default withErrorBoundary(OTPModal);
