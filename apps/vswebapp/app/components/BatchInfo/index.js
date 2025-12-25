import React from 'react';
import PropTypes from 'prop-types';
import { Space, Text } from '@cashfree-intl/coherent';
import _isUndefined from 'lodash/isUndefined';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { formatAmount } from 'utils/common';

// Components
import StatusLabel from 'components/StatusLabel';

const BatchInfo = ({
  fileName,
  fileId,
  uploadedAt,
  uploadedBy,
  amount,
  status,
}) => (
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
        <Text variant="h16">{formattedDate(uploadedAt)}</Text>
      </div>
      {uploadedBy && (
        <div>
          <Text color="bodyLight" className="mb-1">
            Uploaded By
          </Text>
          <Text variant="h16">{uploadedBy || '–'}</Text>
        </div>
      )}
    </Space>
    <Space gap={4}>
      <div className="text-right">
        <StatusLabel className="mb-1" filled>
          {status}
        </StatusLabel>
        {!_isUndefined(amount) && status !== 'REJECTED' && (
          <Text variant="h16">{formatAmount(amount)}</Text>
        )}
      </div>
    </Space>
  </Space>
);

BatchInfo.propTypes = {
  fileName: PropTypes.string,
  fileId: PropTypes.number,
  uploadedAt: PropTypes.string,
  uploadedBy: PropTypes.string,
  amount: PropTypes.string,
  status: PropTypes.string,
};

export default BatchInfo;
