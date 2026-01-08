import {
  DEFAULT_LIMIT as SHARED_DEFAULT_LIMIT,
  DEFAULT_CURRENT_PAGE as SHARED_DEFAULT_CURRENT_PAGE,
  ENV as SHARED_ENV,
  LABEL_BY_ENV as SHARED_LABEL_BY_ENV,
  SIZE_LIMIT as SHARED_SIZE_LIMIT,
  FILE_SIZE_CHECK as SHARED_FILE_SIZE_CHECK,
  UPLOAD_CHECK_LIST as SHARED_UPLOAD_CHECK_LIST,
  defaultTabMenuConfig as sharedDefaultTabMenuConfig,
  ACCOUNT_TYPE as SHARED_ACCOUNT_TYPE,
} from '@dashboard-monorepo/shared';

export const DEFAULT_LIMIT = SHARED_DEFAULT_LIMIT;
export const DEFAULT_CURRENT_PAGE = SHARED_DEFAULT_CURRENT_PAGE;

export enum ENV {
  TEST = 'test',
  PROD = 'prod',
}

export const LABEL_BY_ENV = SHARED_LABEL_BY_ENV;

export const SIZE_LIMIT = SHARED_SIZE_LIMIT;

export const FILE_SIZE_CHECK = SHARED_FILE_SIZE_CHECK;

export const UPLOAD_CHECK_LIST = SHARED_UPLOAD_CHECK_LIST;

export enum FILE_TYPE {
  CSV = 'CSV',
  XLS = 'XLS',
  PDF = 'PDF',
}

export enum USER_TYPE {
  MERCHANT_OWNER = 'MERCHANT_OWNER',
  MERCHANT_ALIAS = 'MERCHANT_ALIAS',
}

export const TABLE_LOADER_HEIGHT = 640;

export enum BENE_PURPOSE {
  CORP_CC = 'CORP_CC',
  AMAZON_UPI_BENE = 'AMAZON_UPI_BENE',
  BULK_BENE = 'BULK_BENE',
}

export const benePurposeOptions = [
  {
    value: BENE_PURPOSE.CORP_CC,
    text: 'Corporate Credit Card',
  },
  {
    value: BENE_PURPOSE.AMAZON_UPI_BENE,
    text: 'Amazon Pay Wallet',
  },
  {
    value: BENE_PURPOSE.BULK_BENE,
    text: 'Others',
  },
];

export const PO_RISK_SHIELD = 'PO_RISK_SHIELD';

export const TOGGLE_FEATURES = [PO_RISK_SHIELD];

export enum CURRENCY {
  INR = 'INR',
  AED = 'AED',
  USD = 'USD',
}

export enum REGION {
  MISSING_REGION = 'CFRN000',
  IN = 'CFRN101',
  AE = 'CFRN102',
}

export const BULK_BENE_FILE_TYPE: StringObject = {
  [REGION.IN]: 'BULK_BENE',
  [REGION.AE]: 'BULK_BENE_UAE',
};

export const LOCALES: StringObject = {
  [REGION.IN]: 'en-IN',
  [REGION.AE]: 'en-US',
};

export const CURRENCY_SYMBOL: StringObject = {
  AED: 'AED',
  INR: '₹',
  USD: '$',
};

export const PHONE_MAX_LENGTH: { [key: string]: number } = {
  [REGION.IN]: 10,
  [REGION.AE]: 10,
};

export const PHONE_MIN_LENGTH: { [key: string]: number } = {
  [REGION.IN]: 10,
  [REGION.AE]: 7,
};

export const PHONE_LABEL: StringObject = {
  [REGION.IN]: '+91',
  [REGION.AE]: '+971',
};

export const UTR_LABEL: StringObject = {
  [REGION.IN]: 'UTR No.',
  [REGION.AE]: 'Bank Reference No.',
};

type IbanFormat = {
  length: number;
  format: string;
};

