import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';

export const getFormattedRowData = () => [
  {
    accessorKey: 'tx_time',
    header: 'Date & Time',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.tx_time).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'masked_event_type',
    header: 'Event Type',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'debit',
    header: 'Debit',
    ellipsis: true,
    toolTip: true,
    textAlign: 'right',
    cell: (row: AnyObject) =>
      row.event === 'DEBIT' ? formatAmount(row.amount) : '–',
  },
  {
    accessorKey: 'credit',
    header: 'Credit',
    ellipsis: true,
    toolTip: true,
    textAlign: 'right',
    cell: (row: AnyObject) =>
      row.event === 'CREDIT' ? formatAmount(row.amount) : '–',
  },
  { accessorKey: 'remarks', header: 'Remarks', ellipsis: true, toolTip: true },
  {
    accessorKey: 'closing_balance',
    header: 'Closing Balance',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => formatAmount(row.closing_balance),
  },
];
