import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  UploadStats,
  UploadFileModal,
  Text,
  AlertModal,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Services
import { createBatch, updateBatch, getErrorLog } from 'services/bav';

// Utils
import Analytics from 'utils/analytics';
import { triggerDownload, decodeFile } from 'utils/common';

// Constants
import { UPLOAD_CHECK_LIST } from 'constants/common';
import EVENTS from 'constants/analytics';
import { MODAL_TYPES } from '../constants';

const Modals = ({
  modalType,
  setModalType,
  setFetchCounter,
  downloadSampleFile,
}) => {
  const [modalData, setModalData] = useState({});

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
      Analytics.track(EVENTS.BAV.BATCH.UPLOAD_FAILURE);
      setModalType(MODAL_TYPES.FAILED);
    } else if (data?.count?.invalid === 0) {
      Analytics.track(EVENTS.BAV.BATCH.UPLOAD_SUCCESS, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.SUCCESS);
      setFetchCounter(count => count + 1);
    } else if (data.count.valid > 0) {
      Analytics.track(EVENTS.BAV.BATCH.UPLOAD_PARTIAL_SUCCESS, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.FAILED_WITH_VALID);
    } else {
      Analytics.track(EVENTS.BAV.BATCH.UPLOAD_FAILURE, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.FAILED_WITH_NO_VALID);
    }
  };

  const handleFileUpload = payload => {
    const formData = new FormData();

    formData.append('file', payload.file);

    return createBatch(formData);
  };

  switch (modalType) {
    case MODAL_TYPES.UPLOAD:
      return (
        <UploadFileModal
          checkList={UPLOAD_CHECK_LIST}
          modalTitle="Upload Batch File"
          onFileUpload={handleFileUpload}
          onSampleFileClick={downloadSampleFile}
          onResponse={handleResponse}
          onClose={() => setModalType()}
          modalBody={
            <>
              <TestEnvironmentAlert />
              <Text variant="p14" color="bodyLight">
                Ensure that the file you are uploading is as per the format in
                the sample file.
              </Text>
            </>
          }
        />
      );

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
          onClose={() => setModalType()}
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
          onClose={() => setModalType()}
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
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  downloadSampleFile: PropTypes.func.isRequired,
};

export default Modals;