export const IBAN_FORMAT_BY_COUNTRY: { [key: string]: IbanFormat } = {
  AL: { length: 28, format: 'ALkkBBBBSSSSCCCCCCCCCCCCCCCX' },
  AD: { length: 24, format: 'ADkkBBBBSSSSCCCCCCCCCCC' },
  AT: { length: 20, format: 'ATkkBBBBBCCCCCCCCCCC' },
  AZ: { length: 28, format: 'AZkkBBBBCCCCCCCCCCCCCCCC' },
  BH: { length: 22, format: 'BHkkBBBBCCCCCCCCCCCCC' },
  BY: { length: 28, format: 'BYkkBBBBCCCCCCCCCCCCCCCC' },
  BE: { length: 16, format: 'BEkkBBBBCCCCCCXX' },
  BA: { length: 20, format: 'BAkkBBBSSCCCCCCCCC' },
  BR: { length: 29, format: 'BRkkBBBBBBBBSSSSCCCCCCCCC' },
  BG: { length: 22, format: 'BGkkBBBBSSSDDCCCCCCC' },
  CR: { length: 22, format: 'CRkkBBBBCCCCCCCCCCCC' },
  HR: { length: 21, format: 'HRkkBBBBBCCCCCCCCC' },
  CY: { length: 28, format: 'CYkkBBBBSSSSCCCCCCCCCCCCCCCX' },
  CZ: { length: 24, format: 'CZkkBBBBSSSSCCCCCCCCCCC' },
  DK: { length: 18, format: 'DKkkBBBBCCCCCCCCC' },
  DO: { length: 28, format: 'DOkkBBBBCCCCCCCCCCCCCCCCCCCX' },
  EG: { length: 29, format: 'EGkkBBBBCCCCCCCCCCCCCCCCCCCC' },
  EE: { length: 20, format: 'EEkkBBBBCCCCCCCCCCCX' },
  FO: { length: 18, format: 'FOkkBBBBCCCCCCCCC' },
  FI: { length: 18, format: 'FIkkBBBBCCCCCCCCC' },
  FR: { length: 27, format: 'FRkkBBBBBGGGGGCCCCCCCCCCCXX' },
  GE: { length: 22, format: 'GEkkBBCCCCCCCCCCCCCXX' },
  DE: { length: 22, format: 'DEkkBBBBBBBBCCCCCCCCC' },
  GI: { length: 23, format: 'GIkkBBBBCCCCCCCCCCCCCCC' },
  GR: { length: 27, format: 'GRkkBBBBSSSSCCCCCCCCCCCXX' },
  GL: { length: 18, format: 'GLkkBBBBCCCCCCCCC' },
  GT: { length: 28, format: 'GTkkBBBBCCCCCCCCCCCCCCCCCCCX' },
  HU: { length: 28, format: 'HUkkBBBBCCCCCCCCCCCCCCCCCCCX' },
  IS: { length: 26, format: 'ISkkBBBBCCCCCCCCXXX' },
  IQ: { length: 23, format: 'IQkkBBBBCCCCCCCCCCCCC' },
  IE: { length: 22, format: 'IEkkBBBBBCCCCCCCCCCC' },
  IL: { length: 23, format: 'ILkkBBBBCCCCCCCCCCCCC' },
  IT: { length: 27, format: 'ITkkXBBBSSSSSSSCCCCCCCCCXX' },
  JO: { length: 30, format: 'JOkkBBBBCCCCCCCCCCCCCCCCCCCCC' },
  KZ: { length: 20, format: 'KZkkBBBBCCCCCCCCCCCX' },
  XK: { length: 20, format: 'XKkkBBBBCCCCCCCCCCC' },
  KW: { length: 30, format: 'KWkkBBBBCCCCCCCCCCCCCCCCCCCCC' },
  LV: { length: 21, format: 'LVkkBBBBCCCCCCCCCCC' },
  LB: { length: 28, format: 'LBkkBBBBCCCCCCCCCCCCCCCCCCCC' },
  LI: { length: 21, format: 'LIkkBBBBBCCCCCCCCC' },
  LT: { length: 20, format: 'LTkkBBBBCCCCCCCCCCCX' },
  LU: { length: 20, format: 'LUkkBBBBCCCCCCCCCCCX' },
  MT: { length: 31, format: 'MTkkBBBBSSSSCCCCCCCCCCCCCCCCCCCX' },
  MR: { length: 27, format: 'MRkkBBBBBSSSSSCCCCCCCCCCXX' },
  MU: { length: 30, format: 'MUkkBBBBBBSSSSSSSSSCCCCCCCCXX' },
  MD: { length: 24, format: 'MDkkBBCCCCCCCCCCCCCCCCCCCX' },
  MC: { length: 27, format: 'MCkkBBBBBGGGGGCCCCCCCCCCCXX' },
  ME: { length: 22, format: 'MEkkBBBCCCCCCCCCCCCCXX' },
  NL: { length: 18, format: 'NLkkBBBBCCCCCCCCC' },
  MK: { length: 19, format: 'MKkkBBBBCCCCCCCCCCCCCXX' },
  NO: { length: 15, format: 'NOkkBBBBCCCCCX' },
  PK: { length: 24, format: 'PKkkBBBBCCCCCCCCCCCCCCCX' },
  PS: { length: 29, format: 'PSkkBBBBCCCCCCCCCCCCCCCCCCCC' },
  PL: { length: 28, format: 'PLkkBBBBBBBBCCCCCCCCCCCCCCCX' },
  PT: { length: 25, format: 'PTkkBBBBBSSSSSCCCCCCCCCCX' },
  QA: { length: 29, format: 'QAkkBBBBCCCCCCCCCCCCCCCCCCCC' },
  RO: { length: 24, format: 'ROkkBBBBCCCCCCCCCCCCCCCC' },
  LC: { length: 32, format: 'LCkkBBBBBBBBBBBBBBBBBBBBBBBBBBBB' },
  SM: { length: 27, format: 'SMkkXBBBSSSSSCCCCCCCCCCXX' },
  SA: { length: 24, format: 'SAkkBBCCCCCCCCCCCCCCCCCCCX' },
  RS: { length: 22, format: 'RSkkBBBCCCCCCCCCCCCCXX' },
  SK: { length: 24, format: 'SKkkBBBBSSSSCCCCCCCCCCCX' },
  SI: { length: 19, format: 'SIkkBBSSSCCCCCCCCCCX' },
  ES: { length: 24, format: 'ESkkBBBBSSSSCCCCCCCCCCCX' },
  SE: { length: 24, format: 'SEkkBBBBCCCCCCCCCCCCCCCX' },
  CH: { length: 21, format: 'CHkkBBBBBCCCCCCCCC' },
  TL: { length: 23, format: 'TLkkBBBBBBBBSSCCCCCCCCCCC' },
  TN: { length: 24, format: 'TNkkBBSSSCCCCCCCCCCCCCC' },
  TR: { length: 26, format: 'TRkkBBBBBSSSSSCCCCCCCCCC' },
  UA: { length: 29, format: 'UAkkBBBBCCCCCCCCCCCCCCCCCCCC' },
  AE: { length: 23, format: 'AEkkBBBBCCCCCCCCCCCCCCC' },
  GB: { length: 22, format: 'GBkkBBBBBCCCCCCCCCCCCC' },
  VG: { length: 24, format: 'VGkkBBBBCCCCCCCCCCCCCCCX' },
};

export enum ACCOUNT_TYPE {
  GLOBAL_PAYOUTS = 'FI_OPGSP_EXP',
}

export const defaultTabMenuConfig = sharedDefaultTabMenuConfig;
