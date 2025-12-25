// Constants
import { FILE_TYPE } from 'constants/common';

export const TYPE_BY_MIME = {
  'text/csv': FILE_TYPE.CSV,
  'application/vnd.ms-excel': FILE_TYPE.XLS,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    FILE_TYPE.XLS,
  'application/pdf': FILE_TYPE.PDF,
};
