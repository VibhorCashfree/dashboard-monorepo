import React from 'react';

// Components
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate } from 'helpers/common';

export const STATUSES = [
  'VALID',
  'INVALID',
  'PENDING',
  'UNABLE_TO_VALIDATE',
  'PROCESSING',
  'CANCELLED',
  'PARTIALLY_APPROVED',
  'PENDING_APPROVAL',
  'MANUALLY_REJECTED',
  'REJECTED',
];

export const APPROVE_STATUSES = ['PENDING_APPROVAL', 'PARTIALLY_APPROVED'];

export const options = [
  { text: 'Verification ID', value: 'verificationId' },
  { text: 'UPI VPA', value: 'vpa' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'processedOn',
    header: 'Verified At',
    cell: processedOn => formattedDate(processedOn),
  },
  { accessorKey: 'verificationId', header: 'Verification ID' },
  { accessorKey: 'vpa', header: 'VPA', cell: ({ vpa }) => vpa || '–' },
  {
    accessorKey: 'nameAtBank',
    header: 'Name At Bank',
    cell: ({ nameAtBank }) => nameAtBank || '–',
  },
  {
    accessorKey: 'accountStatus',
    header: 'Account Status',
    cell: ({ accountStatus }) => <StatusLabel>{accountStatus}</StatusLabel>,
  },
];

export const MODAL_TYPES = {
  REJECT: 'REJECT',
  APPROVE: 'APPROVE',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
