import React from 'react';
import { Text, Space, Paper, Image } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { STATUS_MAPPING } from '../constants';

// Images
import blockIcon from 'images/block.svg';
import flagIcon from 'images/flag.svg';

// Types
import type { BlockedReasonProps } from '../types';

const BlockedReason: React.FC<BlockedReasonProps> = ({
  detailedDescription,
  status,
  original,
}) => {
  const { selectedCard, metadata } = original;
  const isTransferManuallyAllowed =
    selectedCard === STATUS_MAPPING.MANUALLY_ALLOWED;
  const manuallyAllowedDescription = metadata !== 'NA' ? metadata : '';
  const reviewDescription: string = isTransferManuallyAllowed
    ? manuallyAllowedDescription
    : detailedDescription;
  const reviewDescriptionArray = reviewDescription.split(' | ');

  return reviewDescription ? (
    <Paper className="p-2">
      <Space gap={2} alignItems="center">
        <Image
          src={status === STATUS_MAPPING.REJECTED ? blockIcon : flagIcon}
        />
        <Space direction="column">
          {reviewDescriptionArray.map((item: string) => (
            <Text key={item}>{item}</Text>
          ))}
        </Space>
      </Space>
    </Paper>
  ) : null;
};

export default withErrorBoundary(BlockedReason);
