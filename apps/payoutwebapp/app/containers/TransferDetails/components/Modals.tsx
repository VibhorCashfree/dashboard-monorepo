import React, { useState } from 'react';
import {
  toast,
  ConfirmModal,
  Text,
  Space,
  Divider,
  InputField,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Context
import { useAccount } from 'providers/AccountProvider';

// Services
import { update } from 'services/transfers';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  amount,
  referenceId,
  fetchTransferDetails,
}) => {
  const [reason, setReason] = useState<string>('');
  const { accountInfo } = useAccount();

  const handleSubmit = async (state: string) => {
    const body = {
      action: 'riskApproval',
      transfers: [
        {
          referenceId: String(referenceId),
          state,
          reason: reason,
        },
      ],
      modified_by: accountInfo.accountHolder,
      modifier_ip: '0.0.0.0',
    };

    const response = await update(body);

    if (!('error' in response)) {
      fetchTransferDetails();

      toast.success(response.message);

      setModalType(MODAL_TYPE.EMPTY);
    } else {
      toast.error((response.error as { details: string }).details);
    }
  };

  switch (modalType) {
    case MODAL_TYPE.APPROVE:
      return (
        <ConfirmModal
          title="Approve Transfer"
          confirmText="Yes, Approve"
          confirmBtnEvent="Primary_Approve_Transfer"
          closeBtnEvent="Secondary_Approve_Transfer"
          closeCrossEvent="Close_Icon_Approve_Transfer"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
          onConfirm={() => handleSubmit('riskApproved')}
        >
          <Space gap={2} direction="column">
            <Text variant="h16" color="bodyLight">
              Once the transfer is processed, it cannot be reversed.
            </Text>
            <Space gap={1}>
              <Text variant="h16" color="bodyLight">
                Amount:
              </Text>
              <Text variant="h16" strong>
                {formatAmount(amount)}
              </Text>
            </Space>
          </Space>
          <Divider />
          <InputField
            fluid
            label="Reason for allowing? (Optional)"
            placeholder="Write a reason for your reference"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReason(e.target.value)
            }
          />
        </ConfirmModal>
      );

    case MODAL_TYPE.BLOCK:
      return (
        <ConfirmModal
          danger
          title="Block Transfer"
          confirmText="Yes, Block"
          confirmBtnEvent="Primary_Block_Transfer"
          closeBtnEvent="Secondary_Block_Transfer"
          closeCrossEvent="Close_Icon_Block_Transfer"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
          onConfirm={() => handleSubmit('riskRejected')}
        >
          <Space gap={2} direction="column">
            <Text variant="h16" color="bodyLight">
              Are you sure you want to block this transfer?
            </Text>
            <Space gap={1}>
              <Text variant="h16" color="bodyLight">
                Amount:
              </Text>
              <Text variant="h16" strong>
                {formatAmount(amount)}
              </Text>
            </Space>
          </Space>
          <Divider />
          <InputField
            fluid
            label="Why are you blocking? (Optional)"
            placeholder="Write a reason for your reference"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReason(e.target.value)
            }
          />
        </ConfirmModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
