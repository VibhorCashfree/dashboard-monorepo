import React from 'react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary as ErrorBoundaryComponent } from '@cashfree-intl/coherent';

// Utils
import { LocalStorage } from '@cashfree-intl/coherent';

// Constants
import { INTERNAL_SERVER_ERROR } from 'constants/errors';

// Components
import Alert from 'components/Alert';

// Utils
import Emitter from 'utils/emitter';

// Types
import type { Props } from './types';

const ErrorBoundary = ({
  children,
  fallback = (
    <Alert className="mb-2" type="danger" bordered rounded>
      <Alert.Content size="md">{INTERNAL_SERVER_ERROR}</Alert.Content>
    </Alert>
  ),
}: Props) => {
  const handleError = ({
    errMsg,
    ...tags
  }: {
    errMsg: string;
    [key: string]: string | undefined;
  }) => {
    Emitter.emit('GLOBAL_ERROR');

    Sentry.captureException(errMsg, {
      tags,
    });
  };

  return (
    <ErrorBoundaryComponent
      onError={handleError}
      fallback={fallback}
      customErrorConfig={{
        product: 'payoutwebapp',
        team: 'payoutwebapp',
        merchantId: LocalStorage.getItemFromLocalStorage('merchantId'),
        accountId: LocalStorage.getItemFromLocalStorage('accountId'),
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;
