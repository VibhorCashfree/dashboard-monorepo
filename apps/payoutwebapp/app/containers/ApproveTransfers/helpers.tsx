import React from 'react';
import moment from 'moment';

// Components
import StatusLabel from 'components/StatusLabel';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import { formatAmount } from 'utils/common';

export const getFormattedRowData = () => [
  {
    accessorKey: 'transferId',
    header: 'Transfer ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'addedOn',
    header: 'Initiated At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'beneName',
    header: 'Name',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.beneName || '–',
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank Account',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.bankAccount || '–',
  },
  {
    accessorKey: 'ifsc',
    header: 'IFSC',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.ifsc || '–',
  },
  {
    accessorKey: 'mode',
    header: 'Method',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.mode || '–',
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
    accessorKey: 'status',
    header: 'Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
];
