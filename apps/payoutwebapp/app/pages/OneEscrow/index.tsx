import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Agreements from 'pages/Agreements';

// Containers
import VirtualAccountDetails from 'containers/VirtualAccountDetails';
import EscrowAccount from 'containers/EscrowAccount';

// Constants
import { SUBMENU, PATH_BY_SUBMENU } from 'constants/menuItems';

// Providers
import { EscrowAccountProvider } from './providers';

const OneEscrow: React.FC = () => (
  <EscrowAccountProvider>
    <Routes>
      <Route
        path={`${PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]}/*`}
        element={<Agreements />}
      />
      <Route
        path={`${PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]}/${
          PATH_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]
        }/${PATH_BY_SUBMENU[SUBMENU.DETAILS]}/*`}
        element={<VirtualAccountDetails />}
      />
      <Route
        path={`${PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]}/*`}
        element={<EscrowAccount />}
      />
      <Route
        path="*"
        element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]} replace />}
      />
    </Routes>
  </EscrowAccountProvider>
);

export default OneEscrow;
