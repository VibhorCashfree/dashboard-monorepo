import React from 'react';
import moment from 'moment';
import { Text } from '@cashfree-intl/coherent';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';

// Components
import StatusLabel from 'components/StatusLabel';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { DetailsRow, Divider } from 'styled/common';

// Types
import type { PartiesTransferDetailsProps } from '../types';

const PartiesTransferDetails: React.FC<PartiesTransferDetailsProps> = ({
  data,
}) => (
  <>
    <DetailsRow>
      <div>
        <Text color="bodyLight">Transferred To</Text>
      </div>
      <div>
        <Text className="text-wrap">{data.name || '–'}</Text>
      </div>
      <div>
        <Text color="bodyLight">Transfer ID</Text>
      </div>
      <div>
        <Text className="text-wrap">
          {data.transfer_detail.transfer_id || '–'}
        </Text>
      </div>
    </DetailsRow>
    <DetailsRow>
      <div>
        <Text color="bodyLight">Initiated At</Text>
      </div>
      <div>
        <Text className="text-wrap">
          {moment(data.transfer_detail.added_on).format(FORMATS.TIMESTAMP)}
        </Text>
      </div>
      <div>
        <Text color="bodyLight">Status</Text>
      </div>
      <div>
        <Text className="text-wrap">
          <StatusLabel>{data.transfer_detail.transfer_status}</StatusLabel>
        </Text>
      </div>
    </DetailsRow>
    <DetailsRow>
      <div>
        <Text color="bodyLight">Beneficiary ID</Text>
      </div>
      <div>
        <Text className="text-wrap">{data.bene_Id || '–'}</Text>
      </div>
      <div>
        <Text color="bodyLight">Amount</Text>
      </div>
      <div>
        <Text className="text-wrap">
          {formatAmount(data.transfer_detail.amount) || '-'}
        </Text>
      </div>
    </DetailsRow>
    <Divider />
  </>
);

export default withErrorBoundary(PartiesTransferDetails);
