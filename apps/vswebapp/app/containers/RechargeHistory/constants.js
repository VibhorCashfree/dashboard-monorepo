import React from 'react';
import _pick from 'lodash/pick';
import { Popup } from '@cashfree-intl/coherent';
import moment from 'moment';

// Constants
import {
  LAST_7_DAYS,
  LAST_15_DAYS,
  LAST_MONTH,
  LAST_1_YEAR,
  FORMATS,
} from 'constants/date';
import { LABEL_BY_STATUS } from 'constants/status';

// Components
import StatusLabel from 'components/StatusLabel';

const STATUSES = [
  'SUCCESS',
  'PENDING',
  'FAILED',
  'VALIDATION_FAILED',
  'VALIDATED',
  'REJECTED',
  'APPROVAL_PENDING',
  'MANUALLY_REJECTED',
];

export const COLUMN_ID = [
  {
    accessorKey: 'addedOn',
    header: 'Initiated At',
    cell: ({ addedon }) => moment(addedon).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'updatedOn',
    header: 'Updated At',
    cell: ({ updatedon }) =>
      updatedon ? moment(updatedon).format(FORMATS.TIMESTAMP) : '–',
  },
  {
    accessorKey: 'utr',
    header: 'UTR No.',
    cell: row => {
      const utr = row.status === 'SUCCESS' ? row.utr : '';

      return utr ? <Popup content={utr} trigger={<span>{utr}</span>} /> : '–';
    },
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ reason }) =>
      reason ? <Popup content={reason} trigger={<span>{reason}</span>} /> : '–',
  },
];

export const tableHeadings = [
  { key: 'addedOn', displayName: 'Initiated At', width: 0.18 },
  { key: 'updatedOn', displayName: 'Updated At', width: 0.18 },
  { key: 'utr', displayName: 'UTR No.', width: 0.12 },
  {
    key: 'amount',
    displayName: 'Recharge Amount',
    width: 0.2,
    align: 'right',
  },
  { key: 'status', displayName: 'Status', width: 0.12 },
  { key: 'reason', displayName: 'Reason', width: 0.2 },
];

export const labelByStatus = _pick(LABEL_BY_STATUS, STATUSES);

export const filtersConfig = {
  Status: {
    columns: 2,
    items: Object.keys(labelByStatus),
  },
};

export const options = [{ text: 'UTR No.', value: 'utr' }];

export const DATE_RANGE_OPTIONS = [
  LAST_7_DAYS,
  LAST_15_DAYS,
  LAST_MONTH,
  LAST_1_YEAR,
];

export const FS_DISPLAY_TYPE = {
  CASHFREE_WALLET: 'CF_WALLET',
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  PAYTM_WALLET: 'PAYTM_WALLET',
  CREDIT_CARD: 'CREDIT_CARD',
  CONNECTED_WALLET: 'CONNECTED_WALLET',
  UNO_WALLET: 'UNO_WALLET',
};

export const EVENT_TYPE = {
  CC_REGISTER: 'CC_REGISTER',
  CC_RECHARGE: 'CC_RECHARGE',
};
