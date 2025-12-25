import React from 'react';
import moment from 'moment';
import _capitalize from 'lodash/capitalize';

// Utils
import { formatAmount } from 'utils/common';
import Region from 'utils/region';

// Components
import StatusLabel from 'components/StatusLabel';

// Constants
import { UTR_LABEL } from 'constants/common';
import { FORMATS } from 'constants/date';
import { keysMap } from './constants';

export const getFormattedRowData = (
  batchRowDetails: AnyObject,
  hasBatchPreference: boolean,
) => {
  const columns = [
    {
      accessorKey: 'addedOn',
      header: 'Initiated At',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) =>
        row.addedOn ? moment(row.addedOn).format(FORMATS.TIMESTAMP) : '–',
    },
    {
      accessorKey: 'transferId',
      header: 'Transfer ID',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'email',
      header: 'Email ID',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'bankAccount',
      header: 'Bank A/c No.',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'beneficiaryId',
      header: 'Beneficiary ID',
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
      accessorKey: 'transferMode',
      header: 'Method',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => {
        if (batchRowDetails.fileType === 'CFTRANSFER_PAYTM') {
          return 'PAYTM';
        } else if (row.transferMode === 'AMZN_UPI') {
          return 'Amazon Pay Wallet';
        }

        return row.transferMode || '–';
      },
    },
    {
      accessorKey: 'name',
      header: 'Name Provided',
      ellipsis: true,
      toolTip: true,
    },
    {
      accessorKey: 'utr',
      header: UTR_LABEL[Region.get()],
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) =>
        ['SUCCESS', 'FAILED', 'REVERSED'].includes(row.status) ? row.utr : '',
    },
    {
      accessorKey: 'phone',
      header: 'Phone No.',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.phone || '–',
    },
    {
      accessorKey: 'vpa',
      header: 'UPI VPA',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.vpa || '–',
    },
    {
      accessorKey: 'iban',
      header: 'IBAN',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.iban || '–',
    },
    {
      accessorKey: 'ifsc',
      header: 'IFSC',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.ifsc || '–',
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
      accessorKey: 'amount',
      header: 'Amount',
      textAlign: 'right',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => formatAmount(row.amount, row.currencyCode),
    },
    {
      accessorKey: 'acknowledged',
      header: 'Ackd.',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) =>
        row.acknowledged ? _capitalize(row.acknowledged) : '–',
    },
    {
      accessorKey: 'remarks',
      header: 'Remarks',
      ellipsis: true,
      toolTip: true,
      cell: (row: AnyObject) => row.remarks || '–',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
    },
  ];

  const statusKey =
    batchRowDetails.status === 'PROCESSED' ? 'PROCESSED' : 'OTHERS';
  const keys =
    keysMap[
      (batchRowDetails.fileType as keyof typeof keysMap) || 'CFTRANSFER_ACCOUNT'
    ][statusKey];

  const filteredColumns = columns.filter((column) =>
    keys.includes(column.accessorKey),
  );

  return hasBatchPreference
    ? filteredColumns.filter((column) => column.accessorKey !== 'approvals')
    : filteredColumns;
};
