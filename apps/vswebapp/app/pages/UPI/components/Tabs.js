import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Constants
import { menuConfig } from 'constants/common';

// Containers
import BatchUPI from 'containers/BatchUPI';
import UPIContainer from 'containers/UPI';

// Providers
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
        <UPIContainer />
      </TabPane>
    ),
  },
  {
    menuItem: 'Batch',
    key: 'batch',
    render: () => (
      <TabPane attached={false}>
        <BatchUPI />
      </TabPane>
    ),
  },
];

const Tabs = () => {
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
    navigate(`/upi/${defaultPanes[data.activeIndex].key}`);
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
