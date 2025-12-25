import React from 'react';
import moment from 'moment';
import { Image, Space, Text } from '@cashfree-intl/coherent';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Types
import type { Props } from './types';

const BatchDetailsApprovals = ({ data, count, totalCount }: Props) => (
  <>
    <Text color="bodyLight" className="mt-3 mb-1">
      Approvals{' '}
      <strong>
        ({count}/{totalCount})
      </strong>
    </Text>

    <Space gap={7}>
      {data.map((item) => (
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
            {moment(item.date).format(FORMATS.TIMESTAMP)}
          </Text>
        </div>
      ))}
    </Space>
  </>
);

export default BatchDetailsApprovals;
