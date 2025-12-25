// Images
import Aadhaar_verification_template from 'images/kyc-links/Aadhaar_verification_template.png';
import All_Verification_template from 'images/kyc-links/All_Verification_template.png';
import Bank_Account_Verification_template from 'images/kyc-links/Bank_Account_Verification_template.png';
import User_Onboarding_template from 'images/kyc-links/User_Onboarding_template.png';
import Cashfree_User_Aadhaar_template from 'images/kyc-links/Cashfree_User_Aadhaar_template.png';
import Lending_Onboarding_template from 'images/kyc-links/Lending_Onboarding_template.png';
import OVD_Verification_template from 'images/kyc-links/OVD_Verification_template.png';
import Vehicle_Verification_template from 'images/kyc-links/Vehicle_Verification_template.png';
import Bank_Account_Verification from 'images/kyc-links/Bank_Account_Verification.png';
import Lending_Onboarding from 'images/kyc-links/Lending_Onboarding.png';
import OVD_Verification from 'images/kyc-links/OVD_Verification.png';
import User_Onboarding from 'images/kyc-links/User_Onboarding.png';
import Vehicle_Verification from 'images/kyc-links/Vehicle_Verification.png';

export const MODAL_TYPES = {
  ADD_NEW_BLOCK: 'ADD_NEW_BLOCK',
  ADD_NEW_CONDITION: 'ADD_NEW_CONDITION',
  DELETE_SCREEN: 'DELETE_SCREEN',
  PREVIEW_JOURNEY: 'PREVIEW_JOURNEY',
};

const NAME_MATCH_OPTION = [
  'DIRECT_MATCH',
  'GOOD_PARTIAL_MATCH',
  'MODERATE_PARTIAL_MATCH',
  'POOR_PARTIAL_MATCH',
  'NO_MATCH',
];

const GENDER_OPTION = ['MALE', 'FEMALE'];

const STATUS_OPTION = ['VALID', 'INVALID'];

const PAN_TYPE_OPTION = ['Individual', 'Company'];

export const LOGICAL_OPERATORS = [
  { key: 'EQUALS', text: 'Equals', value: 'EQUALS' },
  { key: 'NOT_EQUAL', text: 'Not Equal', value: 'NOT_EQUAL' },
  { key: 'GREATER_THAN', text: 'Greater Than', value: 'GREATER_THAN' },
  { key: 'LESS_THAN', text: 'Lesser Than', value: 'LESSER_THAN' },
  {
    key: 'GREATER_THAN_OR_EQUAL',
    text: 'Greater Than Or Equal',
    value: 'GREATER_THAN_OR_EQUAL',
  },
  {
    key: 'LESS_THAN_OR_EQUAL',
    text: 'Lesser Than Or Equal',
    value: 'LESS_THAN_OR_EQUAL',
  },
];

export const LOGICAL_MAPPING = {
  EQUALS: '==',
  NOT_EQUAL: '!=',
  GREATER_THAN: '>',
  LESSER_THAN: '<',
  GREATER_THAN_OR_EQUAL: '>=',
  LESS_THAN_OR_EQUAL: '<=',
};

