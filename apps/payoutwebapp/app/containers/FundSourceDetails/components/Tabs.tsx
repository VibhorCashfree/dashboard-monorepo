import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Containers
import Overview from 'containers/Overview';
import Statements from 'containers/Statements';
import RechargeHistory from 'containers/RechargeHistory';
import ServiceCharges from 'containers/ServiceCharges';

// Constants
import { defaultTabMenuConfig } from 'constants/common';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

const Tabs: React.FC = () => {
  const { details, showServiceCharges } = useDetails();

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const match = useMatch(
    `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
      PATH_BY_SUBMENU[SUBMENU.DETAILS]
    }/:tabId`,
  );
  const { tabId } = useParams();

  const defaultPanes = [
    {
      menuItem: LABEL_BY_SUBMENU[SUBMENU.OVERVIEW],
      key: PATH_BY_SUBMENU[SUBMENU.OVERVIEW],
      render: () => (
        <TabPane attached={false}>
          <Overview />
        </TabPane>
      ),
    },
    {
      menuItem: LABEL_BY_SUBMENU[SUBMENU.STATEMENTS],
      key: PATH_BY_SUBMENU[SUBMENU.STATEMENTS],
      render: () => (
        <TabPane attached={false}>
          <Statements details={details} />
        </TabPane>
      ),
    },
    {
      menuItem: LABEL_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
      key: PATH_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
      render: () => (
        <TabPane attached={false}>
          <RechargeHistory />
        </TabPane>
      ),
    },
    {
      menuItem: LABEL_BY_SUBMENU[SUBMENU.SERVICE_CHARGES],
      key: PATH_BY_SUBMENU[SUBMENU.SERVICE_CHARGES],
      render: () => (
        <TabPane attached={false}>
          <ServiceCharges />
        </TabPane>
      ),
    },
  ];

  const panes = defaultPanes.filter((pane) => {
    if (pane.key === PATH_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY]) {
      return [
        FS_DISPLAY_TYPE.CASHFREE_WALLET,
        FS_DISPLAY_TYPE.CONNECTED_WALLET,
      ].includes(details.fsDisplayType);
    }

    if (pane.key === PATH_BY_SUBMENU[SUBMENU.SERVICE_CHARGES]) {
      return showServiceCharges;
    }

    return true;
  });

  useEffect(() => {
    const activeIndex = panes.findIndex((p) => p.key === tabId);
    setActiveIndex(activeIndex);
  }, [tabId, panes]);

  const handleChange = (e: React.MouseEvent, data: { activeIndex: number }) => {
    setActiveIndex(data.activeIndex);
    navigate(match!.pathname.replace(/[^/]*$/, panes[data.activeIndex].key));
  };

  return (
    <Tab
      activeIndex={activeIndex}
      menu={defaultTabMenuConfig}
      panes={panes}
      onTabChange={handleChange}
    />
  );
};

export default Tabs;
