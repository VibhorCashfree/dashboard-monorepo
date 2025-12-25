import React from 'react';
import _startCase from 'lodash/startCase';

// Components
import StatusLabel from 'components/StatusLabel';

// Helpers
import { formattedDate } from 'helpers/common';

export const VERIFICATIONS_MAPPING = {
  BANKDETAILS_VALIDATION: {
    key: 'BANKDETAILS_VALIDATION',
    title: 'Bank Details',
    fieldsKey: {
      accountStatus: {
        title: 'Account Status',
        key: 'accountStatus',
        action: value => _startCase(value),
      },
      bankAccount: {
        title: 'Bank Account',
        key: 'bankAccount',
      },
      bankName: {
        title: 'Bank Name',
        key: 'bankName',
      },
      branch: {
        title: 'Branch',
        key: 'branch',
      },
      city: {
        title: 'City',
        key: 'city',
      },
      ifsc: {
        title: 'IFSC',
        key: 'ifsc',
      },
      micr: {
        title: 'MICR',
        key: 'micr',
      },
      nameAtBank: {
        title: 'Name at Bank',
        key: 'nameAtBank',
      },
      phone: {
        title: 'Phone Number',
        key: 'phone',
      },
      processedOn: {
        title: 'Processed On',
        key: 'processedOn',
        action: value => formattedDate(value),
      },
      refId: {
        title: 'Reference ID',
        key: 'refId',
      },
      status: {
        title: 'Status',
        key: 'status',
        action: value => <StatusLabel>{value}</StatusLabel>,
      },
      utr: {
        title: 'UTR',
        key: 'utr',
      },
    },
  },

  AADHAAR_OCR_V: {
    key: 'AADHAAR_OCR_V',
    title: 'Aadhaar OCR',
    fieldsKey: {
      gender: {
        title: 'Gender',
        key: 'gender',
      },
      name: {
        title: 'Name',
        key: 'name',
      },
      reference_id: {
        title: 'Reference ID',
        key: 'reference_id',
      },
      uid: {
        title: 'UID',
        key: 'uid',
      },
      verification_id: {
        title: 'Verification ID',
        key: 'verification_id',
      },
      yob: {
        title: 'YOB',
        key: 'yob',
      },
      address: {
        title: 'Address',
        key: 'address',
      },
    },
  },

  UPIDETAILS_VALIDATION: {
    title: 'UPI Details',
    key: 'UPIDETAILS_VALIDATION',
    fieldsKey: {
      name_at_bank: {
        title: 'Name at Bank',
        key: 'name_at_bank',
      },
      reference_id: {
        title: 'Reference ID',
        key: 'reference_id',
      },
      status: {
        title: 'Status',
        key: 'status',
      },
      vpa: {
        title: 'VPA',
        key: 'vpa',
      },
    },
  },

  PANDETAILS_VERIFICATION: {
    title: 'PAN Details',
    key: 'PANDETAILS_VERIFICATION',
    fieldsKey: {
      pan: {
        title: 'PAN',
        key: 'pan',
      },
      referenceId: {
        title: 'Reference ID',
        key: 'referenceId',
      },
      registeredName: {
        title: 'Registered Name',
        key: 'registeredName',
      },
      verifiedAt: {
        title: 'Verified At',
        key: 'verifiedAt',
        action: value => formattedDate(value),
      },
    },
  },

  OFFLINE_AADHAAR_VERIFICATION: {
    title: 'Offline Aadhaar',
    key: 'OFFLINE_AADHAAR_VERIFICATION',
    fieldsKey: {
      address: {
        title: 'Address',
        key: 'address',
      },
      careOf: {
        title: 'Care Of',
        key: 'careOf',
      },
      dob: {
        title: 'DOB',
        key: 'dob',
      },
      gender: {
        title: 'Gender',
        key: 'gender',
      },
      message: {
        title: 'Message',
        key: 'message',
      },

      name: {
        title: 'Name',
        key: 'name',
      },
    },
  },

  AADHAAR_OCR_FRONT: {
    title: 'Bharat OCR Aadhaar Front',
    key: 'AADHAAR_OCR_FRONT',
    fieldsKey: {
      'document_fields.address': {
        title: 'Address',
        key: 'document_fields.address',
      },
      'document_fields.father': {
        title: 'Care Of',
        key: 'document_fields.father',
      },
      'document_fields.dob': {
        title: 'DOB',
        key: 'document_fields.dob',
      },
      'document_fields.gender': {
        title: 'Gender',
        key: 'document_fields.gender',
      },
      'document_fields.name': {
        title: 'Name',
        key: 'document_fields.name',
      },
    },
  },

  AADHAAR_OCR_BACK: {
    title: 'Bharat OCR Aadhaar Back',
    key: 'AADHAAR_OCR_BACK',
    fieldsKey: {
      'document_fields.address': {
        title: 'Address',
        key: 'document_fields.address',
      },
      'document_fields.pincode': {
        title: 'Pincode',
        key: 'document_fields.pincode',
      },
    },
  },

  PAN_OCR_V: {
    title: 'PAN OCR',
    key: 'PAN_OCR_V',
    fieldsKey: {
      dob: {
        title: 'DOB',
        key: 'dob',
      },
      father: {
        title: 'Father Name',
        key: 'father',
      },
      name: {
        title: 'Name',
        key: 'name',
      },
      pan: {
        title: 'PAN',
        key: 'pan',
      },
      pan_type: {
        title: 'PAN Type',
        key: 'pan_type',
      },
      reference_id: {
        title: 'Reference ID',
        key: 'reference_id',
      },
      status: {
        title: 'Status',
        key: 'status',
        action: value => <StatusLabel>{value}</StatusLabel>,
      },
    },
  },
  DIGILOCKER_VERIFICATION: {
    key: 'DIGILOCKER_VERIFICATION',
    title: 'DigiLocker Verification',
    fieldsKey: {
      verification_id: {
        title: 'Verification ID',
      },
      name: {
        title: 'Name',
      },
      dob: {
        title: 'Date of Birth',
      },
      gender: {
        title: 'Gender',
        action: value => {
          if (value === 'M') {
            return 'Male';
          }
          if (value === 'F') {
            return 'Female';
          }

          return value;
        },
      },
      eaadhaar: {
        title: 'E-Aadhaar',
      },
      mobile: {
        title: 'Mobile',
      },
      document_requested: {
        title: 'Document Requested',
        action: value => (Array.isArray(value) ? value.join(', ') : value),
      },
      document_consent: {
        title: 'Document Consent',
        action: value => (Array.isArray(value) ? value.join(', ') : value),
      },
      status: {
        title: 'Status',
      },
    },
  },
};
