import _identity from 'lodash/identity';

// Constants
import { REGION } from 'constants/common';

// Utils
import Region from 'utils/region';

export const getSampleOptions = (preferences: {
  beneficiaries: { purpose: { amazonUPI: any } };
}) => {
  const region = Region.get();

  if (region === REGION.AE) {
    return [
      {
        value: 'CFTRANSFER_BENEID_UAE',
        label: 'Beneficiary ID',
        description: 'Transfer using beneficiary ID to bank.',
      },
      {
        value: 'CFTRANSFER_IBAN',
        label: 'IBAN',
        description: 'Transfer using IBAN to bank.',
      },
    ];
  }

  const sampleOptions = [
    {
      value: 'CFTRANSFER_BENEID',
      label: 'Beneficiary ID',
      description:
        'Transfer using beneficiary ID to bank, UPI or Paytm account.',
    },
    {
      value: 'CFTRANSFER_ACCOUNT',
      label: 'Bank Account & IFSC',
      description: 'Transfer using bank account details.',
    },
    // {
    //   value: 'CFTRANSFER_PAYTM',
    //   label: 'Paytm',
    //   description: 'Transfer using mobile number to Paytm wallet.',
    // },
    {
      value: 'CFTRANSFER_UPI',
      label: 'UPI',
      description: 'Transfer using UPI details.',
    },
    preferences.beneficiaries.purpose.amazonUPI
      ? {
          value: 'CFTRANSFER_AMZN_UPI',
          label: 'Amazon Pay Wallet',
          description: 'Transfer using Amazon Pay Wallet-UPI details.',
        }
      : null,
  ];

  return sampleOptions.filter(_identity);
};

export const getFileTypeOptions = (preferences: {
  beneficiaries: { purpose: { amazonUPI: any } };
}) => {
  const region = Region.get();

  if (region === REGION.AE) {
    return [
      { text: 'Beneficiary ID', value: 'BENEFICIARY_ID' },
      { text: 'IBAN', value: 'INTERNATIONAL_BANK_ACCOUNT_NUMBER' },
    ];
  }

  const fileTypeOptions = [
    { text: 'Beneficiary ID', value: 'BENEFICIARY_ID' },
    { text: 'Bank Account & IFSC', value: 'BANK_ACCOUNT' },
    { text: 'UPI', value: 'UPI' },
    preferences.beneficiaries.purpose.amazonUPI
      ? { text: 'Amazon Pay Wallet', value: 'AMZN_UPI' }
      : null,
  ];

  return fileTypeOptions.filter(_identity);
};
