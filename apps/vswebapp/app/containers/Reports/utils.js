// Constants
import { defaultReportTypes, FILE_EXTENSIONS, VKYC_REPORTS } from './constants';

// Utils
import AccountId from 'utils/accountId';

export const getConfigs = activated => {
  const validReportTypes = defaultReportTypes.filter(reportType => {
    switch (reportType.type) {
      case 'BANK_VALIDATION':
        return activated?.bav;

      case 'PAN_VERIFICATION':
        return activated?.pan;

      case 'AADHAAR_VERIFICATION':
        return activated?.okyc;

      case 'GSTIN_VERIFICATION':
        return activated?.gstIn;

      case 'IFSC_VERIFICATION':
        return activated?.ifsc;

      case 'UPI_VALIDATION':
        return ['50895', '8784', '440201', '51826', '57678'].includes(
          AccountId.get(),
        );

      default:
        return true;
    }
  });

  const labelByStatus = validReportTypes.reduce(
    (acc, reportType) => ({ ...acc, [reportType.type]: reportType.name }),
    {},
  );

  const filtersConfig = {
    'Report Type': {
      columns: 2,
      items: Object.keys(labelByStatus),
    },
  };

  return {
    labelByStatus,
    filtersConfig,
    validReportTypes,
  };
};

export const getFileFormatOptions = () =>
  Object.keys(FILE_EXTENSIONS).map(extension => ({
    text: FILE_EXTENSIONS[extension],
    value: extension,
  }));

export const getVKYCOptions = () =>
  VKYC_REPORTS.map(report => ({
    text: report.name,
    value: report.type,
  }));

export const getReportColumns = (reportType, preferences) => {
  if (
    ['BANK_VALIDATION', 'ACCOUNT'].includes(reportType.type) &&
    !preferences.showAmountDeposited
  ) {
    return reportType.columns.filter(
      column => !['AMOUNT_DEPOSITED', 'AMOUNT'].includes(column.type),
    );
  }

  return reportType.columns;
};
