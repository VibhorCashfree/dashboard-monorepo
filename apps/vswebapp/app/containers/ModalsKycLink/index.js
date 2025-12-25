import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  UploadStats,
  Text,
  AlertModal,
  ConfirmModal,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import { updateBatch, getErrorLog } from 'services/forms';
import { getSampleFile } from 'services/misc';

// Utils
import Analytics from 'utils/analytics';
import { triggerDownload, decodeFile } from 'utils/common';

// Constants
import EVENTS from 'constants/analytics';
import { MODAL_TYPES } from './constants';

// Components
import CreateJourney from './CreateJourney';
import SendJourney from './SendJourney';

const ModalKycLink = ({
  modalType,
  setModalType,
  setFetchCounter,
  draftId,
  setDraftId,
  action = 'CREATE',
  setAction,
  handleDelete,
}) => {
  const [modalData, setModalData] = useState({});

  const downloadSampleFile = async type => {
    const queryObj = {
      fileType: 'BULK_VRS_FORM',
      type,
    };

    const response = await getSampleFile(queryObj);

    Analytics.track(EVENTS.DOWNLOAD_SAMPLE, {
      section: 'FORMS',
      sub_section: 'Batch',
    });

    triggerDownload({ type: 'URL', payload: response.fileUrl });
  };

  const downloadErrorLog = async () => {
    const response = await getErrorLog(modalData.id);

    if (response.fileUrl) {
      triggerDownload({ type: 'URL', payload: response.fileUrl });
    } else {
      triggerDownload(
        { type: 'DATA', payload: decodeFile(response.file) },
        `${modalData.id}-error-log.csv`,
      );
    }
  };

  const handleProcessing = action => async () => {
    await updateBatch({
      id: modalData.id,
      action,
    });

    switch (action) {
      case 'cancel':
        Analytics.track(EVENTS.FORMS.BATCH.CANCEL_UPLOAD);
        setModalType(MODAL_TYPES.CANCEL);
        break;

      case 'proceed':
        setModalType(MODAL_TYPES.SUCCESS);
        break;
    }

    setFetchCounter(count => count + 1);
  };

  const handleResponse = data => {
    setModalData(data);

    if (data.error) {
      Analytics.track(EVENTS.FORMS.BATCH.UPLOAD_FAILURE);
      setModalType(MODAL_TYPES.FAILED);
    } else if (data?.count?.invalid === 0) {
      Analytics.track(EVENTS.FORMS.BATCH.UPLOAD_SUCCESS, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.SUCCESS);
      setFetchCounter(count => count + 1);
    } else if (data.count.valid > 0) {
      Analytics.track(EVENTS.FORMS.BATCH.UPLOAD_PARTIAL_SUCCESS, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.FAILED_WITH_VALID);
    } else {
      Analytics.track(EVENTS.FORMS.BATCH.UPLOAD_FAILURE, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.FAILED_WITH_NO_VALID);
    }
  };

  switch (modalType) {
    case MODAL_TYPES.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="File Uploaded Successfully"
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.CANCEL:
      return (
        <AlertModal
          type="danger"
          title="File Upload Cancelled"
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="File Upload Failed"
          closeText="Upload Again"
          onClose={() => setModalType('UPLOAD')}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {_get(modalData, 'error.message')}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPES.FAILED_WITH_NO_VALID:
      return (
        <AlertModal
          type="danger"
          title="File Upload Failed"
          onClose={() => {
            setModalType();
            setFetchCounter(count => count + 1);
          }}
        >
          <Text as="p" variant="p14" color="bodyLight">
            No valid records found. Download the error log to correct all the
            errors and try again.
          </Text>

          <UploadStats
            {...modalData.count}
            onDownloadErrorLog={downloadErrorLog}
          />
        </AlertModal>
      );

    case MODAL_TYPES.FAILED_WITH_VALID:
      return (
        <AlertModal
          type="warning"
          title="Errors found in the file"
          confirmText="Proceed Anyway"
          onConfirm={handleProcessing('proceed')}
          onClose={handleProcessing('cancel')}
        >
          <Text as="p" variant="p14" color="bodyLight">
            Click &apos;Proceed Anyway&apos; to continue processing. Click
            &apos;Cancel&apos; to stop the file processing.
          </Text>

          <UploadStats
            {...modalData.count}
            onDownloadErrorLog={downloadErrorLog}
          />
        </AlertModal>
      );

    case MODAL_TYPES.CREATE_JOURNEY:
      return (
        <CreateJourney
          onClose={() => {
            ['CREATE', 'EDIT'].includes(action) &&
              setFetchCounter(prev => prev + 1);
            setAction && setAction('CREATE');
            setDraftId && setDraftId();
            setModalType();
          }}
          draftId={draftId}
          action={action}
          setFetchCounter={setFetchCounter}
        />
      );

    case MODAL_TYPES.SEND_JOURNEY:
      return (
        <SendJourney
          onClose={() => setModalType()}
          onResponse={handleResponse} // TODO: use after submitting "Send KYC Forms response"
          downloadSampleFile={downloadSampleFile}
          handleCreateJourney={() => {
            setModalType(MODAL_TYPES.CREATE_JOURNEY);
          }}
          setFetchCounter={setFetchCounter}
        />
      );

    case MODAL_TYPES.DELETE: {
      return (
        <ConfirmModal
          title="Delete Template"
          confirmText="Delete"
          onClose={() => {
            setDraftId && setDraftId();
            setModalType();
          }}
          onConfirm={handleDelete}
          danger
        >
          <Text variant="p14" color="bodyLight">
            Are you sure you want to delete this template?
          </Text>
        </ConfirmModal>
      );
    }
  }
};

ModalKycLink.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
};

export default ModalKycLink;
