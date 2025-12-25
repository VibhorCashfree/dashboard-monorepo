import React from 'react';
import _pick from 'lodash/pick';
import _startCase from 'lodash/startCase';
import moment from 'moment';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { FORMATS } from 'constants/date';

// Helpers
import { formattedDate } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

export const TAB_KEY = 'auditor';

const STATUSES = ['ACTIVE', 'DISABLED'];

export const options = [
  { text: 'Auditor Name', value: 'name' },
  { text: 'Email Address', value: 'email' },
  { text: 'Mobile Number', value: 'mobile' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'name',
    header: 'Full Name',
    cell: ({ name }) => name || '–',
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    cell: ({ email }) => email || '–',
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number',
    cell: ({ phone }) => phone || '–',
  },
  {
    accessorKey: 'updatedOn',
    header: 'Updated On',
    cell: ({ updatedOn }) => moment(updatedOn).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Auditor Status': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};
