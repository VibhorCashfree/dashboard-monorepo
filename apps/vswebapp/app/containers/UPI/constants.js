import React from 'react';
import _pick from 'lodash/pick';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

const STATUSES = [
  'VALID',
  'INVALID',
  'UNABLE_TO_VALIDATE',
  'PENDING',
  'REQUEST_TIMED_OUT',
];

export const options = [
  { text: 'UPI VPA', value: 'vpa' },
  { text: 'Verification ID', value: 'verificationId' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'processedOn',
    header: 'Verified At',
    cell: ({ processedOn }) => formattedDate(processedOn),
  },
  {
    accessorKey: 'verificationId',
    header: 'Verification ID',
    cell: ({ verificationId }) =>
      rowPopup(
        verificationId,
        <Popup
          content={verificationId}
          trigger={<span>{verificationId}</span>}
        />,
      ),
  },
  {
    accessorKey: 'vpa',
    header: 'UPI VPA',
    cell: ({ vpa }) => <Popup content={vpa} trigger={<span>{vpa}</span>} />,
  },
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
    accessorKey: 'nameAtBank',
    header: 'Name At Bank',
    cell: ({ nameAtBank }) =>
      rowPopup(
        nameAtBank,
        <Popup content={nameAtBank} trigger={<span>{nameAtBank}</span>} />,
      ),
  },
  {
    accessorKey: 'accountStatus',
    header: 'Status',
    cell: ({ accountStatus }) => <StatusLabel>{accountStatus}</StatusLabel>,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ reason }) =>
      rowPopup(
        reason,
        <Popup content={reason} trigger={<span>{reason}</span>} />,
      ),
  },
];

export const tableHeadings = [
  { key: 'processedOn', displayName: 'Verified At', width: 0.18 },
  { key: 'verificationId', displayName: 'Verification ID', width: 0.1 },
  { key: 'vpa', displayName: 'UPI VPA', width: 0.1 },
  { key: 'nameProvided', displayName: 'Name Provided', width: 0.12 },
  { key: 'nameAtBank', displayName: 'Name At Bank', width: 0.13 },
  { key: 'accountStatus', displayName: 'Status', width: 0.12 },
  { key: 'reason', displayName: 'Reason', width: 0.15 },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  Status: {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const REQUIRED_FIELDS = ['vpa'];

export const MODAL_TYPES = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  NOT_EXIST: 'NOT_EXIST',
  VERIFY: 'VERIFY',
};
