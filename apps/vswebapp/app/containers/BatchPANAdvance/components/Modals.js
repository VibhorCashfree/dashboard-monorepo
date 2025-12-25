import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  AlertModal,
  UploadStats,
  UploadFileModal,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Services
import { createBatch, updateBatch, getErrorLog } from 'services/pan-advance';

// Utils
import Analytics from 'utils/analytics';
import { triggerDownload, decodeFile } from 'utils/common';

// Constants
import EVENTS from 'constants/analytics';
import { MODAL_TYPES, UPLOAD_CHECK_LIST } from '../constants';

// Components
import VerifyModal from './VerifyModal';
import PANExistsModal from './PANExistsModal';

const Modals = ({
  modalType,
  setModalType,
  setFetchCounter,
  downloadSampleFile,
}) => {
  const [modalData, setModalData] = useState({});

  const handleSingleResponse = data => {
    setModalData(data);
    setModalType(data.status);

    try {
      if (['VALID', 'INVALID'].includes(data.status)) {
        Analytics.track(EVENTS.PAN_Advance.ALL.VERIFY_SUCCESS);
      } else {
        Analytics.track(EVENTS.PAN_Advance.ALL.VERIFY_FAILED);
      }
    } catch (error) {}
  };

  const downloadErrorLog = async () => {
    const response = await getErrorLog(modalData.fileId);

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
      fileId: modalData.fileId,
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
      setModalType(MODAL_TYPES.FAILED);
      Analytics.track(EVENTS?.PAN_Advance?.BATCH?.UPLOAD_FAILURE);
    } else if (data?.count?.invalid === 0) {
      Analytics.track(EVENTS.PAN_Advance.BATCH.UPLOAD_SUCCESS, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.SUCCESS);
      setFetchCounter(count => count + 1);
    } else if (data.count.valid > 0) {
      Analytics.track(EVENTS.PAN_Advance.BATCH.UPLOAD_PARTIAL_SUCCESS, {
        valid: _get(data, 'count.valid', 0),
        invalid: _get(data, 'count.invalid', 0),
      });
      setModalType(MODAL_TYPES.FAILED_WITH_VALID);
    } else {
      Analytics.track(EVENTS.PAN_Advance.BATCH.UPLOAD_FAILURE, {
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
          sizeLimit={5242880}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
          onClose={() => {
            setModalType();
            setFetchCounter(prev => prev + 1);
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

    case MODAL_TYPES.VERIFY:
      return (
        <VerifyModal
          onClose={() => setModalType()}
          onVerify={handleSingleResponse}
        />
      );

    case MODAL_TYPES.FAILED:
      return (
        <AlertModal
          type="danger"
          title="Failed to Validate"
          onClose={() => setModalType()}
        >
          <Text as="p" variant="p14">
            {modalData.message}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPES.VALID:
      return (
        <PANExistsModal
          type="success"
          title="PAN is Valid"
          onClose={() => setModalType()}
          data={modalData}
        />
      );

    case MODAL_TYPES.INVALID:
      return (
        <PANExistsModal
          type="info"
          title="PAN is Invalid"
          onClose={() => setModalType()}
          data={modalData}
        />
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
