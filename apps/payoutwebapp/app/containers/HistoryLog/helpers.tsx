import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';
import { TYPE_MAP } from './constants';

export const getFormattedRowData = (type: string, header: string) => [
  {
    accessorKey: 'addedOn',
    header: 'Date & Time',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'value',
    header,
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      type === TYPE_MAP.PUBLIC_KEYS ? 'xxxxxxxxxxxxxxxx' : row.value,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    textAlign: 'center',
  },
  { accessorKey: 'userName', header: 'User', ellipsis: true, toolTip: true },
];
