import React from 'react';

// Components
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate } from 'helpers/common';

export const STATUSES = [
  'PROCESSING',
  'REJECTED',
  'AWAITING_CONFIRMATION',
  'CANCELLED',
  'SUCCESS',
  'FAILURE',
];

export const APPROVE_STATUSES = ['PENDING_APPROVAL', 'PARTIALLY_APPROVED'];

export const options = [
  { text: 'Id', value: 'referenceId' },
  // { text: 'UPI VPA', value: 'vpa' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'processedOn',
    header: 'Verified At',
    cell: ({ updatedOn }) => formattedDate(updatedOn),
  },
  {
    accessorKey: 'id',
    header: 'Id',
    width: 20,
  },
  {
    accessorKey: 'metaData.request.mobile_number',
    header: 'Mobile Number',
    cell: ({ metaData }) => metaData?.request?.mobile_number || '–',
  },
  {
    accessorKey: 'metaData.request.name',
    header: 'Name',
    cell: ({ metaData }) => metaData?.request?.name || '–',
  },
  {
    accessorKey: 'metaData.request.email',
    header: 'Email',
    cell: ({ metaData }) => metaData?.request?.email || '–',
  },
  {
    accessorKey: 'metaData.response.vpa',
    header: 'VPA',
    cell: ({ metaData }) => metaData?.response?.vpa || '–',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const MODAL_TYPES = {
  REJECT: 'REJECT',
  APPROVE: 'APPROVE',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
