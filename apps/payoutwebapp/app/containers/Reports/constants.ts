import moment from 'moment';

// Constants
import { DATE_RANGE } from 'constants/date';

export const REPORT_LIST = [
  {
    type: 'TRANSFER',
    name: 'Transfer',
    description:
      'View details of Payouts made and details of the Cashgrams that are redeemed for the date range selected.',
    columns: [
      { name: 'Added On', value: 'ADDED_ON' },
      { name: 'Amount', value: 'AMOUNT' },
      { name: 'Transfer Id', value: 'TRANSFER_ID' },
      { name: 'Reference Id', value: 'REFERENCE_ID' },
      { name: 'Status', value: 'STATUS' },
      { name: 'Beneficiary Name', value: 'BENEFICIARY_NAME' },
      { name: 'Beneficiary Id', value: 'BENEFICIARY_ID' },
      { name: 'Bank Account', value: 'BANK_ACCOUNT' },
      { name: 'IFSC', value: 'IFSC' },
      { name: 'VPA', value: 'VPA' },
      { name: 'Remarks', value: 'REMARKS' },
      { name: 'Bank Reference No', value: 'BANK_REF_NO' },
      { name: 'Service Charge', value: 'SERVICE_CHARGE' },
      { name: 'Service Tax', value: 'SERVICE_TAX' },
      { name: 'Acknowledged', value: 'ACKNOWLEDGED' },
      { name: 'Mode', value: 'MODE' },
      { name: 'Status Code', value: 'STATUS_CODE' },
      { name: 'Status Description', value: 'STATUS_DESCRIPTION' },
      { name: 'Payment Instrument Id', value: 'PAYMENT_INSTRUMENT_ID' },
      { name: 'Processed On', value: 'LAST_CHECKED_AT' },
      { name: 'Added By', value: 'ADDED_BY' },
      { name: 'Extended UTR', value: 'EXTENDED_UTR' },
    ],
  },
  {
    type: 'CASHGRAM',
    name: 'Cashgram',
    description: 'View details of Payouts made for the date range selected',
    columns: [
      { name: 'Added On', value: 'ADDED_ON' },
      { name: 'Cashgram ID', value: 'CASHGRAM_ID' },
      { name: 'Bulk Cashgram ID', value: 'BULK_CASHGRAM_ID' },
      { name: 'Amount', value: 'AMOUNT' },
      { name: 'Bank Account', value: 'BANK_ACCOUNT' },
      { name: 'IFSC', value: 'IFSC' },
      { name: 'VPA', value: 'VPA' },
      { name: 'Service Charge', value: 'SERVICE_CHARGE' },
      { name: 'Service Tax', value: 'SERVICE_TAX' },
      { name: 'Customer Name', value: 'CUSTOMER_NAME' },
      { name: 'Customer Phone', value: 'CUSTOMER_PHONE' },
      { name: 'Customer Email', value: 'CUSTOMER_EMAIL' },
      { name: 'Type', value: 'TYPE' },
      { name: 'Description', value: 'DESCRIPTION' },
      { name: 'Remarks', value: 'REMARKS' },
      { name: 'Link URL', value: 'LINK_URL' },
      { name: 'Status', value: 'STATUS' },
      { name: 'Link Expiry Time', value: 'LINK_EXPIRY_TIME' },
      { name: 'Expiry Reason', value: 'LINK_EXPIRY_REASON' },
      { name: 'Updated On', value: 'UPDATED_ON' },
      { name: 'Redemption Mode', value: 'REDEMPTION_MODE' },
      { name: 'UTR', value: 'UTR' },
      { name: 'Name at Bank', value: 'NAME_AT_BANK' },
      { name: 'Created By', value: 'CREATED_BY' },
      { name: 'Cashgram Ref Id', value: 'CASHGRAM_REF_ID' },
    ],
  },
  {
    type: 'PO_ACCOUNT',
    name: 'Account Statement',
    description:
      'View details of all credits and debits in your Payouts account for the date range selected.',
    columns: [
      { name: 'Added On', value: 'ADDED_ON' },
      { name: 'Debit/Credit', value: 'EVENT' },
      { name: 'Particulars', value: 'EVENT_TYPE' },
      { name: 'Total Amount (INR)', value: 'TOTAL_AMOUNT' },
      { name: 'Amount (INR)', value: 'AMOUNT' },
      { name: 'Service Charge (INR)', value: 'SERVICE_CHARGE' },
      { name: 'Service Tax (INR)', value: 'SERVICE_TAX' },
      { name: 'Closing Balance (INR)', value: 'CLOSING_BALANCE' },
      { name: 'Event Id', value: 'EVENT_ID' },
      { name: 'Remarks', value: 'REMARKS' },
    ],
  },
  {
    type: 'BENEFICIARY',
    name: 'Beneficiary',
    description:
      'View details of beneficiaries added in the date range selected.',
    columns: [
      { name: 'Beneficiary Id', value: 'BENE_ID' },
      { name: 'Beneficiary Name', value: 'BENEFICIARY_NAME' },
      { name: 'Phone', value: 'PHONE' },
      { name: 'Email', value: 'EMAIL' },
      { name: 'Address', value: 'ADDRESS' },
      { name: 'Added On', value: 'ADDED_ON' },
      { name: 'Bank Account', value: 'BANK_ACCOUNT' },
      { name: 'IFSC', value: 'IFSC' },
      { name: 'VPA', value: 'VPA' },
      { name: 'Status', value: 'STATUS' },
      { name: 'Updated On', value: 'UPDATED_ON' },
      { name: 'Reason', value: 'REASON' },
      { name: 'Beneficiary Purpose', value: 'BENE_PURPOSE' },
    ],
  },
  {
    type: 'PENDING_TRANSFER',
    name: 'Pending Transfer',
    description:
      'View of transfers that are pending with their SLA and due date of completion',
    columns: [
      { name: 'Added On', value: 'ADDED_ON' },
      { name: 'Amount', value: 'AMOUNT' },
      { name: 'Transfer Id', value: 'TRANSFER_ID' },
      { name: 'Reference Id', value: 'REFERENCE_ID' },
      { name: 'Status', value: 'STATUS' },
      { name: 'Beneficiary Name', value: 'BENEFICIARY_NAME' },
      { name: 'Beneficiary Id', value: 'BENEFICIARY_ID' },
      { name: 'Bank Account', value: 'BANK_ACCOUNT' },
      { name: 'IFSC', value: 'IFSC' },
      { name: 'VPA', value: 'VPA' },
      { name: 'Remarks', value: 'REMARKS' },
      { name: 'Bank Reference No', value: 'BANK_REF_NO' },
      { name: 'Service Charge', value: 'SERVICE_CHARGE' },
      { name: 'Service Tax', value: 'SERVICE_TAX' },
      { name: 'Acknowledged', value: 'ACKNOWLEDGED' },
      { name: 'Mode', value: 'MODE' },
      { name: 'Payment Instrument Id', value: 'PAYMENT_INSTRUMENT_ID' },
      { name: 'SLA', value: 'SLA' },
      { name: 'Due Date', value: 'DUE_DATE' },
      { name: 'Processed On', value: 'LAST_CHECKED_AT' },
      { name: 'Added By', value: 'ADDED_BY' },
    ],
  },
  {
    type: 'REVERSED_TRANSFER',
    name: 'Reversed Transfers',
    description:
      'View details like date, time and reason of all transfers that are reversed for the date range selected.',
    columns: [
      { name: 'Reference Id', value: 'REFERENCE_ID' },
      { name: 'Transfer Id', value: 'TRANSFER_ID' },
      { name: 'Amount', value: 'AMOUNT' },
      { name: 'Reversal Reason', value: 'REVERSAL_REASON' },
      { name: 'Processed On', value: 'PROCESSED_ON' },
      { name: 'Reversed On', value: 'REVERSED_ON' },
      { name: 'Payment Instrument Id', value: 'PAYMENT_INSTRUMENT_ID' },
      { name: 'Added On', value: 'ADDED_ON' },
    ],
  },
  {
    type: 'PAYOUT_RISK_DETAILS',
    name: 'Payout Protect Actioned Transfers',
    description:
      'View details of the transfers which are blocked or flagged by the Payout Protect for the date range selected.',
    columns: [],
  },
  {
    type: 'RECON_REPORT',
    name: 'Recon Report',
    description:
      'Reconciliation of all debits and credits in your Connected fund source and Payouts account for the date range selected',
    columns: [],
  },
];

export const REFRESH_INTERVAL = 10000;

export const REQUIRED_FIELDS = ['reportName'];

export const reportsWithFundSource = ['TRANSFER', 'REVERSED_TRANSFER'];

export enum ACTION_TYPE {
  DOWNLOAD = 'DOWNLOAD',
  DELETE = 'DELETE',
}

export enum MODAL_TYPE {
  GENERATE = 'GENERATE',
  DELETE = 'DELETE',
  EMPTY = '',
}

export const CURRENT_DATE = moment().format('DD-MM-YYYY');

export const DATE_RANGE_OPTIONS = [
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
];

export const DATE_RANGE_OPTIONS_WITH_TODAY = [
  DATE_RANGE.TODAY,
  DATE_RANGE.LAST_7_DAYS,
  DATE_RANGE.LAST_15_DAYS,
  DATE_RANGE.LAST_MONTH,
];

export enum STATUS {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
}
