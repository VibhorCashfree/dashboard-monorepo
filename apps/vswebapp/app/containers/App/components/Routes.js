import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Containers
import HomePage from 'containers/HomePage';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const VerificationRoutes = () => (
  <SentryRoutes>
    <Route path="/:activePageId/*" element={<HomePage />} />
    <Route path="*" element={<Navigate to="/home" replace />} />
  </SentryRoutes>
);

export default withReadPermission(VerificationRoutes, {
  code: [200, 80011],
  description: 'access Verification Suites',
});
