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
    accessorKey: 'metaData.request.pan',
    header: 'PAN',
    cell: ({ metaData }) => metaData?.request?.pan || '–',
  },
  {
    accessorKey: 'metaData.request.name',
    header: 'Name Provided',
    cell: ({ metaData }) => metaData?.request?.name || '–',
  },
  {
    accessorKey: 'metaData.response.registered_name',
    header: 'Registered Name',
    cell: ({ metaData }) => metaData?.response?.registered_name || '–',
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
