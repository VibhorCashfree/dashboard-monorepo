import moment from 'moment';
import _capitalize from 'lodash/capitalize';
import _startCase from 'lodash/startCase';

// Constants
import { CURRENCY, UTR_LABEL } from 'constants/common';
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';
import Region from 'utils/region';

export const getFormattedRowData = () => [
  {
    accessorKey: 'processedOn',
    header: 'Reversed At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject): string =>
      moment(row.processedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'transferId',
    header: 'Transfer ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'referenceId',
    header: 'CF Ref ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'utr',
    header: UTR_LABEL[Region.get()],
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    textAlign: 'right',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject): string =>
      formatAmount(row.amount, row.currency as CURRENCY),
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject): string =>
      row.reason ? _capitalize(_startCase(row.reason)) : '–',
  },
];
