import React from 'react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary as ErrorBoundaryComponent } from '@cashfree-intl/coherent';

// Utils
import { LocalStorage } from '@cashfree-intl/coherent';

// Utils
// import Emitter from 'utils/emitter';

const withErrorBoundary =
  (Component: any, fallback = <></>) =>
  (props: AnyObject) => {
    const handleError = ({
      errMsg,
      ...tags
    }: {
      errMsg: string;
      [key: string]: string | undefined;
    }) => {
      // Emitter.emit('LOCAL_ERROR');

      Sentry.captureException(errMsg, {
        tags,
      });
    };

    return (
      <ErrorBoundaryComponent
        onError={handleError}
        fallback={fallback}
        customErrorConfig={{
          product: 'CSP',
          team: 'PF',
          merchantId: LocalStorage.getItemFromLocalStorage('merchantId'),
          accountId: LocalStorage.getItemFromLocalStorage('accountId'),
          env: LocalStorage.getItemFromLocalStorage('env'),
        }}
      >
        <Component {...props} />
      </ErrorBoundaryComponent>
    );
  };

export default withErrorBoundary;
