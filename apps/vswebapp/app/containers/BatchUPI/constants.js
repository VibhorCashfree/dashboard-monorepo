import React from 'react';
import _pick from 'lodash/pick';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';
import Icon from 'components/Icon';

export const TAB_KEY = 'batch';

const STATUSES = ['SUCCESS', 'PROCESSING', 'REJECTED', 'CANCELLED'];

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
  { key: 'filename', displayName: 'File Name', width: 0.14 },
  { key: 'totalRecords', displayName: 'Total Records', width: 0.1 },
  { key: 'valid', displayName: 'Valid', width: 0.08 },
  { key: 'invalid', displayName: 'Invalid', width: 0.08 },
  { key: 'uploadedBy', displayName: 'Uploaded By', width: 0.12 },
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
};

export const PROCESSING = 'PROCESSING';
