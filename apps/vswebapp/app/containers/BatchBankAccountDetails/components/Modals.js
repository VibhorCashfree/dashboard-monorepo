import React from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal, ConfirmModal } from '@cashfree-intl/coherent';

// Utils
import { getApprovalMessages } from '../utils';

// Components
import ApprovalsModalInfo from 'components/ApprovalsModalInfo';

// Constants
import { MODAL_TYPES } from '../constants';

const Modals = ({ modalType, setModalType, batchRowDetails, handleAction }) => {
  const goToApproveBatch = () => {
    window.location.href = `${process.env.PUBLIC_PATH}bav/approve-batch`;
  };

  const messages = getApprovalMessages(modalType);

  switch (modalType) {
    case MODAL_TYPES.APPROVE:
    case MODAL_TYPES.REJECT:
      return (
        <ConfirmModal
          title={messages.title}
          confirmText={modalType === MODAL_TYPES.APPROVE ? 'Approve' : 'Reject'}
          onClose={() => setModalType()}
          onConfirm={handleAction}
        >
          <Text variant="p14" color="bodyLight">
            {messages.description}
          </Text>
          <ApprovalsModalInfo
            fileName={batchRowDetails.filename}
            count={batchRowDetails.totalRecords}
          />
        </ConfirmModal>
      );

    case MODAL_TYPES.APPROVED:
      return (
        <AlertModal
          type="success"
          title={messages.success}
          onClose={goToApproveBatch}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Check the status in the{' '}
            <a href={`${process.env.PUBLIC_PATH}bav/batch`} className="link">
              batch files section
            </a>
          </Text>
        </AlertModal>
      );

    case MODAL_TYPES.REJECTED:
      return (
        <AlertModal
          type="danger"
          title={messages.danger}
          onClose={goToApproveBatch}
        />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  batchRowDetails: PropTypes.object.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default Modals;
