// Constants
import { MODAL_TYPE } from './constants';

export type ReportsProps = {
  fundSources: AnyObject[];
};

export type TriggerRangeProps = {
  open: boolean;
  currentDate: string;
  dateValue: DateRangeValue;
  options: Array<any>;
};

export type ReportColumn = {
  label: string;
  type: string;
  checked: boolean;
};

export type ReportType = {
  text: string;
  type: string;
  allChecked: boolean;
  columns: ReportColumn[];
  hasFundSource: boolean;
};

export type GenerateReportModalProps = {
  reportType: ReportType;
  fundSources: AnyObject[];
  onClose: () => void;
  onColumnChange: (type: ReportColumn['type'], checked: boolean) => void;
  onSubmit?: () => void;
  onFundSourceChange: (fsDisplayType: string) => void;
};

export type ModalsProps = {
  configs: AnyObject;
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  selectedRow?: AnyObject;
  reportType: ReportType;
  setReportType: React.Dispatch<React.SetStateAction<ReportType>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
};
