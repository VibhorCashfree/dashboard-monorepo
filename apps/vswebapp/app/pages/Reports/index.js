import React from 'react';

// Containers
import ReportsContainer from 'containers/Reports';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

const Reports = () => (
  <>
    <PageHeader embedKey="REPORTS">Reports</PageHeader>
    <MetaTags title="Reports" />
    <ReportsContainer />
  </>
);

export default Reports;
