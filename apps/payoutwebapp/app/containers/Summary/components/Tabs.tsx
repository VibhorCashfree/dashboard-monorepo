import React from 'react';
import { Tab, TabPane } from '@cashfree-intl/coherent';

// Containers
import SuccessRate from 'containers/SuccessRate';
import TransferTAT from 'containers/TransferTAT';

// Utils
import Analytics from 'utils/analytics';

// Constants
import { defaultTabMenuConfig } from 'constants/common';
import {
  MENU,
  SUBMENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';

const defaultPanes = [
  {
    menuItem: LABEL_BY_SUBMENU[SUBMENU.SUCCESS_RATE],
    key: PATH_BY_SUBMENU[SUBMENU.SUCCESS_RATE],
    render: () => (
      <TabPane attached={false}>
        <SuccessRate />
      </TabPane>
    ),
  },
  {
    menuItem: LABEL_BY_SUBMENU[SUBMENU.TRANSFER_TAT],
    key: PATH_BY_SUBMENU[SUBMENU.TRANSFER_TAT],
    render: () => (
      <TabPane attached={false}>
        <TransferTAT />
      </TabPane>
    ),
  },
];

const Tabs: React.FC = () => {
  const handleChange = (e: React.MouseEvent, data: { activeIndex: number }) => {
    Analytics.track(EVENTS.TAB_CHANGE, {
      section: LABEL_BY_MENU[MENU.SUMMARY],
      sub_section: defaultPanes[data.activeIndex].menuItem,
    });
  };

  return (
    <Tab
      id="transfer-efficiency"
      menu={defaultTabMenuConfig}
      panes={defaultPanes}
      onTabChange={handleChange}
    />
  );
};

export default Tabs;
