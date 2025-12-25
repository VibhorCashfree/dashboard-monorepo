import React from 'react';
import { Popup } from '@cashfree-intl/coherent';

// Components
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

export const TAB_KEY = 'approve-batch';

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
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];
