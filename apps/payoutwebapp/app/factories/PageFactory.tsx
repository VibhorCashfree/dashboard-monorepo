import React, { memo } from 'react';
import PropTypes from 'prop-types';

// Constants
import { MENU, PATH_BY_MENU } from 'constants/menuItems';

// Pages
import Summary from 'pages/Summary/Loadable';
import Beneficiaries from 'pages/Beneficiaries/Loadable';
import Transfers from 'pages/Transfers/Loadable';
import Cashgrams from 'pages/Cashgrams/Loadable';
import Account from 'pages/Account/Loadable';
import Downtimes from 'pages/Downtimes/Loadable';
import ERP from 'pages/ERP/Loadable';
import FundSources from 'pages/FundSources/Loadable';
import Reports from 'pages/Reports/Loadable';
import Settings from 'pages/Settings/Loadable';
import Developers from 'pages/Developers/Loadable';
import OneEscrow from 'pages/OneEscrow/Loadable';
import RiskShield from 'pages/RiskShield/Loadable';

const map = {
  [PATH_BY_MENU[MENU.SUMMARY]]: Summary,
  [PATH_BY_MENU[MENU.BENEFICIARIES]]: Beneficiaries,
  [PATH_BY_MENU[MENU.TRANSFERS]]: Transfers,
  [PATH_BY_MENU[MENU.CASHGRAMS]]: Cashgrams,
  [PATH_BY_MENU[MENU.ACCOUNT]]: Account,
  [PATH_BY_MENU[MENU.DOWNTIMES]]: Downtimes,
  [PATH_BY_MENU[MENU.ERP]]: ERP,
  [PATH_BY_MENU[MENU.FUND_SOURCES]]: FundSources,
  [PATH_BY_MENU[MENU.REPORTS]]: Reports,
  [PATH_BY_MENU[MENU.SETTINGS]]: Settings,
  [PATH_BY_MENU[MENU.DEVELOPERS]]: Developers,
  [PATH_BY_MENU[MENU.ONE_ESCROW]]: OneEscrow,
  [PATH_BY_MENU[MENU.RISK_SHIELD]]: RiskShield,
};

const PageFactory = ({
  componentName,
  ...props
}: {
  componentName: keyof typeof map;
}) => {
  const TagName = map[componentName];

  return <TagName {...props} />;
};

PageFactory.propTypes = {
  componentName: PropTypes.string.isRequired,
};

export default memo(PageFactory);
