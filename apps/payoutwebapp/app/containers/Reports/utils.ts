import _get from 'lodash/get';

// Constants
import { FILE_TYPE, REGION } from 'constants/common';
import { REPORT_LIST } from './constants';

// Utils
import Region from 'utils/region';

// Types
import type { ReportType } from './types';

export const getConfigs = (
  isCashgramActivated: boolean,
  fundSources: AnyObject[],
) => {
  const region: string = Region.get();

  const hasReconReportPreference: boolean = fundSources.some(
    (fundSource) => _get(fundSource, 'preferences.ENABLE_RECON_REPORT') === '1',
  );

  const validReportTypes = REPORT_LIST.filter(
    (reportType: { type: string; name: string; hasFundSource?: boolean }) => {
      switch (reportType.type) {
        case 'CASHGRAM':
          return isCashgramActivated && region !== REGION.AE;

        case 'RECON_REPORT':
          return hasReconReportPreference;

        default:
          return true;
      }
    },
  );

  const labelByStatus: StringObject = validReportTypes.reduce(
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
  [FILE_TYPE.CSV, FILE_TYPE.XLS].map((type: FILE_TYPE) => ({
    text: FILE_TYPE[type],
    value: type,
  }));

export const isFundSourceValid = (
  formObj: AnyObject,
  reportType: ReportType,
): boolean => {
  const someChecked: boolean = Object.keys(formObj.fundSourcesCheckStatus).some(
    (fs) => formObj.fundSourcesCheckStatus[fs],
  );

  const fundSourceCheckboxCheck: boolean =
    !reportType.hasFundSource || someChecked;

  const fundSourceDropdownCheck: boolean =
    !['PO_ACCOUNT', 'RECON_REPORT'].includes(reportType.type) ||
    !!formObj.fundSourceId;

  return fundSourceCheckboxCheck && fundSourceDropdownCheck;
};
