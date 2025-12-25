import React from 'react';
import _pick from 'lodash/pick';
import { Popup } from '@cashfree-intl/coherent';

// Constants
import { LABEL_BY_STATUS } from 'constants/status';

// Helpers
import { formattedDate } from 'helpers/common';

// Components
import StatusLabel from 'components/StatusLabel';

export const TAB_KEY = 'batch';

const STATUSES = ['PENDING', 'REJECTED', 'CANCELLED', 'PROCESSED', 'EXPIRED'];

export const options = [{ text: 'File Name', value: 'filename' }];

export const COLUMN_ID = [
  {
    accessorKey: 'addedOn',
    header: 'Uploaded On',
    width: 200,
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
  { accessorKey: 'expired', header: 'Expired' },
  {
    accessorKey: 'unableToValidate',
    header: 'Unable to Validate',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
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
  FAILED: 'FAILED',
  FAILED_WITH_VALID: 'FAILED_WITH_VALID',
  FAILED_WITH_NO_VALID: 'FAILED_WITH_NO_VALID',
  SEND_JOURNEY: 'SEND_JOURNEY',
  CREATE_JOURNEY: 'CREATE_JOURNEY',
};

export const STEP_ONE_FIELDS = ['products', 'linkExpiry'];
export const STEP_TWO_FIELDS = ['file'];

export const VERIFICATION_TYPES = [
  {
    type: 'OFFLINE_AADHAAR_VERIFICATION',
    icon: 'Aadhaar',
    text: 'Aadhaar',
  },
  {
    type: 'PANDETAILS_VERIFICATION',
    icon: 'PAN',
    text: 'PAN',
  },
  {
    type: 'UPIDETAILS_VALIDATION',
    icon: 'UPI',
    text: 'UPI',
  },
  {
    type: 'BANKDETAILS_VALIDATION',
    icon: 'BAV',
    text: 'BAV',
  },
  {
    type: 'AADHAAR_OCR_V',
    icon: 'AADHAAR_OCR',
    text: 'Aadhaar OCR',
  },
  {
    type: 'PAN_OCR_V',
    icon: 'PAN_OCR',
    text: 'PAN OCR',
  },
];

export const LOGO_UPLOAD_FILE_CHECKLIST = [
  'Max file size: 500 kb',
  'File type: png/Jpeg',
];

export const COLOR_TYPES = [
  {
    key: 'headerColor',
    headerText: 'Header Colour',
    infoText: 'This determines the colour of the header element.',
  },
  {
    key: 'primaryColor',
    headerText: 'Primary Brand Colour',
    infoText:
      'This determines the colour of the buttons, link, and interactive elements.',
  },
  {
    key: 'textColor',
    headerText: 'Text Colour',
    infoText:
      'This determines the colour of the text displayed over the primary colour.',
  },
];
