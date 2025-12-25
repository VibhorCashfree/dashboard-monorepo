import React from 'react';

// Containers
import SummaryContainer from 'containers/Summary';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import { MENU, LABEL_BY_MENU } from 'constants/menuItems';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import PayoutProtectBanner from 'containers/Summary/components/PayoutProtectBanner';

const Summary: React.FC = () => (
  <>
    <PayoutProtectBanner />
    <PageHeader embedKey="SUMMARY">{LABEL_BY_MENU[MENU.SUMMARY]}</PageHeader>
    <MetaTags title={LABEL_BY_MENU[MENU.SUMMARY]} />
    <SummaryContainer />
  </>
);

export default withReadPermission(Summary, {
  code: 2500 as number,
  description: `access ${LABEL_BY_MENU[MENU.SUMMARY]}` as string,
});
