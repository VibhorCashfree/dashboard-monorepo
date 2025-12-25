import React from 'react';
import PropTypes from 'prop-types';
import { Space, Text, Image } from '@cashfree-intl/coherent';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

const BatchDetailsApprovals = ({ data, count, totalCount }) => (
  <>
    <Text color="bodyLight" className="mt-3 mb-1">
      Approvals{' '}
      <strong>
        ({count}/{totalCount})
      </strong>
    </Text>

    <Space gap={7}>
      {data.map(item => (
        <div key={item.name}>
          <Text variant="h16" className="mb-1">
            {item.name}{' '}
            <Image
              inline
              className="ml-1"
              src={getAlertIcon(item.type, 'sm')}
            />
          </Text>
          <Text variant="b12" color="bodyLight">
            {formattedDate(item.date)}
          </Text>
        </div>
      ))}
    </Space>
  </>
);

BatchDetailsApprovals.propTypes = {
  data: PropTypes.array,
  count: PropTypes.string,
  totalCount: PropTypes.string,
};

export default BatchDetailsApprovals;
