import React, { lazy, Suspense } from 'react';

// Components
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackComponent from 'components/FallbackComponent';

// Types
import type { PayoutProtectImpactProps } from '../types';

const PayoutProtectImpactComponent = lazy(() =>
  import('RiskShieldWebApp/PayoutProtectImpact').catch(() => ({
    default: FallbackComponent,
  })),
);

const PayoutProtectImpact: React.FC<PayoutProtectImpactProps> = () => (
  <ErrorBoundary fallback={<></>}>
    <Suspense fallback={<></>}>
      <PayoutProtectImpactComponent source="Payouts" />
    </Suspense>
  </ErrorBoundary>
);

export default PayoutProtectImpact;
