import React from 'react';
import { ConfirmModal } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { deleteReport } from 'services/reports';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import GenerateReportModal from './GenerateReportModal';

// Types
import type { ModalsProps, ReportColumn } from '../types';

const Modals: React.FC<ModalsProps> = ({
  configs,
  modalType,
  setModalType,
  selectedRow,
  reportType,
  setReportType,
  setFetchCounter,
}) => {
  const { labelByStatus, validReportTypes } = configs;

  const handleFundSourceChange = () => {
    setReportType((prev) => {
      const reportType = validReportTypes.find(
        (report: any) => report.type === prev.type,
      );

      return {
        ...prev,
        columns: reportType!.columns.map((column: any) => ({
          label: column.name,
          type: column.value,
          checked: true,
        })),
      };
    });
  };

  const handleColumnChange = (name: string, checkStatus: boolean) => {
    let newColumns: ReportColumn[];
    let allChecked: boolean;

    if (name === 'ALL') {
      newColumns = reportType.columns.map((column) => ({
        ...column,
        checked: checkStatus,
      }));

      allChecked = checkStatus;
    } else {
      newColumns = reportType.columns.map((column) => {
        if (column.type === name) {
          return { ...column, checked: !column.checked };
        }
        return column;
      });

      allChecked = newColumns.every((item) => item.checked);
    }

    setReportType((prev) => ({
      ...prev,
      allChecked,
      columns: newColumns,
    }));
  };

  const deleteReportById = async () => {
    const response = await deleteReport(selectedRow!.id);

    if (!('error' in response)) {
      setFetchCounter((count: number) => count + 1);
    }

    setModalType(MODAL_TYPE.EMPTY);
  };

  switch (modalType) {
    case MODAL_TYPE.GENERATE:
      return (
        <GenerateReportModal
          reportType={reportType}
          labelByStatus={labelByStatus}
          onColumnChange={handleColumnChange}
          onSubmit={() => {
            window.location.reload();
          }}
          onFundSourceChange={handleFundSourceChange}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        />
      );

    case MODAL_TYPE.DELETE:
      return (
        <ConfirmModal
          danger
          title="Delete Report"
          confirmText="Delete"
          confirmBtnEvent="Primary_Delete_Report"
          closeBtnEvent="Secondary_Delete_Report"
          closeCrossEvent="Close_Icon_Delete_Report"
          onConfirm={() => deleteReportById()}
          onClose={() => setModalType(MODAL_TYPE.EMPTY)}
        >
          <p>
            Are you sure you want to delete the {selectedRow?.reportName}{' '}
            report?
          </p>
        </ConfirmModal>
      );

    default:
      return null;
  }
};

export default withErrorBoundary(Modals);
