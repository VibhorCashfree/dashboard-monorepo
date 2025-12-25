import React from 'react';
import _pick from 'lodash/pick';
import _keys from 'lodash/keys';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

const STATUSES = ['VALID', 'INVALID', 'VERIFICATION_FAILED'];

export const TAX_PAYER_TYPE = {
  Regular: 'Regular',
  Composite: 'Composite',
  Exempted: 'Exempted',
};

export const options = [
  { text: 'GSTIN', value: 'gstIn' },
  { text: 'GSTIN Ref. ID', value: 'gstInRefId' },
  { text: 'Name of Business', value: 'nameOfBusiness' },
  { text: 'Legal Name of Business', value: 'legalNameOfBusiness' },
  { text: 'GSTIN Status', value: 'gstInStatus' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'verifiedAt',
    header: 'Verified At',
    cell: ({ verifiedAt }) => formattedDate(verifiedAt),
  },
  {
    accessorKey: 'verificationId',
    header: 'GSTIN Ref. ID',
    cell: ({ referenceId }) =>
      rowPopup(
        referenceId,
        <Popup content={referenceId} trigger={<span>{referenceId}</span>} />,
      ),
  },
  { accessorKey: 'GSTIN', header: 'GSTIN' },
  {
    accessorKey: 'nameOfBusiness',
    header: 'Name of Business',
    cell: ({ nameOfBusiness }) => nameOfBusiness || '–',
  },
  {
    accessorKey: 'legalNameOfBusiness',
    header: 'Legal Name of Business',
    cell: ({ legalNameOfBusiness }) => legalNameOfBusiness || '–',
  },
  {
    accessorKey: 'taxPayerType',
    header: 'Tax Payer Type',
    cell: ({ taxPayerType }) => taxPayerType || '–',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES, TAX_PAYER_TYPE);

export const filtersConfig = {
  'Tax Payer Type': {
    columns: 3,
    items: _keys(TAX_PAYER_TYPE),
  },
  Status: {
    columns: 2,
    items: _keys(labelByStatus),
  },
};

export const extraChipConfig = {
  prefix: 'Tax Payer Type',
  values: _keys(TAX_PAYER_TYPE),
};

export const REQUIRED_FIELDS = ['gstIn'];

export const MODAL_TYPES = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  NOT_EXIST: 'NOT_EXIST',
  VERIFY: 'VERIFY',
};
