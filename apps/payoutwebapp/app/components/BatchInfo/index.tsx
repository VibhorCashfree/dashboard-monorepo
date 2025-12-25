import React from 'react';
import moment from 'moment';
import { Space, Text } from '@cashfree-intl/coherent';
import _isUndefined from 'lodash/isUndefined';

// Components
import StatusLabel from 'components/StatusLabel';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';

// Types
import type { Props } from './types';

const BatchInfo = ({
  fileName,
  fileId,
  uploadedAt,
  uploadedBy,
  amount,
  currency,
  status,
}: Props) => (
  <Space justifyContent="space-between">
    <Space gap={6}>
      <div>
        <Text color="bodyLight" className="mb-1">
          File Name
        </Text>
        <Text variant="h16" className="text-ellipsis">
          {fileName}
        </Text>
      </div>
      <div>
        <Text color="bodyLight" className="mb-1">
          File ID
        </Text>
        <Text variant="h16">{fileId}</Text>
      </div>
      <div>
        <Text color="bodyLight" className="mb-1">
          Uploaded At
        </Text>
        <Text variant="h16">
          {moment(uploadedAt).format(FORMATS.TIMESTAMP)}
        </Text>
      </div>
      <div>
        <Text color="bodyLight" className="mb-1">
          Uploaded By
        </Text>
        <Text variant="h16">{uploadedBy || '–'}</Text>
      </div>
    </Space>
    <Space gap={4}>
      <div className="text-right">
        <StatusLabel className="mb-1" filled>
          {status}
        </StatusLabel>
        {!_isUndefined(amount) && status !== 'REJECTED' && (
          <Text variant="h16">{formatAmount(amount, currency)}</Text>
        )}
      </div>
    </Space>
  </Space>
);

export default BatchInfo;
