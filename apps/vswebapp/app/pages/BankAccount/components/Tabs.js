import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Constants
import { menuConfig } from 'constants/common';

// Containers
import AllBankAccount from 'containers/AllBankAccount';
import BatchBankAccount from 'containers/BatchBankAccount';
import ApproveBatchBankAccount from 'containers/ApproveBatchBankAccount';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { ListContext } from 'providers/ListProvider';
import { BatchDetailsContext } from 'providers/BatchDetailsProvider';

// Utils
import Analytics from 'utils/analytics';

const defaultPanes = [
  {
    menuItem: 'All',
    key: 'all',
    render: () => (
      <TabPane attached={false}>
        <AllBankAccount />
      </TabPane>
    ),
  },
  {
    menuItem: 'Batch',
    key: 'batch',
    render: () => (
      <TabPane attached={false}>
        <BatchBankAccount />
      </TabPane>
    ),
  },
  {
    menuItem: 'Approve Batch',
    key: 'approve-batch',
    render: () => (
      <TabPane attached={false}>
        <ApproveBatchBankAccount />
      </TabPane>
    ),
  },
];

const Tabs = () => {
  const { preferences } = useContext(AccountContext);
  const { dispatch } = useContext(ListContext);
  const {
    state: batchDetailsState,
    dispatch: batchDetailsDispatch,
  } = useContext(BatchDetailsContext);

  const navigate = useNavigate();

  const { tabId } = useParams();

  const panes = defaultPanes.filter(pane => {
    if (pane.key === 'approve-batch') {
      return preferences?.bav?.batch;
    }

    return true;
  });

  const [activeIndex, setActiveIndex] = useState(() =>
    panes.findIndex(p => p.key === tabId),
  );

  useEffect(() => {
    batchDetailsDispatch({ type: 'RESET' });
  }, [batchDetailsState]);

  const onTabChange = (e, data) => {
    dispatch({ type: 'RESET', key: defaultPanes[data.activeIndex].key });
    Analytics.track('Tab_Change', {
      tabName: defaultPanes[data.activeIndex].key,
    });
    setActiveIndex(data.activeIndex);
    navigate(`/bav/${defaultPanes[data.activeIndex].key}`);
  };

  return (
    <Tab
      activeIndex={activeIndex}
      menu={menuConfig}
      panes={panes}
      onTabChange={onTabChange}
    />
  );
};

export default Tabs;
