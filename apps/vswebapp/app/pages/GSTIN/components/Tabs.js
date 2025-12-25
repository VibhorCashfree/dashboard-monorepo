import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Constants
import { menuConfig } from 'constants/common';

// Containers
import AllGSTIN from 'containers/AllGSTIN';
import BatchGSTIN from 'containers/BatchGSTIN';

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
        <AllGSTIN />
      </TabPane>
    ),
  },
  {
    menuItem: 'Batch',
    key: 'batch',
    render: () => (
      <TabPane attached={false}>
        <BatchGSTIN />
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

  const [activeIndex, setActiveIndex] = useState(() =>
    defaultPanes.findIndex(p => p.key === tabId),
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
    navigate(`/gstIn/${defaultPanes[data.activeIndex].key}`);
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
