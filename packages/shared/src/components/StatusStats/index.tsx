import React from 'react';
import { Space, Text } from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';

export interface StatusStatsProps {
  data: Record<string, number | string>;
}

const StatusStats = ({ data }: StatusStatsProps) => {
  if (!data) return null;
  const { total, ...rest } = data;

  return (
    <Space gap={6} className="pb-1">
      {total !== undefined && (
        <div>
          <Text color="bodyLight" className="mb-1">
            Total
          </Text>
          <Text variant="h16">{total}</Text>
        </div>
      )}
      {Object.keys(rest)
        .filter((key) => data[key])
        .map((key) => (
          <div key={key}>
            <Text color="bodyLight" className="mb-1">
              {_startCase(key)}
            </Text>
            <Text variant="h16">{data[key]}</Text>
          </div>
        ))}
    </Space>
  );
};

export default StatusStats;
