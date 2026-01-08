import React from 'react';
import { ErrorBoundary } from '@dashboard-monorepo/shared';

const VSErrorBoundary = ({ children, fallback }) => (
  <ErrorBoundary product="VRS" team="FP" fallback={fallback}>
    {children}
  </ErrorBoundary>
);

export default VSErrorBoundary;
