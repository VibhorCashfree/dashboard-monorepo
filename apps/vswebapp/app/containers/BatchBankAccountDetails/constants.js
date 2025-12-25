import React from 'react';
import _get from 'lodash/get';
import StatusLabel from 'components/StatusLabel';
import { formattedDate } from 'helpers/common';

export const STATUSES = [
  'VALID',
  'INVALID',
  'APPROVAL_PENDING',
  'PARTIALLY_APPROVED',
  'REJECTED',
  'CANCELLED',
  'MANUALLY_REJECTED',
  'FAILURE',
  'RECEIVED',
];

export const APPROVE_STATUSES = ['APPROVAL_PENDING', 'PARTIALLY_APPROVED'];

export const options = [
  { text: 'Bank A/c Number', value: 'bankAccount' },
  { text: 'Verification ID', value: 'verificationId' },
  { text: 'UTR No.', value: 'utr' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'processedOn',
    header: 'Verified At',
    cell: ({ processedOn }) => formattedDate(processedOn),
  },
  {
    accessorKey: 'verificationId',
    header: 'Verification ID',
    cell: row => _get(row, 'verificationId', '–'),
  },
  {
    accessorKey: 'bankAccount',
    header: 'Bank A/c No.',
    cell: row => _get(row, 'bankAccount', '–'),
  },
  { accessorKey: 'ifsc', header: 'IFSC', cell: row => _get(row, 'ifsc', '–') },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: row => _get(row, 'phone', '–'),
  },
  { accessorKey: 'nameProvided', header: 'Name Provided' },
  {
    accessorKey: 'nameAtBank',
    header: 'Name At Bank',
    cell: row => _get(row, 'nameAtBank', '–'),
  },
  {
    accessorKey: 'accountStatus',
    header: 'Account Status',
    cell: row => <StatusLabel>{row.accountStatus}</StatusLabel>,
  },
];

export const allTableHeadings = [
  { key: 'processedOn', displayName: 'Verified At' },
  { key: 'verificationId', displayName: 'Verification ID' },
  { key: 'bankAccount', displayName: 'Bank A/c No.' },
  { key: 'ifsc', displayName: 'IFSC' },
  { key: 'phone', displayName: 'Phone' },
  { key: 'nameProvided', displayName: 'Name Provided' },
  { key: 'nameAtBank', displayName: 'Name At Bank' },
  { key: 'accountStatus', displayName: 'Account Status' },
];

export const MODAL_TYPES = {
  REJECT: 'REJECT',
  APPROVE: 'APPROVE',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
