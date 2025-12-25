import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Constants
import { menuConfig } from 'constants/common';

// Containers
import Agent from 'containers/AllAgent';
import Auditor from 'containers/AllAuditor';

// Providers
import { ListContext } from 'providers/ListProvider';

const Tabs = ({ fetchCounter, addSpecificRole }) => {
  const { dispatch } = useContext(ListContext);

  const navigate = useNavigate();

  const { tabId } = useParams();

  const defaultPanes = [
    {
      menuItem: 'Agents',
      key: 'agent',
      render: () => (
        <TabPane attached={false}>
          <Agent
            parentFetchCounter={fetchCounter}
            addSpecificRole={addSpecificRole}
          />
        </TabPane>
      ),
    },
    {
      menuItem: 'Auditor',
      key: 'auditor',
      render: () => (
        <TabPane attached={false}>
          <Auditor
            parentFetchCounter={fetchCounter}
            addSpecificRole={addSpecificRole}
          />
        </TabPane>
      ),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(() =>
    defaultPanes.findIndex(p => p.key === tabId),
  );

  const onTabChange = (e, data) => {
    dispatch({ type: 'RESET', key: defaultPanes[data.activeIndex].key });
    setActiveIndex(data.activeIndex);
    navigate(`/vkyc-role/${defaultPanes[data.activeIndex].key}`);
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
