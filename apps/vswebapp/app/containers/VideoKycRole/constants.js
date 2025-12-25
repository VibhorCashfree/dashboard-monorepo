import React from 'react';
import _pick from 'lodash/pick';
import _startCase from 'lodash/startCase';

// Components
import StatusLabel from 'components/StatusLabel';

// Utils
import { formattedDate } from 'helpers/common';

export const checkList = [
  'Max file size: 5 MB',
  'Dimensions: 96 x 32 px',
  'File type: .png, .jpeg .jpg',
];

export const MODAL_TYPES = {
  CREATE_ROLE: 'CREATE_ROLE',
  ROLE_CREATED: 'ROLE_CREATED',
  GENERATE_REPORT: 'GENERATE_REPORT',
};

export const COLUMN_ID = [
  {
    accessorKey: 'app_name',
    header: 'Template Name',
  },
  {
    accessorKey: 'app_brand_name',
    header: 'Brand Name',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ created_at }) => formattedDate(created_at),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ status }) => <StatusLabel>{status}</StatusLabel>,
  },
];

export const PREF_MAPPING = {
  BASIC_DETAILS: [
    { label: 'Name', type: 'NAME' },
    { label: 'Email', type: 'EMAIL' },
    { label: 'Date of Birth', type: 'DOB' },
    { label: 'Gender', type: 'GENDER' },
    { label: 'Address', type: 'ADDRESS' },
    { label: 'Occupation', type: 'OCCUPATION' },
    { label: 'Mobile', type: 'MOBILE' },
    { label: 'Income', type: 'INCOME' },
  ],
  KYC_DETAILS: [
    { label: 'Aadhaar', type: 'AADHAAR' },
    { label: 'Pan', type: 'PAN' },
  ],
  PAYMENT_METHODS: [
    { label: 'UPI', type: 'UPI' },
    { label: 'Bank Account', type: 'BANK_ACCOUNT' },
  ],
};

export const FIELD_MAPPING = {
  NAME: 'Name',
  EMAIL: 'Email',
  ADDRESS: 'Address',
  MOBILE: 'Alternate Mobile No.',
  AADHAAR: 'Aadhaar',
  PAN: 'PAN',
  GENDER: 'Gender',
  BANK_ACCOUNT: 'Bank Account',
  UPI: 'UPI',
  OCCUPATION: 'Occupation',
  INCOME: 'Income',
  DOB: 'Date of Birth',
};

export const FIELD_MAPPING_VALUE = {
  NAME: 'John Doe',
  EMAIL: 'john@gmail.com',
  ADDRESS: '327, Bagmane Road, Mumbai',
  MOBILE: '7014665340',
  AADHAAR: 'XXXX XXXX 2343',
  PAN: 'ABCPV1234D',
  GENDER: 'Male',
  BANK_ACCOUNT: '026291800001191',
  UPI: 'success@upi',
  OCCUPATION: 'Salaried',
  INCOME: 'Below 1 Lakh',
  DOB: '25/01/1994',
};

export const REQUIRED_FIELDS = ['name', 'email'];

export const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: '100%',
    height: '100%',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '-100%',
  },
};

export const PAGE_TRANSITION = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export const SCOPE_LABEL = {
  NAME: 'Full Name',
  EMAIL: 'Email ID(s)',
  DOB: 'Date of Birth',
  GENDER: 'Gender',
  ADDRESS: 'Address(s)',
  OCCUPATION: 'Occupation',
  MOBILE: 'Alternate Mobile Number(s)',
  INCOME: 'Income',
  AADHAAR: 'Aadhaar Number',
  PAN: 'PAN Number',
  BANK_ACCOUNT: 'Bank Account Number',
};
