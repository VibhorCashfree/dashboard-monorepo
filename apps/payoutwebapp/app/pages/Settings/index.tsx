import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import EmailNotifications from 'containers/Settings/components/EmailNotifications';
import SetThreshold from 'containers/Settings/components/SetThreshold';
import PayoutMethods from 'containers/Settings/components/PayoutMethods';
import Preferences from 'containers/Settings/components/Preferences';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';

// Styled
import { StyledSettings } from './styled';

const Settings: React.FC = () => (
  <StyledSettings className="px-6 pt-4 pb-8">
    <Routes>
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.EMAIL_NOTIFICATIONS]}
        element={<EmailNotifications />}
      />
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.SET_THRESHOLD]}
        element={<SetThreshold />}
      />
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.PAYOUT_METHODS]}
        element={<PayoutMethods />}
      />
      <Route
        path={PATH_BY_SUBMENU[SUBMENU.PREFERENCES]}
        element={<Preferences />}
      />
      <Route
        path="*"
        element={
          <Navigate to={PATH_BY_SUBMENU[SUBMENU.EMAIL_NOTIFICATIONS]} replace />
        }
      />
    </Routes>
  </StyledSettings>
);

export default withReadPermission(Settings, {
  code: 2200,
  description: `access ${LABEL_BY_MENU[MENU.SETTINGS]}`,
});
