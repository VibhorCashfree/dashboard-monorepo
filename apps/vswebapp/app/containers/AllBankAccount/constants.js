import React from 'react';
import _pick from 'lodash/pick';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate, rowPopup } from 'helpers/common';

// Components
import NameMatchLabel from 'components/NameMatchLabel';
import StatusLabel from 'components/StatusLabel';

export const TAB_KEY = 'all';

const STATUSES = [
  'VALID',
  'INVALID',
  'APPROVAL_PENDING',
  'PARTIALLY_APPROVED',
  'REJECTED',
  'CANCELLED',
  'MANUALLY_REJECTED',
  'FAILURE',
  'RECEIVED',
];

export const options = [
  { text: 'Bank A/c Number', value: 'bankAccount' },
  { text: 'Verification ID', value: 'verificationId' },
  { text: 'UTR No.', value: 'utr' },
];

export const COLUMN_ID = [
  {
    accessorKey: 'processedOn',
    header: 'Verified At',
    cell: ({ processedOn }) =>
      rowPopup(
        processedOn,
        <Popup
          content={formattedDate(processedOn)}
          trigger={<span>{formattedDate(processedOn)}</span>}
        />,
      ),
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
    accessorKey: 'bankAccount',
    header: 'Bank A/c No.',
    cell: ({ bankAccount }) =>
      rowPopup(
        bankAccount,
        <Popup content={bankAccount} trigger={<span>{bankAccount}</span>} />,
      ),
  },
  {
    accessorKey: 'ifsc',
    header: 'IFSC',
    cell: ({ ifsc }) =>
      rowPopup(ifsc, <Popup content={ifsc} trigger={<span>{ifsc}</span>} />),
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
    header: 'Name at Bank',
    cell: ({ nameAtBank }) =>
      rowPopup(
        nameAtBank,
        <Popup content={nameAtBank} trigger={<span>{nameAtBank}</span>} />,
      ),
  },
  {
    accessorKey: 'nameMatchResult',
    header: 'Name Match Result',
    cell: ({ nameMatchScore, nameMatchResult }) =>
      nameMatchScore && nameMatchResult !== '-' ? (
        <NameMatchLabel score={nameMatchScore} result={nameMatchResult} />
      ) : (
        '–'
      ),
  },
  {
    accessorKey: 'accountStatus',
    header: 'Account Status',
    cell: ({ accountStatus }) => <StatusLabel>{accountStatus}</StatusLabel>,
  },
];

export const tableHeadings = [
  { key: 'processedOn', displayName: 'Verified At', width: 0.13 },
  { key: 'verificationId', displayName: 'Verification ID', width: 0.1 },
  { key: 'bankAccount', displayName: 'Bank A/c No.', width: 0.13 },
  { key: 'ifsc', displayName: 'IFSC', width: 0.12 },
  { key: 'nameProvided', displayName: 'Name Provided', width: 0.13 },
  { key: 'nameAtBank', displayName: 'Name at Bank', width: 0.13 },
  { key: 'nameMatchResult', displayName: 'Name Match Result', width: 0.15 },
  { key: 'accountStatus', displayName: 'Account Status', width: 0.12 },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  'Status Filter': {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const REQUIRED_FIELDS = ['bank_account', 'ifsc'];

export const MODAL_TYPES = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  REJECTED: 'REJECTED',
  FAILED: 'FAILED',
  VERIFY: 'VERIFY',
};

export const REJECTION_CODES = [
  'fraud_account',
  'insufficient_balance',
  'bav_blocked',
  'verification_already_under_process',
];