export const KYC_LINK_PRODUCT_MAPPING = {
  bav: {
    displayText: 'BAV',
    value: 'bav',
    optionalNameMatch: true,
    inputFields: ['Account Number', 'IFSC', 'Name'],
    outputFields: [
      {
        key: 'bav.account_status_code',
        text: 'BAV: Account Status Code',
        value: 'bav.account_status_code',
        options: [
          'ACCOUNT_IS_VALID',
          'INVALID_ACCOUNT_FAIL',
          'INVALID_IFSC_FAIL',
          'ACCOUNT_BLOCKED',
          'NRE_ACCOUNT_FAIL',
        ],
        selectMultiple: true,
        filterType: 'BAV:Account Status Code',
      },
      {
        key: 'bav.name_match_result',
        text: 'BAV: Name Match Result',
        value: 'bav.name_match_result',
        options: NAME_MATCH_OPTION,
        selectMultiple: true,
        filterType: 'BAV:Name Match',
      },
    ],
  },
  upi: {
    displayText: 'UPI',
    value: 'upi',
    optionalNameMatch: true,
    inputFields: ['VPA', 'Name'],
    outputFields: [
      {
        key: 'upi.status',
        text: 'UPI: Status',
        value: 'upi.status',
        options: ['VALID', 'INVALID', 'EXPIRED'],
        selectMultiple: false,
        filterType: 'UPI: Status',
      },
    ],
  },
  pan: {
    displayText: 'PAN',
    value: 'pan',
    optionalNameMatch: true,
    inputFields: ['PAN', 'Name'],
    outputFields: [
      {
        key: 'pan.pan_status',
        text: 'PAN: Status',
        value: 'pan.pan_status',
        options: STATUS_OPTION,
        selectMultiple: false,
        filterType: 'PAN: Status',
      },
      {
        key: 'pan.type',
        text: 'PAN: Type',
        value: 'pan.type',
        options: PAN_TYPE_OPTION,
        selectMultiple: false,
        filterType: 'PAN: Type',
      },
      {
        key: 'pan.name_match_result',
        text: 'PAN: Name Match Result',
        value: 'pan.name_match_result',
        options: NAME_MATCH_OPTION,
        selectMultiple: true,
        filterType: 'PAN: Name Match',
      },
      {
        key: 'pan.aadhaar_seeding_status',
        text: 'PAN: Aadhaar Seeding Status',
        value: 'pan.aadhaar_seeding_status',
        options: ['Y', 'N'],
        selectMultiple: false,
        filterType: 'PAN: Aadhaar Seeding Status',
      },
      {
        key: 'pan.gender',
        text: 'PAN: Gender',
        value: 'pan.gender',
        options: GENDER_OPTION,
        selectMultiple: false,
        filterType: 'PAN: Gender',
      },
    ],
  },
  panocr: {
    displayText: 'PAN OCR',
    value: 'panocr',
    inputFields: ['Upload Pan Front Image'],
    upload: true,
    outputFields: [
      {
        key: 'panocr.status',
        text: 'PAN OCR: Status',
        value: 'panocr.status',
        options: STATUS_OPTION,
        selectMultiple: false,
        filterType: 'PAN OCR: Status',
      },
      {
        key: 'panocr.pan_type',
        text: 'PAN OCR: Type',
        value: 'panocr.pan_type',
        options: PAN_TYPE_OPTION,
        selectMultiple: false,
        filterType: 'PAN OCR: Type',
      },
    ],
  },
  aadhaar: {
    displayText: 'Aadhaar OKYC',
    value: 'aadhaar',
    inputFields: ['Aadhaar Number'],
    outputFields: [
      {
        key: 'aadhaar.status',
        text: 'AADHAAR: Status',
        value: 'aadhaar.status',
        options: ['VALID'],
        selectMultiple: false,
        filterType: 'AADHAAR: Status',
      },
    ],
  },
  aadhaarocr: {
    displayText: 'Aadhaar OCR',
    value: 'aadhaarocr',
    inputFields: ['Upload Aadhaar Front Image', 'Upload Aadhaar Back Image'],
    upload: true,
    outputFields: [
      {
        key: 'aadhaarocr.status',
        text: 'Aadhaar OCR: Status',
        value: 'aadhaarocr.status',
        options: ['VALID', 'INVALID'],
        selectMultiple: false,
        filterType: 'AADHAAR OCR: Status',
      },
    ],
  },
  vehiclerc: {
    displayText: 'Vehicle RC',
    value: 'vehiclerc',
    inputFields: ['Vehicle Number'],
    outputFields: [
      {
        key: 'vehiclerc.status',
        text: 'Vehicle RC: Status',
        value: 'vehiclerc.status',
        options: ['VALID', 'INVALID'],
        selectMultiple: false,
        filterType: 'Vehicle RC: Status',
      },
      {
        key: 'vehiclerc.rc_status',
        text: 'Vehicle RC: RC Status',
        value: 'vehiclerc.rc_status',
        options: ['ACTIVE', 'NA'],
        selectMultiple: false,
        filterType: 'Vehicle RC: RC Status',
      },
    ],
  },
  drivinglicense: {
    displayText: 'Driving License',
    value: 'drivinglicense',
    inputFields: ['License Number', 'Date of Birth'],
    outputFields: [
      {
        key: 'drivinglicense.status',
        text: 'Driving License: Status',
        value: 'drivinglicense.status',
        options: STATUS_OPTION,
        filterType: 'Driving License: Status',
      },
    ],
  },
  voterid: {
    displayText: 'Voter ID',
    value: 'voterid',
    inputFields: ['EPIC Number', 'Name'],
    optionalNameMatch: true,
    outputFields: [
      {
        key: 'voterid.status',
        text: 'Voter ID: Status',
        value: 'voterid.status',
        options: STATUS_OPTION,
        filterType: 'Voter ID: Status',
        selectMultiple: false,
      },
      {
        key: 'voterid.gender',
        text: 'Voter ID: Gender',
        value: 'voterid.gender',
        options: ['MALE', 'FEMALE'],
        filterType: 'Voter ID: Gender',
        selectMultiple: false,
      },
    ],
  },
  passport: {
    displayText: 'Passport',
    value: 'passport',
    inputFields: ['File Number', 'Date of Birth', 'Name'],
    outputFields: [
      {
        key: 'passport.status',
        text: 'Passport: Status',
        value: 'passport.status',
        options: STATUS_OPTION,
        filterType: 'Passport: Status',
        selectMultiple: false,
      },
      {
        key: 'passport.application_type',
        text: 'Passport: Application Type',
        value: 'passport.application_type',
        options: ['NORMAL', 'TATKAAL'],
        filterType: 'Passport: Application Type',
        selectMultiple: false,
      },
    ],
  },
  employment360: {
    displayText: 'Employment 360',
    value: 'employment360',
    inputFields: ['UAN'],
    outputFields: [
      {
        key: 'employment360.status',
        text: 'Employment 360: Status',
        value: 'employment360.status',
        options: ['SUCCESS', 'EMPLOYMENT_DETAILS_NOT_FOUND'],
        filterType: 'Employment 360: Status',
      },
    ],
  },
  livelinesscheck: {
    displayText: 'Face Liveness Check',
    value: 'livelinesscheck',
    inputFields: ['Upload Selfie'],
    outputFields: [
      {
        key: 'livelinesscheck.status',
        text: 'Liveliness: Status',
        value: 'livelinesscheck.status',
        options: ['SUCCESS', 'FACE_NOT_DETECTED', 'MULTIPLE_FACE_DETECTED'],
        filterType: 'Liveliness: Status',
      },
      {
        key: 'livelinesscheck.liveliness',
        text: 'Liveliness: Check',
        value: 'livelinesscheck.liveliness',
        options: ['true', 'false'],
        filterType: 'Liveliness: Check',
        selectMultiple: false,
      },
      {
        key: 'livelinesscheck.score',
        text: 'Liveliness: Score',
        value: 'livelinesscheck.score',
        inputType: 'Number',
        filterType: 'Liveliness: Score',
        numeralOperator: true,
      },
    ],
  },
  upi360: {
    displayText: 'UPI 360',
    inputFields: ['UPI', 'Name'],
    optionalNameMatch: true,
    value: 'upi360',
    outputFields: [
      {
        key: 'upi360.status',
        text: 'UPI 360: Status',
        value: 'upi360.status',
        options: ['VALID', 'INVALID', 'EXPIRED'],
        filterType: 'UPI 360: Status',
      },
    ],
  },
  panlite: {
    displayText: 'PAN Lite',
    inputFields: ['PAN', 'Name', 'Date of Birth'],
    value: 'panlite',
    outputFields: [
      {
        key: 'panlite.status',
        text: 'PAN Lite: Status',
        value: 'panlite.status',
        options: STATUS_OPTION,
        filterType: 'PAN Lite: Status',
      },
      {
        key: 'panlite.pan_status',
        text: 'PAN Lite: PAN Status',
        value: 'panlite.pan_status',
        selectMultiple: false,
        options: [
          { text: 'E - VALID', value: 'E' },
          { text: 'N - INVALID', value: 'N' },
          { text: 'X - DEACTIVATED', value: 'X' },
          { text: 'F - FAKE', value: 'F' },
          { text: 'D - DELETED', value: 'D' },
        ],
        filterType: 'PAN Lite: PAN Status',
      },
      {
        key: 'panlite.name_match',
        text: 'PAN Lite: Name Match',
        value: 'panlite.name_match',
        options: ['Y', 'N'],
        filterType: 'PAN Lite: Name Match',
      },
      {
        key: 'panlite.dob_match',
        text: 'PAN Lite: DOB Match',
        value: 'panlite.dob_match',
        options: ['Y', 'N'],
        filterType: 'PAN Lite: DOB Match',
        selectMultiple: false,
      },
      {
        key: 'panlite.aadhaar_seeding_status',
        text: 'PAN Lite: Aadhaar Seeding Status',
        value: 'panlite.aadhaar_seeding_status',
        options: ['Y', 'N'],
        selectMultiple: false,
        filterType: 'PAN Lite: Aadhaar Seeding Status',
      },
    ],
  },
  pan360: {
    displayText: 'PAN Advance',
    inputFields: ['PAN', 'Name'],
    optionalNameMatch: true,
    value: 'pan360',
    outputFields: [
      {
        key: 'pan360.status',
        text: 'PAN Advance: Status',
        value: 'pan360.status',
        options: STATUS_OPTION,
        filterType: 'PAN Advance: Status',
      },
      {
        key: 'pan360.gender',
        text: 'PAN Advance: Gender',
        value: 'pan360.gender',
        options: ['MALE', 'FEMALE'],
        selectMultiple: false,
        filterType: 'PAN Advance: Gender',
      },
      {
        key: 'pan360.aadhaar_linked',
        text: 'PAN Advance: Aadhaar Linked',
        value: 'pan360.aadhaar_linked',
        options: ['true', 'false'],
        selectMultiple: false,
        filterType: 'PAN Advance: Aadhaar Linked',
      },
      {
        key: 'pan360.type',
        text: 'PAN Advance: Type',
        value: 'pan360.type',
        options: ['Individual', 'Person'],
        selectMultiple: false,
        filterType: 'PAN OCR: Type',
      },
    ],
  },
  mobile360lite: {
    displayText: 'Mobile 360 Lite',
    inputFields: ['Mobile Number', 'Name'],
    optionalNameMatch: true,
    value: 'mobile360lite',
    outputFields: [
      {
        key: 'mobile360lite.status',
        text: 'Mobile 360 Lite: Status',
        value: 'mobile360lite.status',
        options: STATUS_OPTION,
        filterType: 'Mobile 360 Lite: Status',
      },
    ],
  },
  mobile360advance: {
    displayText: 'Mobile 360 Advance',
    inputFields: ['Mobile Number', 'Name'],
    value: 'mobile360advance',
    outputFields: [
      {
        key: 'mobile360advance.status',
        text: 'Mobile 360 Advance: Status',
        value: 'mobile360advance.status',
        options: STATUS_OPTION,
        filterType: 'Mobile 360 Advance: Status',
      },
    ],
  },
};

