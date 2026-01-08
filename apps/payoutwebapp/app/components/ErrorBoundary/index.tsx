import React from 'react';
import { ErrorBoundary } from '@dashboard-monorepo/shared';

// Constants
import { INTERNAL_SERVER_ERROR } from 'constants/errors';

// Components
import Alert from 'components/Alert';

// Utils
import Emitter from 'utils/emitter';

// Types
import type { Props } from './types';

const PayoutErrorBoundary = ({
  children,
  fallback = (
    <Alert className="mb-2" type="danger" bordered rounded>
      <Alert.Content size="md">{INTERNAL_SERVER_ERROR}</Alert.Content>
    </Alert>
  ),
}: Props) => {
  const handleGlobalError = () => {
    Emitter.emit('GLOBAL_ERROR');
  };

  return (
    <ErrorBoundary
      product="payoutwebapp"
      team="payoutwebapp"
      onGlobalError={handleGlobalError}
      fallback={fallback}
    >
      {children}
    </ErrorBoundary>
  );
};

export default PayoutErrorBoundary;
export { default as withErrorBoundary } from './hocs';
