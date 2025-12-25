import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Containers
import AllTransfers from 'containers/AllTransfers';
import BatchTransfers from 'containers/BatchTransfers';
import ApproveBatchTransfers from 'containers/ApproveBatchTransfers';
import ApproveTransfers from 'containers/ApproveTransfers';
import ReversedTransfers from 'containers/ReversedTransfers';
import BatchTransferDetails from 'containers/BatchTransferDetails';
import TransferDetails from 'containers/TransferDetails';

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

const Transfers: React.FC = () => (
  <ListProvider>
    <BatchDetailsProvider>
      <Routes>
        <Route path={PATH_BY_SUBMENU[SUBMENU.ALL]} element={<AllTransfers />} />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.BATCH]}
          element={<BatchTransfers />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH]}
          element={<ApproveBatchTransfers />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.APPROVE]}
          element={<ApproveTransfers />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.REVERSED]}
          element={<ReversedTransfers />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.DETAILS]}
          element={<TransferDetails />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.BATCH_DETAILS]}
          element={<BatchTransferDetails />}
        />
        <Route
          path={PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH_DETAILS]}
          element={<BatchTransferDetails />}
        />
        <Route
          path="*"
          element={<Navigate to={PATH_BY_SUBMENU[SUBMENU.ALL]} replace />}
        />
      </Routes>
    </BatchDetailsProvider>
  </ListProvider>
);

export default withReadPermission(Transfers, {
  code: 2100 as number,
  description: `access ${LABEL_BY_MENU[MENU.TRANSFERS]}`,
});
