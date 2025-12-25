import React from 'react';
import moment from 'moment';
import { Popup } from '@cashfree-intl/coherent';

// Components
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';

// Styled
import { HoverCopy } from 'styled/common';

export const getFormattedRowData = () => [
  {
    accessorKey: 'addedOn',
    header: 'Added On',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => moment(row.addedOn).format('DD MMM YYYY'),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    ellipsis: true,
    toolTip: true,
  },
  {
    accessorKey: 'beneId',
    header: 'Beneficiary ID',
    ellipsis: true,
    cell: (row: AnyObject) => (
      <Popup
        content={row.beneId}
        trigger={
          <HoverCopy>
            <span>{row.beneId}</span>
            <Copy value={row.beneId} />
          </HoverCopy>
        }
      />
    ),
  },
  {
    accessorKey: 'vpa',
    header: 'UPI Vpa',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.vpa || '–',
  },
  {
    accessorKey: 'email',
    header: 'Email ID',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.email || '–',
  },
  {
    accessorKey: 'ifsc',
    header: 'IFSC',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.ifsc || '–',
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank Account',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.bankAccount || '–',
  },
  {
    accessorKey: 'benePurpose',
    header: 'Beneficiary Purpose',
    ellipsis: true,
    toolTip: true,
    cell: (row: AnyObject) => row.benePurpose || '–',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row: AnyObject) => <StatusLabel>{row.status}</StatusLabel>,
  },
];
