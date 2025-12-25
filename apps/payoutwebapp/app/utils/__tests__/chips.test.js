// Constants
import { DATE_RANGE } from 'constants/date';

// Utils
import { getChips } from '../chips';

describe('Chips helpers', () => {
  test('getChips()', () => {
    expect(
      getChips(
        {
          dateValue: {
            displayText: DATE_RANGE.ALL_TIME.displayText,
            range: null,
          },
          filters: {},
        },
        null,
        {
          PAYOUT_TRANSFER: 'Cashfree Transfer',
          BANK_TRANSFER: 'Bank Transfers',
          PG_INSTANT_SETTLEMENT: 'PG Instant Settlements',
          UPIDETAILS_VALIDATION: 'UPI Details Verification',
        },
      ),
    ).toStrictEqual([]);

    expect(
      getChips(
        {
          dateValue: {
            displayText: DATE_RANGE.ALL_TIME.displayText,
            range: null,
          },
          filters: {
            PAYOUT_TRANSFER: true,
            PG_INSTANT_SETTLEMENT: true,
          },
        },
        null,
        {
          PAYOUT_TRANSFER: 'Cashfree Transfer',
          BANK_TRANSFER: 'Bank Transfers',
          PG_INSTANT_SETTLEMENT: 'PG Instant Settlements',
          UPIDETAILS_VALIDATION: 'UPI Details Verification',
        },
      ),
    ).toStrictEqual([
      {
        key: 'PAYOUT_TRANSFER',
        text: 'Cashfree Transfer',
      },
      {
        key: 'PG_INSTANT_SETTLEMENT',
        text: 'PG Instant Settlements',
      },
    ]);

    expect(
      getChips(
        {
          dateValue: {
            displayText: DATE_RANGE.ALL_TIME.displayText,
            range: null,
          },
          filters: {
            search: 'something',
          },
          searchBy: 'bankAccount',
        },
        [
          {
            text: 'Bank A/c Number',
            value: 'bankAccount',
          },
          {
            text: 'Verification ID',
            value: 'verificationId',
          },
          {
            text: 'UTR No.',
            value: 'utr',
          },
        ],
        {
          VALID: 'Valid',
          PENDING: 'Pending',
          REJECTED: 'Rejected',
          INVALID: 'Invalid',
          UNABLE_TO_VALIDATE: 'Unable To Validate',
        },
      ),
    ).toStrictEqual([
      {
        key: 'search',
        text: 'Bank A/c Number: something',
      },
    ]);
  });
});
