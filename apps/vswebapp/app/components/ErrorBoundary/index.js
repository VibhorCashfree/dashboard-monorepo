import React from 'react';
import { ErrorBoundary as ErrorBoundaryComponent } from '@cashfree-intl/coherent';
import * as Sentry from '@sentry/react';

// Utils
import { LocalStorage } from '@cashfree-intl/coherent';

const ErrorBoundary = ({ children, fallback }) => {
  const handleError = ({ errMsg, componentStack, ...tags }) => {
    Sentry.captureException(errMsg, {
      tags,
      contexts: {
        react: {
          componentStack,
        },
      },
    });
  };

  return (
    <ErrorBoundaryComponent
      onError={handleError}
      fallback={fallback}
      customErrorConfig={{
        product: 'VRS',
        team: 'FP',
        merchantId: LocalStorage.getItemFromLocalStorage('merchantId'),
        accountId: LocalStorage.getItemFromLocalStorage('accountId'),
        env: LocalStorage.getItemFromLocalStorage('env'),
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;
