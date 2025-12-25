import React from 'react';
import moment from 'moment';

// Utils
import { formatAmount } from 'utils/common';

// Components
import StatusLabel from 'components/StatusLabel';

export const getFormattedRowData = () => [
  {
    accessorKey: 'agreement_id',
    header: 'Agreement ID',
    ellipsis: true,
    toolTip: true,
  },
  { accessorKey: 'purpose', header: 'Purpose', ellipsis: true, toolTip: true },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.start_date).format('DD MMM YYYY'),
  },
  {
    accessorKey: 'expiry_date',
    header: 'Expiry Date',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.expiry_date).format('DD MMM YYYY'),
  },
  {
    accessorKey: 'total_amount',
    header: 'Amount',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => formatAmount(row.total_amount),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
];
