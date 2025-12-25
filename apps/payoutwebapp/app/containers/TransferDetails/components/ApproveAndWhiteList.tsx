import React, { lazy, Suspense } from 'react';

// Components
import ErrorBoundary from 'components/ErrorBoundary';
import FallbackComponent from 'components/FallbackComponent';

// Types
import type { ApproveAndWhiteListProps } from '../types';

const ApproveAndWhiteListComponent = lazy(() =>
  import('RiskShieldWebApp/ApproveAndWhiteList').catch(() => ({
    default: FallbackComponent,
  })),
);

const ApproveAndWhiteList: React.FC<ApproveAndWhiteListProps> = ({
  original,
  transferDetails,
  fetchTransferDetails,
}) => (
  <ErrorBoundary fallback={<></>}>
    <Suspense fallback={<></>}>
      <ApproveAndWhiteListComponent
        original={original}
        transferDetails={transferDetails}
        fetchTransferDetails={fetchTransferDetails}
      />
    </Suspense>
  </ErrorBoundary>
);

export default ApproveAndWhiteList;
