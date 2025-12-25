import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { WeightageProvider } from 'providers/WeightageProvider';

// Containers
import AllFundSources from 'containers/AllFundSources';
import Leads from 'containers/Leads';
import FundSourceDetails from 'containers/FundSourceDetails';
import Aggregators from 'containers/Aggregators';
import Configurations from 'containers/Configurations';

// Pages
import Downtimes from 'pages/Downtimes';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
} from 'constants/menuItems';

const FundSources: React.FC = () => (
  <Routes>
    <Route
      path={PATH_BY_SUBMENU[SUBMENU.ALL]}
      element={
        <WeightageProvider>
          <AllFundSources />
        </WeightageProvider>
      }
    />
    <Route path={PATH_BY_SUBMENU[SUBMENU.LEADS]} element={<Leads />} />
    <Route
      path={`${PATH_BY_SUBMENU[SUBMENU.DETAILS]}/*`}
      element={<FundSourceDetails />}
    />
    <Route path={PATH_BY_MENU[MENU.DOWNTIMES]} element={<Downtimes />} />
    <Route
      path={PATH_BY_SUBMENU[SUBMENU.AGGREGATORS]}
      element={<Aggregators />}
    />
    <Route
      path={PATH_BY_SUBMENU[SUBMENU.CONFIGURATIONS]}
      element={<Configurations />}
    />
    <Route
      path="*"
      element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.ALL]} replace />}
    />
  </Routes>
);

export default withReadPermission(FundSources, {
  code: 2700 as number,
  description: `access ${LABEL_BY_MENU[MENU.FUND_SOURCES]}`,
});
