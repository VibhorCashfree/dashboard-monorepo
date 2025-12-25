import React from 'react';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';
import { GENDER } from 'constants/common';

// Components
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

const STATUSES = [
  'VALID',
  'INVALID',
  'VERIFICATION_FAILED',
  'OTP_EXPIRED',
  'INITIATED',
];

export const options = [
  { text: 'Verification ID', value: 'verificationId' },
  { text: 'Name', value: 'name' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'processedOn',
    header: 'Verified At',
    cell: ({ processedOn }) => formattedDate(processedOn),
  },
  {
    accessorKey: 'refId',
    header: 'Reference ID',
  },
  {
    accessorKey: 'name',
    header: 'Name on Aadhaar',
    cell: ({ name }) =>
      rowPopup(name, <Popup content={name} trigger={<span>{name}</span>} />),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ gender }) => _get(GENDER, [gender], '–'),
  },
  {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ dob }) => dob || '–',
  },
  {
    accessorKey: 'address',
    header: 'State',
    cell: row => _get(row, 'splitAddress.state') || '–',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  Status: {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const REQUIRED_FIELDS = ['aadhaarNo'];

export const INITIAL_AUTH_INFO = {
  errorType: '',
  timerInSeconds: 45,
};

export const MODAL_TYPES = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  VERIFY: 'VERIFY',
};
