import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { createBatch, updateBatch, getErrorLog } from 'services/transfers';

// Helpers
import { getFundSourcesOptions } from 'helpers/fundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import Env from 'utils/env';
import { triggerDownload, decodeFile } from 'utils/common';
import { getSampleOptions, getFileTypeOptions } from '../utils';

// Components
import Alert from 'components/Alert';

// Constants
import { UPLOAD_CHECK_LIST } from 'constants/common';
import { MODAL_TYPE } from '../constants';

// Types
import type { ModalsProps } from '../types';

const Modals: React.FC<ModalsProps> = ({
  modalType,
  setModalType,
  fundSources,
  setFetchCounter,
  downloadSampleFile,
}) => {
  const { preferences } = useAccount();

  const [modalData, setModalData] = useState<AnyObject>({});

  const downloadErrorLog = async () => {
    const response = await getErrorLog(modalData.id as number);

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
      referenceId: modalData.id,
      action,
    });

    switch (action) {
      case 'cancel':
        setModalType(MODAL_TYPE.CANCEL);
        break;

      case 'proceed':
        setModalType(MODAL_TYPE.SUCCESS);
        break;
    }

    setFetchCounter((count: number) => count + 1);
  };

  const handleResponse = (data: AnyObject) => {
    setModalData(data);
    setFetchCounter((count: number) => count + 1);

    if (data.error) {
      setModalType(MODAL_TYPE.FAILED);
    } else if (data.id === 0) {
      setModalType(MODAL_TYPE.UNKNOWN);
    } else if (data.count?.invalid === 0) {
      setModalType(MODAL_TYPE.SUCCESS);
    } else if (data.count?.valid > 0) {
      setModalType(MODAL_TYPE.FAILED_WITH_VALID);
    } else {
      setModalType(MODAL_TYPE.FAILED_WITH_NO_VALID);
    }
  };

  const handleFileUpload = (payload: {
    fileType: string;
    file: File;
    paymentInstrumentId: string;
  }) => {
    const formData = new FormData();

    formData.append('fileType', payload.fileType);
    formData.append('file', payload.file);
    formData.append('paymentInstrumentId', payload.paymentInstrumentId);

    return createBatch(formData);
  };

  switch (modalType) {
    case MODAL_TYPE.UPLOAD: {
      const sampleOptions = getSampleOptions(preferences);
      const fileTypeOptions = getFileTypeOptions(preferences);

      return (
        <UploadFileModal
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          modalTitle="Upload Batch Transfer File"
          modalBody={
            Env.isTest() && (
              <Alert className="mb-2" type="warning" bordered rounded>
                <Alert.Content size="md">
                  <Text strong>Test Environment:</Text>
                  <Text>
                    Please use only test credentials available in our{' '}
                    <a
                      href="https://www.cashfree.com/docs/payouts/payouts/integrations/data-to-test"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-event-name="Link"
                    >
                      documentation
                    </a>{' '}
                    while using our Test Environment or calling our Sandbox
                    APIs.{' '}
                  </Text>
                </Alert.Content>
              </Alert>
            )
          }
          fileTypes={fileTypeOptions}
          checkList={UPLOAD_CHECK_LIST}
          options={sampleOptions}
          paymentInstruments={getFundSourcesOptions(fundSources)}
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
          eventNameOnConfirm="Primary_Batch_Transfers_File_Upload_Success"
          eventNameOnClose="Secondary_Batch_Transfers_File_Upload_Success"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.CANCEL:
      return (
        <AlertModal
          type="danger"
          title="File Upload Cancelled"
          eventNameOnConfirm="Primary_Batch_Transfers_File_Upload_Cancelled"
          eventNameOnClose="Secondary_Batch_Transfers_File_Upload_Cancelled"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.FAILED:
      return (
        <AlertModal
          type="danger"
          title="File Upload Failed"
          eventNameOnConfirm="Primary_Batch_Transfers_File_Upload_Failed"
          eventNameOnClose="Secondary_Batch_Transfers_File_Upload_Failed"
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
          eventNameOnConfirm="Primary_Batch_Transfers_File_Upload_Failed"
          eventNameOnClose="Secondary_Batch_Transfers_File_Upload_Failed"
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
          eventNameOnConfirm="Primary_Batch_Transfers_File_Upload_Errors_Found"
          eventNameOnClose="Secondary_Batch_Transfers_File_Upload_Errors_Found"
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

    case MODAL_TYPE.UNKNOWN:
      return (
        <AlertModal
          type="warning"
          title="Request received. Please check the status after some time."
          eventNameOnConfirm="Primary_Batch_Transfers_File_Upload_Unknown"
          eventNameOnClose="Secondary_Batch_Transfers_File_Upload_Unknown"
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    default:
      return null;
  }
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(Modals));
