import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';

export const getFormattedRowData = () => [
  {
    accessorKey: 'addedOn',
    header: 'Created At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'updatedOn',
    header: 'Updated At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.updatedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'cashgramId',
    header: 'Cashgram ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    textAlign: 'right',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => formatAmount(row.amount),
  },
  {
    accessorKey: 'name',
    header: 'Beneficiary Name',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'nameAtBank',
    header: 'Name At Bank',
    ellipsis: true,
    toolTip: true,
  },
  { accessorKey: 'phone', header: 'Phone No.', ellipsis: true, toolTip: true },
];
