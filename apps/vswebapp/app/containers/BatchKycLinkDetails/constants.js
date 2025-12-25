import React from 'react';
import _pick from 'lodash/pick';
import _startCase from 'lodash/startCase';
import _get from 'lodash/get';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

const STATUSES = ['ACTIVE', 'REJECTED', 'CANCELLED', 'VERIFIED', 'EXPIRED'];

export const APPROVE_STATUSES = ['APPROVAL_PENDING', 'PARTIALLY_APPROVED'];

export const options = [{ text: 'Reference ID', value: 'referenceId' }];

export const MODAL_TYPES = {
  REJECT: 'REJECT',
  APPROVE: 'APPROVE',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const COLUMN_ID = [
  {
    accessorKey: 'addedOn',
    header: 'Created On',
    cell: ({ addedOn }) => formattedDate(addedOn),
  },
  { accessorKey: 'id', header: 'Reference ID' },
  {
    accessorKey: 'templateName',
    header: 'Template Name',
    cell: ({ templateName }) => _startCase(templateName) || '–',
  },
  { accessorKey: 'name', header: 'Name', cell: ({ name }) => name || '–' },
  {
    accessorKey: 'phone',
    header: 'Phone Number',
    cell: row => _get(row, 'phone', '–'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];
