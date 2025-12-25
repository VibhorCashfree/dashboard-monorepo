import React from 'react';
import _pick from 'lodash/pick';
import _keys from 'lodash/keys';
import { Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

export const TAB_KEY = 'all';

const STATUSES = ['VALID', 'INVALID', 'REJECTED', 'VERIFICATION_FAILED'];

export const PAN_TYPES = {
  Individual: 'P',
  Company: 'C',
  Firm: 'F',
  Trust: 'T',
  'Local Authority': 'L',
  'Hindu Unified Family': 'H',
  'Association of Persons': 'A',
  'Body of Individuals': 'B',
};

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
    accessorKey: 'verificationId',
    header: 'PAN Ref. ID',
    cell: ({ id }) => id || '–',
  },
  { accessorKey: 'pan', header: 'PAN' },
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
    ellipsis: true,
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
    cell: row =>
      rowPopup(
        row.type,
        <Popup content={row.type} trigger={<span>{row.type}</span>} />,
      ),
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
  'PAN Type': {
    columns: 2,
    items: Object.keys(PAN_TYPES),
  },
};

export const REQUIRED_FIELDS = ['pan'];

export const extraChipConfig = {
  prefix: 'PAN Type',
  values: _keys(PAN_TYPES),
};

export const MODAL_TYPES = {
  VERIFY: 'VERIFY',
  FAILED: 'FAILED',
  VALID: 'VALID',
  INVALID: 'INVALID',
};
