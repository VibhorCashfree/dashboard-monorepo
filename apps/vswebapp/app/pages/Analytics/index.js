import React from 'react';
import { Space, Text, Tab } from '@cashfree-intl/coherent';

// Constants
import { menuConfig } from 'constants/common';

// Containers
import SummaryContainer from 'containers/Summary';
import APIMetrics from 'containers/APIMetrics';

const defaultPanes = [
  {
    menuItem: 'Business Metrics',
    key: 'business',
    render: () => <SummaryContainer />,
  },
  {
    menuItem: 'API Metrics',
    key: 'api',
    render: () => <APIMetrics />,
  },
];

const Analytics = () => (
  <>
    <Space justifyContent="space-between" alignItems="center" className="mb-3">
      <Text variant="h20">Analytics</Text>
    </Space>

    <Tab menu={menuConfig} panes={defaultPanes} />
  </>
);

export default Analytics;
