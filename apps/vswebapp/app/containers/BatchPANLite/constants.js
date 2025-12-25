import React from 'react';
import _pick from 'lodash/pick';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';
import Icon from 'components/Icon';

export const TAB_KEY = 'batch';
export const REQUIRED_FIELDS = ['pan', 'name', 'dob'];

const STATUSES = [
  'PROCESSED',
  'PROCESSING',
  'REJECTED',
  'CANCELLED',
  'AWAITING_CONFIRMATION',
  'FAILURE',
];

export const options = [{ text: 'File Name', value: 'filename' }];

export const COLUMN_ID = [
  {
    accessorKey: 'addedOn',
    header: 'Uploaded At',
    cell: ({ addedOn }) => formattedDate(addedOn),
  },
  {
    accessorKey: 'fileName',
    header: 'File Name',
    cell: ({ fileName }) => (
      <Popup content={fileName} trigger={<span>{fileName}</span>} />
    ),
  },
  { accessorKey: 'totalEntries', header: 'Total Records' },
  { accessorKey: 'validEntries', header: 'Valid' },
  { accessorKey: 'invalidEntries', header: 'Invalid' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => (
      <>
        <StatusLabel>{status}</StatusLabel>{' '}
        {status === PROCESSING && (
          <Popup
            content="File can be downloaded even in processing state."
            trigger={
              <span>
                <Icon name="info" className="pointer ml-1" />
              </span>
            }
          />
        )}
      </>
    ),
  },
];

export const tableHeadings = [
  { key: 'addedOn', displayName: 'Uploaded At', width: 0.18 },
  { key: 'fileName', displayName: 'File Name', width: 0.14 },
  { key: 'totalEntries', displayName: 'Total Records', width: 0.1 },
  { key: 'validEntries', displayName: 'Valid', width: 0.08 },
  { key: 'invalidEntries', displayName: 'Invalid', width: 0.08 },
  { key: 'status', displayName: 'Status', width: 0.12 },
  { key: 'action', displayName: 'Download Report', width: 0.12 },
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
  VERIFY: 'VERIFY',
  VALID: 'VALID',
  INVALID: 'INVALID',
};

export const PROCESSING = 'PROCESSING';

export const UPLOAD_CHECK_LIST = [
  'Max no. of records: 10000',
  'Max file size: 5MB',
  'File type: .csv, .xlsx',
];
