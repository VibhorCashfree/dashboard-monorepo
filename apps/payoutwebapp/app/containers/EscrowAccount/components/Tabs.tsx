import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Containers
import VirtualAccounts from 'containers/VirtualAccounts';
import Statements from 'containers/Statements';

// Constants
import { defaultTabMenuConfig } from 'constants/common';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

const Tabs: React.FC = () => {
  const { details } = useEscrowAccount();

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const match = useMatch(
    `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
      PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
    }/:tabId`,
  );
  const { tabId } = useParams();

  const defaultPanes = [
    {
      menuItem: LABEL_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS],
      key: PATH_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS],
      render: () => (
        <TabPane attached={false}>
          <VirtualAccounts />
        </TabPane>
      ),
    },
    {
      menuItem: LABEL_BY_SUBMENU[SUBMENU.ESCROW_STATEMENTS],
      key: PATH_BY_SUBMENU[SUBMENU.ESCROW_STATEMENTS],
      render: () => (
        <TabPane attached={false}>
          <Statements details={details} isVirtualAccount={true} />
        </TabPane>
      ),
    },
  ];

  useEffect(() => {
    const activeIndex = defaultPanes.findIndex((p) => p.key === tabId);
    setActiveIndex(activeIndex);
  }, [tabId]);

  const handleChange = (e: React.MouseEvent, data: { activeIndex: number }) => {
    setActiveIndex(data.activeIndex);

    navigate(
      match!.pathname.replace(/[^/]*$/, defaultPanes[data.activeIndex].key),
    );
  };

  return (
    <Tab
      activeIndex={activeIndex}
      menu={defaultTabMenuConfig}
      panes={defaultPanes}
      onTabChange={handleChange}
    />
  );
};

export default Tabs;
