import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Containers
import AllAgreements from 'containers/AllAgreements';
import AgreementDetails from 'containers/AgreementDetails';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import {
  SUBMENU,
  LABEL_BY_SUBMENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';

const Agreements: React.FC = () => (
  <ListProvider>
    <BatchDetailsProvider>
      <Routes>
        <Route
          path={`${PATH_BY_SUBMENU[SUBMENU.DETAILS]}/*`}
          element={<AgreementDetails />}
        />
        <Route path="*" element={<AllAgreements />} />
      </Routes>
    </BatchDetailsProvider>
  </ListProvider>
);

export default withReadPermission(Agreements, {
  code: 2850,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS]}`,
});
