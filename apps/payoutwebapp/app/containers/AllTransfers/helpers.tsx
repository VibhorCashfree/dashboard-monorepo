import React from 'react';
import moment from 'moment';
import _capitalize from 'lodash/capitalize';

import { formatAmount } from 'utils/common';
import Region from 'utils/region';
import { UTR_LABEL } from 'constants/common';
import { FORMATS } from 'constants/date';
import StatusLabel from 'components/StatusLabel';

export const getFormattedRowData = () => [
  {
    accessorKey: 'addedOn',
    header: 'Initiated At',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'transferId',
    header: 'Transfer ID',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'paymentInstrumentId',
    header: 'Fund Source',
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
    accessorKey: 'mode',
    header: 'Method',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.mode || '–',
  },
  {
    accessorKey: 'utr',
    header: UTR_LABEL[Region.get()],
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      ['SUCCESS', 'FAILED', 'REVERSED'].includes(row.status)
        ? row.utr || '–'
        : '–',
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
    tooltip: true,
    tooltipContent: () =>
      'Acknowledgement from the beneficiary bank that the amount has been received.',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) =>
      row.acknowledged ? _capitalize(row.acknowledged as string) : '–',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
];
