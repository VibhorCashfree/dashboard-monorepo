import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';
import withReadPermission from 'hocs/withReadPermission';

// Actions
import fetchFundSourcesAction from 'redux/actions/fetchFundSources';
import fetchDowntimesAction from 'redux/actions/fetchDowntimes';

// Utils
import Region from 'utils/region';
import FundSourcesUtil from 'utils/fundSources';

// Constants
import { REGION } from 'constants/common';
import { MENU, PATH_BY_MENU } from 'constants/menuItems';

// Pages
import Settings from 'pages/Settings';

// Containers
import HomePage from 'containers/HomePage';

// Types
import type { AppRoutesProps } from '../types';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const AppRoutes: React.FC<AppRoutesProps> = ({
  fundSources,
  fetchFundSources,
  fetchDowntimes,
}) => {
  useEffect(() => {
    fetchFundSources();
  }, []);

  useEffect(() => {
    if (
      Region.get() === REGION.IN &&
      _size(FundSourcesUtil.getActives(fundSources))
    ) {
      fetchDowntimes();
    }
  }, [fundSources]);

  return (
    <SentryRoutes>
      <Route
        path={`/${PATH_BY_MENU[MENU.SETTINGS]}/*`}
        element={<Settings />}
      />
      <Route path="/:activePageId/*" element={<HomePage />} />
      <Route
        path="*"
        element={<Navigate to={`/${PATH_BY_MENU[MENU.SUMMARY]}`} replace />}
      />
    </SentryRoutes>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchFundSources: () => dispatch(fetchFundSourcesAction()),
  fetchDowntimes: () => dispatch(fetchDowntimesAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withErrorBoundary(
  withReadPermission(withConnect(AppRoutes), {
    code: 200,
    description: 'access Payouts',
  }),
);
