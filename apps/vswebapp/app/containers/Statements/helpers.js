import React from 'react';
import { Popup } from '@cashfree-intl/coherent';
import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { formatAmount } from 'utils/common';

export const getQuery = (filters, dateValue, limit) => {
  let status = Object.keys(filters);

  if (filters.TRANSFER_REVERSAL) {
    status = status.concat(['PYTM_TRANSFER_REVERSAL']);
  }

  if (filters.PAYOUT_TRANSFER) {
    status = status.concat(['PYTM_PAYOUT_TRANSFER']);
  }

  if (filters.BANKDETAILS_VALIDATION) {
    status = status.concat([
      'BANKDETAILSVALIDATION_SQL',
      'BANKVALIDATION_DEBIT',
      'BANKDETAILSVALIDATION_JAN',
    ]);
  }

  const queryObj = {
    eventType: status,
    size: limit,
  };

  if (dateValue.range) {
    const [startDate, endDate] = dateValue.range;

    queryObj.startDate = formattedDate(startDate, FORMATS.START_DATE);
    queryObj.endDate = formattedDate(endDate, FORMATS.END_DATE);
  }

  return queryObj;
};

export const getFormattedData = () => [
  {
    accessorKey: 'txTime',
    header: 'Date & Time',
    cell: row => moment.utc(row.txTime).format(FORMATS.TIMESTAMP),
  },
  {
    accessorKey: 'maskedEventType',
    header: 'Event Type',
    cell: row => (
      <Popup
        content={row.maskedEventType}
        trigger={<span>{row.maskedEventType}</span>}
      />
    ),
  },
  {
    accessorKey: 'debit',
    header: 'Debit',
    cell: row => (row.event === 'DEBIT' ? formatAmount(row.amount) : '–'),
  },
  {
    accessorKey: 'credit',
    header: 'Credit',
    cell: row => (row.event === 'CREDIT' ? formatAmount(row.amount) : '–'),
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    cell: row => (
      <Popup content={row.remarks} trigger={<span>{row.remarks}</span>} />
    ),
  },
  {
    accessorKey: 'closingBalance',
    header: 'Closing Balance',
    cell: row => formatAmount(row.closingBalance),
  },
];
