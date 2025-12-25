export const ICICI = 'icicimerchant';
export const LENDING_KART = 'lendingkartmerchant';

export const THEME_CONFIG = {
  [ICICI]: {
    COLORS: {
      bgLight: '#F8F8F8',
      primary: '#F26522',
      selected: '#F4E0E0',
      focused: '#A30000',
    },
    GLOBAL_SIDEBAR: {
      brandBg: '#FFFFFF',
      bg: '#F26522',
      selected: '#951E11',
      text: '#FFFFFF',
      primaryBtn: '#FFFFFF',
      secondaryBtn: '#FFFFFF',
      envSwitch: '#FFFFFF',
      envSwitchAlt: '#951E11',
      envSwitchAltHover: '#951E11aa',
    },
  },
  [LENDING_KART]: {
    COLORS: {
      bgLight: '#F8F8F8',
      primary: '#FF7000',
      selected: '#f5e5d7',
      focused: '#F26522',
    },
    GLOBAL_SIDEBAR: {
      brandBg: '#FFFFFF',
      bg: '#FF7000',
      selected: '#294E9B',
      text: '#FFFFFF',
      primaryBtn: '#FFFFFF',
      secondaryBtn: '#FFFFFF',
      envSwitch: '#FFFFFF',
      envSwitchAlt: '#ff7000',
      envSwitchAltHover: '#ff7000aa',
    },
  },
};

export const descriptions = [
  'Verify PAN, Bank Account, UPI VPA and IFSC in real time before making any transactions to ensure legitimate and successful payouts.',
];

export const features = [
  {
    heading: 'Upload File with Beneficiary Bank A/c Details',
    body:
      'Enter bank a/c details - a/c holder name, a/c number, phone number and IFSC, or upload a batch file with all the details of the beneficiaries. You can also verify PAN, UPI VPA and IFSC.',
  },
  {
    heading: 'Cashfree Payments Verifies Details',
    body: 'Beneficiaries details are verified.',
  },
  {
    heading: 'View Verification Status',
    body: 'Get notified about the validity of beneficiaries account.',
  },
];
