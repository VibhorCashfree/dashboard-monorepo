import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Containers
import AllBeneficiaries from 'containers/AllBeneficiaries';
import BatchBeneficiaries from 'containers/BatchBeneficiaries';
import RevalidateBeneficiaries from 'containers/RevalidateBeneficiaries';
import BeneficiaryDetails from 'containers/BeneficiaryDetails';
import BatchBeneficiaryDetails from 'containers/BatchBeneficiaryDetails';
import BatchIbanValidation from 'containers/BatchIbanValidation';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
} from 'constants/menuItems';

const Beneficiaries: React.FC = () => (
  <ListProvider>
    <BatchDetailsProvider>
      <Routes>
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.ALL]}
          element={<AllBeneficiaries />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.BATCH]}
          element={<BatchBeneficiaries />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.BATCH_IBAN]}
          element={<BatchIbanValidation />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.REVALIDATE]}
          element={<RevalidateBeneficiaries />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.DETAILS]}
          element={<BeneficiaryDetails />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.BATCH_DETAILS]}
          element={<BatchBeneficiaryDetails />}
        />
        <Route
          path="*"
          element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.ALL]} replace />}
        />
      </Routes>
    </BatchDetailsProvider>
  </ListProvider>
);

export default withReadPermission(Beneficiaries, {
  code: 20002 as number,
  description: `access ${LABEL_BY_MENU[MENU.BENEFICIARIES]}` as string,
});
