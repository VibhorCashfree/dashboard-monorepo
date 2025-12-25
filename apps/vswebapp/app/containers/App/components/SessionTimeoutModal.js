import React, { useState, useEffect } from 'react';
import { LogOutModal, useInactivity } from '@cashfree-intl/coherent';

// Services
import { logout, refreshToken } from 'services/accounts';

// Utils
import Emitter from 'utils/emitter';

const SessionTimeoutModal = () => {
  const { isActive, reset } = useInactivity();
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    Emitter.on('TOKEN_EXPIRED', () => {
      setTokenExpired(true);
    });

    return () => {
      Emitter.off('TOKEN_EXPIRED'); // Cleanup
    };
  }, []);

  const handleLogout = () => {
    logout();
    setTokenExpired(false);
  };

  const handleStayLoggedIn = async () => {
    if (tokenExpired) {
      const response = await refreshToken();

      if (!response.error) {
        window.location.href = process.env.LEGACY_APP;
      } else {
        handleLogout();
      }
    } else {
      reset();
    }
  };

  const open = !isActive || tokenExpired;

  return (
    open && (
      <LogOutModal
        open={open}
        onLogOut={handleLogout}
        onStayLoggedIn={handleStayLoggedIn}
        modalTitle={
          tokenExpired
            ? 'Hi, Your session has timed out. Would you like to stay logged in?'
            : 'Hi, It seems kind of quiet. Are you still there?'
        }
      />
    )
  );
};

export default SessionTimeoutModal;