export const INPUT_FIELD_MAPPING = {
  NAME: {
    displayText: 'Name',
    value: 'NAME',
    inputFields: ['Name'],
  },
  MOBILE: {
    displayText: 'Mobile',
    value: 'MOBILE',
    inputFields: ['Mobile'],
  },
  ADDRESS: {
    displayText: 'Address',
    value: 'ADDRESS',
    inputFields: ['Address'],
  },
  DOB: {
    displayText: 'Date of Birth',
    value: 'DOB',
    inputFields: ['Date of Birth'],
  },
  EMAIL: {
    displayText: 'Email',
    value: 'EMAIL',
    inputFields: ['Email'],
  },
};

export const ALL_FIELD_MAPPING = {
  ...KYC_LINK_PRODUCT_MAPPING,
  ...INPUT_FIELD_MAPPING,
};

export const BLOCK_COLOR_MAPPING = [
  { background: 'rgba(0, 97, 171, 0.10)', border: '#0061AB' },
  { background: 'rgba(214, 131, 9, 0.1)', border: '#D68309' },
];

export const checkList = [
  'Max file size: 500Kb',
  'File type: .png, .jpg, .jpeg',
];

export const DEFAULT_TEMPLATES = {
  Aadhaar_verification_template,
  All_Verification_template,
  Bank_Account_Verification_template,
  User_Onboarding_template,
  Cashfree_User_Aadhaar_template,
  Lending_Onboarding_template,
  OVD_Verification_template,
  Vehicle_Verification_template,
};

export const DEFAULT_LOGO = {
  Bank_Account_Verification,
  Lending_Onboarding,
  OVD_Verification,
  User_Onboarding,
  Vehicle_Verification,
};
