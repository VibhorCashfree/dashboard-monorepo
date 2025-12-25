import React from 'react';

// Components
import StatusLabel from 'components/StatusLabel';

// Utils
import { formatAmount } from 'utils/common';

export const getFormattedRowData = (hasBatchPreference: boolean) => {
  const columns = [
    {
      accessorKey: 'expiry',
      header: 'Valid Till',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.expiry || '–',
    },
    {
      accessorKey: 'cashgramId',
      header: 'Cashgram ID',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.cashgramId || '–',
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
      cell: (row: AnyObject) => row.name || '–',
    },
    {
      accessorKey: 'phone',
      header: 'Phone No.',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.phone || '–',
    },
    {
      accessorKey: 'approvals',
      header: 'Approvals',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) =>
        `${row.approvalCount}/${row.totalApprovalCount}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
    },
  ];

  return hasBatchPreference
    ? columns.filter((column) => column.accessorKey !== 'approvals')
    : columns;
};
