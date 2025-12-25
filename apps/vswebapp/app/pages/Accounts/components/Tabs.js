import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Components
import AccountSummary from 'containers/AccountSummary';
import Statements from 'containers/Statements';
import Information from 'containers/Information';
import RechargeHistory from 'containers/RechargeHistory';

// Constants
import { menuConfig } from 'constants/common';

// Utils
import Analytics from 'utils/analytics';

const defaultPanes = [
  {
    menuItem: 'Summary',
    key: 'summary',
    render: () => (
      <TabPane attached={false}>
        <AccountSummary />
      </TabPane>
    ),
  },
  {
    menuItem: 'Statement',
    key: 'statement',
    render: () => (
      <TabPane attached={false}>
        <Statements />
      </TabPane>
    ),
  },
  {
    menuItem: 'Recharge History',
    key: 'recharge-history',
    render: () => (
      <TabPane attached={false}>
        <RechargeHistory />
      </TabPane>
    ),
  },
];

const Tabs = () => {
  const navigate = useNavigate();
  const { tabId } = useParams();
  const activeIndex = defaultPanes.findIndex(p => p.key === tabId);

  const onTabChange = (e, data) => {
    Analytics.track('Tab_Change', {
      tabName: defaultPanes[data.activeIndex].key,
    });
    navigate(`/accounts/${defaultPanes[data.activeIndex].key}`);
  };

  return (
    <Tab
      activeIndex={activeIndex}
      menu={menuConfig}
      panes={defaultPanes}
      onTabChange={onTabChange}
    />
  );
};

export default Tabs;
