import React from 'react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary as ErrorBoundaryComponent, LocalStorage } from '@cashfree-intl/coherent';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  product: string;
  team: string;
  onGlobalError?: () => void;
  additionalTags?: Record<string, string | undefined>;
}

const ErrorBoundary = ({
  children,
  fallback,
  product,
  team,
  onGlobalError,
  additionalTags = {},
}: ErrorBoundaryProps) => {
  const handleError = ({
    errMsg,
    componentStack,
    ...tags
  }: {
    errMsg: string;
    componentStack?: string;
    [key: string]: any;
  }) => {
    if (onGlobalError) {
      onGlobalError();
    }

    Sentry.captureException(errMsg, {
      tags: {
        ...tags,
        ...additionalTags,
      },
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
        product,
        team,
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
