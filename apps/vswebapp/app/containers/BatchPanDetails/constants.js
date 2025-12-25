import React from 'react';
import { Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Components
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

export const STATUSES = [
  'VALID',
  'INVALID',
  'REJECTED',
  'VERIFICATION_FAILED',
  'CANCELLED',
  'PROCESSING',
];

export const options = [
  { text: 'PAN', value: 'pan' },
  { text: 'Name Provided', value: 'nameProvided' },
  { text: 'PAN Ref. ID', value: 'referenceId' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'verifiedAt',
    header: 'Verified At',
    cell: ({ verifiedAt }) => formattedDate(verifiedAt),
  },
  {
    accessorKey: 'referenceId',
    header: 'PAN Ref. ID',
    cell: row => _get(row, 'id', '–'),
  },
  { accessorKey: 'pan', header: 'PAN', cell: row => _get(row, 'pan', '–') },
  {
    accessorKey: 'nameProvided',
    header: 'Name Provided',
    cell: ({ nameProvided }) =>
      rowPopup(
        nameProvided,
        <Popup content={nameProvided} trigger={<span>{nameProvided}</span>} />,
      ),
  },
  {
    accessorKey: 'registeredName',
    header: 'Registered Name',
    cell: ({ registeredName }) =>
      rowPopup(
        registeredName,
        <Popup
          content={registeredName}
          trigger={<span>{registeredName}</span>}
        />,
      ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];
