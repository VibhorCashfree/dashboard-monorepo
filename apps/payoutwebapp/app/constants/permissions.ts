const PERMISSIONS = {
  // Product level
  200: { subgroup: 'mpaaccess', code: 200, description: 'Payout' },
  // Product menu level
  2500: {
    subgroup: 'summary',
    code: 2500,
    description: 'Access Summary',
  },
  2000: {
    subgroup: 'beneficiaries',
    code: 2000,
    description: 'Access Beneficiaries',
  },
  2100: {
    subgroup: 'transfers',
    code: 2100,
    description: 'Access Transfers',
  },
  2150: {
    subgroup: 'statement',
    code: 2150,
    description: 'Access Statements',
  },
  2170: { subgroup: 'cashgram', code: 2170, description: 'Access Cashgram' },
  2850: {
    subgroup: 'agreements',
    code: 2850,
    description: 'Access Agreements',
  },
  2200: {
    subgroup: 'access_control',
    code: 2200,
    description: 'Access Control',
  },
  2600: { subgroup: 'reports', code: 2600, description: 'Access Reports' },
  2700: {
    subgroup: 'fundsources',
    code: 2700,
    description: 'Access FundSources',
  },
  2800: { subgroup: 'account', code: 2800, description: 'Access Account' },
  2900: { subgroup: 'invoices', code: 2900, description: 'Access Invoices' },
  // Product menu actions level
  20001: {
    subgroup: 'beneficiaries',
    code: 20001,
    description: 'Create/Edit/Delete Beneficiary',
  },
  20002: {
    subgroup: 'beneficiaries',
    code: 20002,
    description: 'Show Beneficiaries',
  },
  20003: {
    subgroup: 'beneficiaries',
    code: 20003,
    description: 'View Bulk Beneficiaries',
  },
  20004: {
    subgroup: 'beneficiaries',
    code: 20004,
    description: 'Create/Edit/Delete Beneficiary Group',
  },
  20005: {
    subgroup: 'beneficiaries',
    code: 20005,
    description: 'View Beneficiaries Group',
  },
  20007: {
    subgroup: 'beneficiaries',
    code: 20007,
    description: 'Download Bulk Beneficiary Report',
  },
  20008: {
    subgroup: 'beneficiaries',
    code: 20008,
    description: 'Initiate Bulk Beneficiary',
  },
  20010: {
    subgroup: 'beneficiaries',
    code: 20010,
    description: 'Update Bulk Beneficiary',
  },
  21001: {
    subgroup: 'transfers',
    code: 21001,
    description: 'Show Transfers',
  },
  21002: {
    subgroup: 'transfers',
    code: 21002,
    description: 'Initiate Quick Transfer',
  },
  21003: {
    subgroup: 'transfers',
    code: 21003,
    description: 'Initiate Bulk Transfer',
  },
  21004: {
    subgroup: 'transfers',
    code: 21004,
    description: 'Approve Quick Transfer',
  },
  21005: {
    subgroup: 'transfers',
    code: 21005,
    description: 'Approve Bulk Transfer',
  },
  21006: {
    subgroup: 'transfers',
    code: 21006,
    description: 'Download Transfer Report',
  },
  21007: {
    subgroup: 'transfers',
    code: 21007,
    description: 'Reversed transfers',
  },
  21008: {
    subgroup: 'transfers',
    code: 21008,
    description: 'Internal transfer',
  },
  21501: {
    subgroup: 'statement',
    code: 21501,
    description: 'Show Statement',
  },
  21502: {
    subgroup: 'statement',
    code: 21502,
    description: 'Download Statement',
  },
  21503: { subgroup: 'statement', code: 21503, description: 'Show Balance' },
  21504: {
    subgroup: 'statement',
    code: 21504,
    description: 'Withdraw Balance',
  },
  21505: {
    subgroup: 'statement',
    code: 21505,
    description: 'Download Invoice',
  },
  21506: {
    subgroup: 'statement',
    code: 21506,
    description: 'Recharge',
  },
  28501: {
    subgroup: 'agreements',
    code: 28501,
    description: 'Create Agreement',
  },
  28502: {
    subgroup: 'agreements',
    code: 28502,
    description: 'Update Agreement',
  },
  21701: { subgroup: 'cashgram', code: 21701, description: 'View Cashgram' },
  21702: {
    subgroup: 'cashgram',
    code: 21702,
    description: 'Create Cashgram',
  },
  21703: {
    subgroup: 'cashgram',
    code: 21703,
    description: 'Deactivate Cashgram',
  },
  21704: {
    subgroup: 'cashgram',
    code: 21704,
    description: 'Initiate Cashgram',
  },
  21705: {
    subgroup: 'cashgram',
    code: 21705,
    description: 'Approve Bulk Cashgram',
  },
  21706: {
    subgroup: 'cashgram',
    code: 21706,
    description: 'View Bulk Cashgram',
  },
  21707: {
    subgroup: 'cashgram',
    code: 21707,
    description: 'Download Cashgram Report',
  },
  21708: {
    subgroup: 'cashgram',
    code: 21708,
    description: 'View Premium Cashgram',
  },
  21709: {
    subgroup: 'cashgram',
    code: 21709,
    description: 'Verify Premium Cashgram',
  },
  22001: {
    subgroup: 'access_control',
    code: 22001,
    description: 'View whitelisted IPs',
  },
  22002: {
    subgroup: 'access_control',
    code: 22002,
    description: 'Add new IP',
  },
  22003: {
    subgroup: 'access_control',
    code: 22003,
    description: 'View App/Secret',
  },
  22004: {
    subgroup: 'access_control',
    code: 22004,
    description: 'Create new app/secret',
  },
  22005: {
    subgroup: 'access_control',
    code: 22005,
    description: 'Update Webhook',
  },
  22006: {
    subgroup: 'access_control',
    code: 22006,
    description: 'View Preferences',
  },
  22007: {
    subgroup: 'access_control',
    code: 22007,
    description: 'Update Preferences',
  },
  26001: { subgroup: 'reports', code: 26001, description: 'Download Reports' },
  27001: {
    subgroup: 'fundsources',
    code: 27001,
    description: 'Access View Fund Source Weightage',
  },
  27002: {
    subgroup: 'fundsources',
    code: 27002,
    description: 'Access Edit Fund Source Weightage',
  },
  27003: {
    subgroup: 'fundsources',
    code: 27003,
    description: 'Access Add Fund Sources',
  },
  29001: {
    subgroup: 'invoices',
    code: 29001,
    description: 'Access View Invoice Payments',
  },
  29002: {
    subgroup: 'invoices',
    code: 29002,
    description: 'Access Initiate Invoice Payments',
  },
  29003: {
    subgroup: 'invoices',
    code: 29003,
    description: 'Access Approve Invoice Payments',
  },
};

export default PERMISSIONS;
