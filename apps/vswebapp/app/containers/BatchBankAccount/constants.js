import React from 'react';
import { Popup } from '@cashfree-intl/coherent';
import _pick from 'lodash/pick';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

export const TAB_KEY = 'batch';

const STATUSES = [
  'SUCCESS',
  'PARTIALLY_APPROVED',
  'PROCESSING',
  'IN_PROCESS',
  'REJECTED',
  'MANUALLY_REJECTED',
  'CANCELLED',
  'APPROVAL_PENDING',
];

export const options = [{ text: 'File Name', value: 'filename' }];

export const COLUMN_ID = [
  {
    accessorKey: 'addedOn',
    header: 'Uploaded At',
    cell: ({ addedOn }) => formattedDate(addedOn),
  },
  {
    accessorKey: 'filename',
    header: 'File Name',
    cell: ({ filename }) => (
      <Popup content={filename} trigger={<span>{filename}</span>} />
    ),
  },
  { accessorKey: 'totalRecords', header: 'Total Records' },
  { accessorKey: 'valid', header: 'Valid' },
  { accessorKey: 'invalid', header: 'Invalid' },
  {
    accessorKey: 'uploadedBy',
    header: 'Uploaded By',
    cell: ({ uploadedBy }) =>
      rowPopup(
        uploadedBy,
        <Popup content={uploadedBy} trigger={<span>{uploadedBy}</span>} />,
      ),
  },
  { accessorKey: 'status', header: 'Status' },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const MODAL_TYPES = {
  CANCEL: 'CANCEL',
  SUCCESS: 'SUCCESS',
  UPLOAD: 'UPLOAD',
  FAILED: 'FAILED',
  FAILED_WITH_VALID: 'FAILED_WITH_VALID',
  FAILED_WITH_NO_VALID: 'FAILED_WITH_NO_VALID',
};
