import React from 'react';
import _pick from 'lodash/pick';
import _startCase from 'lodash/startCase';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

export const TAB_KEY = 'all';

const STATUSES = ['ACTIVE', 'REJECTED', 'CANCELLED', 'VERIFIED', 'EXPIRED'];

export const options = [{ text: 'Reference ID', value: 'referenceId' }];

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
  { accessorKey: 'phone', header: 'Phone Number' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};
