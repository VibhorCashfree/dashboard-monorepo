import React, { useState, useRef } from 'react';
import { Text, AlertModal, UploadFileModal } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { createIbanBatch } from 'services/beneficiaries';

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
  const [modalData, setModalData] = useState<AnyObject>({});

  const benePurposeRef = useRef<string | undefined>();

  const handleResponse = (data: AnyObject): void => {
    setModalData(data);
    setFetchCounter((count: number) => count + 1);

    if (data.error) {
      setModalType(MODAL_TYPE.FAILED);
    } else {
      setModalType(MODAL_TYPE.SUCCESS);
    }
  };

  const handleFileUpload = (payload: {
    file: File;
    fileType: string;
  }): Promise<any> => {
    const formData = new FormData();

    formData.append('file', payload.file);
    formData.append('benePurpose', 'BULK_IBAN_VALIDATION');

    benePurposeRef.current = payload.fileType;

    return createIbanBatch(formData);
  };

  switch (modalType) {
    case MODAL_TYPE.UPLOAD: {
      return (
        <UploadFileModal
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          modalTitle="Upload Batch IBAN File"
          checkList={UPLOAD_CHECK_LIST}
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
          eventNameOnConfirm="Primary_Batch_Iban_File_Upload_Success"
          eventNameOnClose="Secondary_Batch_Iban_File_Upload_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title="File Upload Failed"
          eventNameOnConfirm="Primary_Batch_Iban_File_Upload_Failed"
          eventNameOnClose="Secondary_Batch_Iban_File_Upload_Failed"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <Text as="p" variant="p14" color="bodyLight">
            {_get(modalData, 'error.message')}
          </Text>
        </AlertModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
