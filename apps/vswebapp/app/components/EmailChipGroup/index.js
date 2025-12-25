import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Text } from '@cashfree-intl/coherent';
import Chip from 'components/Chip';
import { StyledEmailGroup } from './styled';

const EmailChipGroup = ({ loading, data, onDelete, onResendApprovalEmail }) => {
  const APPROVED = 'Recipient Approved';
  const APPROVAL_PENDING = 'Recipient Approval Pending';

  const resendApprovalEmailComponent = item => (
    <Space direction="column" className="p-1">
      <Text variant="b14">{APPROVAL_PENDING}</Text>
      <Button
        loading={loading}
        secondary
        size="small"
        className="mt-2"
        onClick={() => onResendApprovalEmail(item)}
      >
        Resend approval email
      </Button>
    </Space>
  );

  return (
    <StyledEmailGroup gap={1} wrap="true">
      {data.map(item => (
        <Chip
          key={item.id}
          name={item.email}
          maxWidth="270px"
          popoverText={
            item.verified ? APPROVED : resendApprovalEmailComponent(item)
          }
          verified={item.verified}
          onDelete={() => onDelete(item)}
        />
      ))}
    </StyledEmailGroup>
  );
};

EmailChipGroup.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onResendApprovalEmail: PropTypes.func.isRequired,
};

export default EmailChipGroup;
