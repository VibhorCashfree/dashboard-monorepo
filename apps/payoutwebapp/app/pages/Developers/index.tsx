import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Containers
import APIKeys from 'containers/APIKeys';
import Webhook from 'containers/Webhook';
import TwoFactorAuth from 'containers/TwoFactorAuth';
import APIMetrics from 'containers/APIMetrics';
import HistoryLog from 'containers/HistoryLog';
import IntegrationChecklist from 'containers/IntegrationChecklist';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
} from 'constants/menuItems';

// Providers
import { TwoFactorProvider } from './providers';

const Developers: React.FC = () => (
  <TwoFactorProvider>
    <Routes>
      <Route path={PATH_BY_SUBMENU[SUBMENU.API_KEYS]} element={<APIKeys />} />
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH]}
        element={<TwoFactorAuth />}
      />
      <Route path={PATH_BY_SUBMENU[SUBMENU.WEBHOOKS]} element={<Webhook />} />
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.API_METRICS]}
        element={<APIMetrics />}
      />
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.INTEGRATION_CHECKLIST]}
        element={<IntegrationChecklist />}
      />
      <Route
        path={`:type/${PATH_BY_SUBMENU[SUBMENU.HISTORY_LOG]}`}
        element={<HistoryLog />}
      />
      <Route
        path="*"
        element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.API_KEYS]} replace />}
      />
    </Routes>
  </TwoFactorProvider>
);

export default withReadPermission(Developers, {
  code: 2200,
  description: `access ${LABEL_BY_MENU[MENU.DEVELOPERS]}`,
});
