import React from 'react';
import PropTypes from 'prop-types';
import { Text, AlertModal } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPE } from 'constants/notifications';

// Components
import AddRecipientModal from './AddRecipientModal';
import DeleteModal from 'components/DeleteModal';

const Modals = ({
  loading,
  modalType,
  setModalType,
  data,
  handleSubmit,
  activeNotificationTab,
  selectedAccountId,
}) => {
  const handleResponse = (modalType, updatedData) => {
    handleSubmit(updatedData ?? data, modalType);
  };

  switch (modalType) {
    case MODAL_TYPE.EMAIL:
      return (
        <AddRecipientModal
          type={modalType}
          data={data}
          onSubmit={data => handleResponse(MODAL_TYPE.EMAIL, data)}
          onClose={() => setModalType()}
          activeNotificationTab={activeNotificationTab}
          selectedAccountId={selectedAccountId}
        />
      );

    case MODAL_TYPE.USER:
      return (
        <AlertModal
          type="success"
          title="Recipient Added Successfully"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Notifications will be sent to the recipient.
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.DELETE:
      return (
        <DeleteModal
          loading={loading}
          heading="Delete Email"
          description1={`Are you sure you want to delete ${data.email}?`}
          description2={`You will no longer receive notifications at this email after deletion.`}
          onClose={() => setModalType()}
          onDelete={() => handleResponse(MODAL_TYPE.DELETE)}
        />
      );
  }
};

Modals.propTypes = {
  loading: PropTypes.bool,
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  activeNotificationTab: PropTypes.string,
  selectedAccountId: PropTypes.string,
};

export default Modals;
