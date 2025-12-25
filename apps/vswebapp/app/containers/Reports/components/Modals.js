import React from 'react';
import PropTypes from 'prop-types';
import { toast, ConfirmModal } from '@cashfree-intl/coherent';

// Services
import { deleteReport } from 'services/reports';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import GenerateReportModal from './GenerateReportModal';

const Modals = ({
  modalType,
  setModalType,
  setFetchCounter,
  setData,
  selectedRow,
  reportType,
  setReportType,
  labelByStatus,
}) => {
  const deleteReportById = async () => {
    const response = await deleteReport(selectedRow.id);

    if (!response.error) {
      setData(prev => {
        const newData = prev.data.filter(
          report => report.id !== selectedRow.id,
        );

        return { ...prev, count: prev.count - 1, data: newData };
      });

      toast.success(response.message);
    }
    setModalType();
  };

  switch (modalType) {
    case MODAL_TYPES.GENERATE:
      return (
        <GenerateReportModal
          reportType={reportType}
          setReportType={setReportType}
          labelByStatus={labelByStatus}
          onSubmit={() => {
            setReportType();
            setFetchCounter(count => count + 1);
          }}
          onClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.DELETE:
      return (
        <ConfirmModal
          title="Delete Report"
          confirmText="Delete"
          onClose={() => setModalType()}
          onConfirm={() => deleteReportById()}
          danger
        >
          <p>
            Are you sure you want to delete the {selectedRow.reportName} report?
          </p>
        </ConfirmModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  selectedRow: PropTypes.object,
  reportType: PropTypes.object.isRequired,
  setReportType: PropTypes.func.isRequired,
  labelByStatus: PropTypes.object.isRequired,
};

export default Modals;
