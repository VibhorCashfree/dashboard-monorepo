import React, { useState } from 'react';
import { Button, Space } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import { emitUserValidation } from 'utils/common';

// Components
import Icon from 'components/Icon';
import ApproveAndWhiteList from './ApproveAndWhiteList';
import Modals from './Modals';

// Constants
import { MODAL_TYPE, STATUS_MAPPING } from '../constants';

// Types
import type { ReviewTransferProps } from '../types';

const ReviewTransfer: React.FC<ReviewTransferProps> = ({
  original,
  transactionData,
  referenceId,
  fetchTransferDetails,
}) => {
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);

  return (
    <>
      <Space
        gap={1}
        justifyContent={
          transactionData.status === STATUS_MAPPING.APPROVAL_PENDING
            ? 'flex-end'
            : 'flex-start'
        }
      >
        {transactionData.status === STATUS_MAPPING.APPROVAL_PENDING && (
          <>
            <Button
              danger
              icon={<Icon name="cross" fill="#ffffff" />}
              onClick={() =>
                emitUserValidation(() => setModalType(MODAL_TYPE.BLOCK))
              }
            >
              Block
            </Button>

            <Button
              primary
              icon={<Icon name="tick" fill="#ffffff" />}
              onClick={() =>
                emitUserValidation(() => setModalType(MODAL_TYPE.APPROVE))
              }
            >
              Allow
            </Button>
          </>
        )}
        <ApproveAndWhiteList
          original={original}
          transferDetails={transactionData}
          fetchTransferDetails={fetchTransferDetails}
        />
      </Space>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          referenceId={referenceId}
          amount={transactionData.amount}
          fetchTransferDetails={fetchTransferDetails}
        />
      )}
    </>
  );
};

export default withErrorBoundary(ReviewTransfer);
