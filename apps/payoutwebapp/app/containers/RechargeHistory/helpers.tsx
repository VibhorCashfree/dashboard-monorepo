import React from 'react';
import moment from 'moment';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { FORMATS } from 'constants/date';
import { STATUS } from './constants';

// Components
import StatusLabel from 'components/StatusLabel';

export const getFormattedRowData = (details: AnyObject) => [
  {
    accessorKey: 'addedon',
    header: 'Initiated At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      row.addedon ? moment(row.addedon).format(FORMATS.TIMESTAMP) : '–',
  },
  {
    accessorKey: 'updatedon',
    header: 'Updated At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      row.updatedon ? moment(row.updatedon).format(FORMATS.TIMESTAMP) : '–',
  },
  {
    accessorKey: 'utr',
    header: 'UTR No.',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => (row.status === STATUS.SUCCESS ? row.utr : '–'),
  },
  {
    accessorKey: 'amount',
    header: 'Recharge Amount',
    textAlign: 'right',
    ellipsis: true,
    cell: (row: AnyObject) => formatAmount(row.amount, details.currency),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.reason || '–',
  },
];
