import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackComponent from 'components/FallbackComponent';

import Analytics from 'utils/analytics';

const RiskShieldModule = lazy(() =>
  import('RiskShieldWebApp/RiskShield').catch(() => ({
    default: FallbackComponent,
  })),
);

const RiskShield = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const promo = query.get('promo');

    if (promo === 'poprotect') {
      Analytics.track(`Risk_Shield_${promo}`, { promo });
    }
  }, [location.search]);

  return (
    <ErrorBoundary fallback={<></>}>
      <Suspense fallback={<></>}>
        <RiskShieldModule basePath="risk-shield" product="PAYOUTS" />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RiskShield;
