import React, { useState, useRef } from 'react';
import {
  Text,
  AlertModal,
  UploadStats,
  UploadFileModal,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { createBatch, updateBatch, getErrorLog } from 'services/beneficiaries';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import { triggerDownload, decodeFile } from 'utils/common';
import { getFileTypeOptions, getBenePurposeOptions } from '../utils';

// Constants
import { UPLOAD_CHECK_LIST } from 'constants/common';
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  setFetchCounter,
  downloadSampleFile,
}) => {
  const { preferences } = useAccount();

  const [modalData, setModalData] = useState<AnyObject>({});
  const benePurposeRef = useRef<string | undefined>();

  const downloadErrorLog = async () => {
    const response = await getErrorLog(modalData.id);

    if (!('error' in response)) {
      if (response.fileUrl) {
        triggerDownload({ type: 'URL', payload: response.fileUrl });
      } else {
        triggerDownload(
          { type: 'DATA', payload: decodeFile(response.file) },
          `${modalData.id}-error-log.csv`,
        );
      }
    }
  };

  const handleProcessing = (action: string) => async () => {
    await updateBatch({
      id: modalData.id,
      action,
      benePurpose: benePurposeRef.current,
    });

    switch (action) {
      case 'CANCEL':
        setModalType(MODAL_TYPE.CANCEL);
        break;

      case 'PROCEED':
        setModalType(MODAL_TYPE.SUCCESS);
        break;
    }

    setFetchCounter((count: number) => count + 1);
  };

  const handleResponse = (data: AnyObject): void => {
    setModalData(data);
    setFetchCounter((count: number) => count + 1);

    if (data.error) {
      setModalType(MODAL_TYPE.FAILED);
    } else if (data.count.invalid === 0) {
      setModalType(MODAL_TYPE.SUCCESS);
    } else if (data.count.valid > 0) {
      setModalType(MODAL_TYPE.FAILED_WITH_VALID);
    } else {
      setModalType(MODAL_TYPE.FAILED_WITH_NO_VALID);
    }
  };

  const handleFileUpload = (payload: {
    file: File;
    fileType: string;
  }): Promise<any> => {
    const formData = new FormData();

    formData.append('file', payload.file);
    formData.append('benePurpose', payload.fileType);

    benePurposeRef.current = payload.fileType;

    return createBatch(formData);
  };

  switch (modalType) {
    case MODAL_TYPE.UPLOAD: {
      const fileTypeOptions = getFileTypeOptions(
        preferences.beneficiaries.purpose,
      );

      const benePurposeOptions = getBenePurposeOptions(
        preferences.beneficiaries.purpose,
      );

      return (
        <UploadFileModal
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          modalTitle="Upload Batch Beneficiary File"
          fileTypes={fileTypeOptions}
          checkList={UPLOAD_CHECK_LIST}
          options={benePurposeOptions}
          onResponse={handleResponse}
          onFileUpload={handleFileUpload}
          onSampleFileClick={downloadSampleFile}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );
    }
    case MODAL_TYPE.SUCCESS:
      return (
        <AlertModal
          type="success"
          title="File Uploaded Successfully"
          eventNameOnConfirm="Primary_Batch_Beneficiaries_File_Upload_Success"
          eventNameOnClose="Secondary_Batch_Beneficiaries_File_Upload_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.CANCEL:
      return (
        <AlertModal
          type="danger"
          title="File Upload Cancelled"
          eventNameOnConfirm="Primary_Batch_Beneficiaries_File_Upload_Cancelled"
          eventNameOnClose="Secondary_Batch_Beneficiaries_File_Upload_Cancelled"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title="File Upload Failed"
          eventNameOnConfirm="Primary_Batch_Beneficiaries_File_Upload_Failed"
          eventNameOnClose="Secondary_Batch_Beneficiaries_File_Upload_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {_get(modalData, 'error.message')}
          </Text>
        </AlertModal>
      );

    case MODAL_TYPE.FAILED_WITH_NO_VALID:
      return (
        <AlertModal
          type="danger"
          title="File Upload Failed"
          eventNameOnConfirm="Primary_Batch_Beneficiaries_File_Upload_Failed"
          eventNameOnClose="Secondary_Batch_Beneficiaries_File_Upload_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
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

    case MODAL_TYPE.FAILED_WITH_VALID:
      return (
        <AlertModal
          type="warning"
          title="Errors found in the file"
          confirmText="Proceed Anyway"
          eventNameOnConfirm="Primary_Batch_Beneficiaries_File_Upload_Errors_Found"
          eventNameOnClose="Secondary_Batch_Beneficiaries_File_Upload_Errors_Found"
          onConfirm={handleProcessing('PROCEED')}
          onClose={handleProcessing('CANCEL')}
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

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
