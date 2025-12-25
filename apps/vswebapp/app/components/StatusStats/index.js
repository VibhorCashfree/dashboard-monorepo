import React from 'react';
import PropTypes from 'prop-types';
import { Space, Text } from '@cashfree-intl/coherent';
import _startCase from 'lodash/startCase';

const StatusStats = ({ data }) => {
  const { total, ...rest } = data;

  return (
    <Space gap={6} className="pb-1">
      {total && (
        <div>
          <Text color="bodyLight" className="mb-1">
            Total
          </Text>
          <Text variant="h16">{total}</Text>
        </div>
      )}
      {rest &&
        Object.keys(rest)
          .filter(key => data[key])
          .map(key => (
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

StatusStats.propTypes = {
  data: PropTypes.object,
};

export default StatusStats;
