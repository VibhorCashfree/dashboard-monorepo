import React from 'react';
import { Routes, Route } from 'react-router-dom';
import _get from 'lodash/get';
// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Containers
import HistoryLog from 'containers/HistoryLog';
import APIMetrics from 'containers/APIMetrics';
import APIKeys from 'containers/APIKeys';
import Webhook from 'containers/Webhook';
import TwoFactorAuth from 'containers/TwoFactorAuth';

// Constants
import { PARAMS_HEADER_MAPPING } from './constants';

// Providers
import { TwoFactorProvider } from './providers';

// Components
import PageHeader from 'components/PageHeader';

// Styled
import { StyledDevelopers } from './styled';

const Developers = () => {
  const activeItem = _get(window, 'location.pathname', '').split('/')[3];

  return (
    <TwoFactorProvider>
      <StyledDevelopers>
        <PageHeader>{PARAMS_HEADER_MAPPING[activeItem]}</PageHeader>
        <Routes>
          <Route path="api-metrics" element={<APIMetrics />} />
          <Route path=":type/history-log" element={<HistoryLog />} />
          <Route path="api-keys" element={<APIKeys />} />
          <Route path="2FA" element={<TwoFactorAuth />} />
          <Route path="webhook" element={<Webhook />} />
        </Routes>
      </StyledDevelopers>
    </TwoFactorProvider>
  );
};

export default withReadPermission(Developers, {
  code: 2200,
  description: 'access Developers',
});
