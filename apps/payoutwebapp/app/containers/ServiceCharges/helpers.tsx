import moment from 'moment';

// Constants
import { UTR_LABEL } from 'constants/common';
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';
import Region from 'utils/region';

export const getFormattedRowData = () => [
  {
    accessorKey: 'processedOn',
    header: 'Date & Time',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject): string =>
      moment(row.processedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'utr',
    header: UTR_LABEL[Region.get()],
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject): string => row.utr || '–',
  },
  {
    accessorKey: 'amount',
    header: 'Debit Amount',
    textAlign: 'right',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject): string => formatAmount(row.amount),
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    ellipsis: true,
    toolTip: true,
  },
];
