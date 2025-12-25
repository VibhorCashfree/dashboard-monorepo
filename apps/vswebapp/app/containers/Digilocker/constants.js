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
  'PENDING',
  'EXPIRED',
  'REJECTED',
  'AUTHENTICATED',
  'CONSENT_DENIED',
];

export const options = [{ text: 'Verification ID', value: 'verificationId' }];

export const COLUMN_ID = [
  {
    accessorKey: 'verificationId',
    header: 'Verification ID',
  },
  {
    accessorKey: 'userName',
    header: 'Name',
    cell: ({ details }) =>
      rowPopup(
        details?.name,
        <Popup
          content={details?.name}
          trigger={<span>{details?.name}</span>}
        />,
      ),
  },
  {
    accessorKey: 'userGender',
    header: 'Gender',
    cell: ({ details }) => _get(GENDER, [details?.gender], '–'),
  },
  {
    accessorKey: 'userDOB',
    header: 'Date of Birth',
    cell: ({ details }) => details?.dob || '–',
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
  VERIFY: 'VERIFY',
  VALID: 'VALID',
  INVALID: 'INVALID',
  ACCESS_ESTABLISHED: 'ACCESS_ESTABLISHED',
  FAILED_ACCESS: 'FAILED_ACCESS',
};

export const VERIFICATION_TYPES = [
  {
    type: 'AADHAAR',
    icon: 'Aadhaar',
    text: 'Aadhaar',
  },
  {
    type: 'PAN',
    icon: 'Pan',
    text: 'Pan',
  },
  {
    type: 'DRIVING_LICENSE',
    icon: 'DL',
    text: 'Driving License',
  },
];
