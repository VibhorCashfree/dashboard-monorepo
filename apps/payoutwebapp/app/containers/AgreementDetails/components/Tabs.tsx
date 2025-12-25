import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Containers
import AgreementOverview from 'containers/AgreementOverview';
import AgreementAccountDetails from 'containers/AgreementAccountDetails';

// Constants
import { defaultTabMenuConfig } from 'constants/common';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

const defaultPanes = [
  {
    menuItem: LABEL_BY_SUBMENU[SUBMENU.OVERVIEW],
    key: PATH_BY_SUBMENU[SUBMENU.OVERVIEW],
    render: () => (
      <TabPane attached={false}>
        <AgreementOverview />
      </TabPane>
    ),
  },
  {
    menuItem: LABEL_BY_SUBMENU[SUBMENU.ACCOUNT_DETAILS],
    key: PATH_BY_SUBMENU[SUBMENU.ACCOUNT_DETAILS],
    render: () => (
      <TabPane attached={false}>
        <AgreementAccountDetails />
      </TabPane>
    ),
  },
];

const Tabs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const match = useMatch(
    `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]}/${
      PATH_BY_SUBMENU[SUBMENU.DETAILS]
    }/:tabId`,
  );

  const { tabId } = useParams();

  useEffect(() => {
    const index = defaultPanes.findIndex((p) => p.key === tabId);
    setActiveIndex(index);
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
