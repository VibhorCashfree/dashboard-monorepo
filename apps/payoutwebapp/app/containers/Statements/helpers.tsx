import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';
import { REGION } from 'constants/common';

// Utils
import { formatAmount } from 'utils/common';
import Region from 'utils/region';

export const getFormattedRowData = (details: AnyObject) => [
  {
    accessorKey: 'txTime',
    header: 'Date & Time',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      (Region.get() === REGION.IN
        ? moment(row.txTime).subtract(5.5, 'hours')
        : moment(row.txTime)
      ).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'maskedEventType',
    header: 'Event Type',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'debit',
    header: 'Debit',
    textAlign: 'right',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      row.event === 'DEBIT' ? formatAmount(row.amount, details.currency) : '–',
  },
  {
    accessorKey: 'credit',
    header: 'Credit',
    textAlign: 'right',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      row.event === 'CREDIT' ? formatAmount(row.amount, details.currency) : '–',
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'closingBalance',
    header: 'Closing Balance',
    textAlign: 'right',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      formatAmount(row.closingBalance, details.currency),
  },
];
