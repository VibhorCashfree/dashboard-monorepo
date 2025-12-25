import _noop from 'lodash/noop';

// Utils
import {
  requiredValidation,
  digitsValidation,
  emailValidation,
} from 'utils/formValidation';

export const REQUIRED_FIELDS = {
  ADD_RECIPIENT: ['emails'],
  SET_THRESHOLD: ['fundSourceId', 'lowBalance'],
};

export enum MODAL_TYPE {
  ADD_RECIPIENT = 'ADD_RECIPIENT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',

  EMPTY = '',
}

export enum LEVEL {
  ACCOUNT = 'ACCOUNT',
  FUNDSOURCE = 'FUNDSOURCE',
}

export const keyByLevel = {
  [LEVEL.ACCOUNT]: {
    id: 'ID',
    floor: 'Floor',
    tdr: 'Tdr',
    fixedCharge: 'FixedCharge',
    cappedAt: 'CappedAt',
    perLakh: 'PerLakh',
    modeId: 'ModeID',
    mode: 'Mode',
  },
  [LEVEL.FUNDSOURCE]: {
    id: 'id',
    floor: 'floor',
    tdr: 'tdr',
    fixedCharge: 'fixedCharge',
    cappedAt: 'cappedAt',
    perLakh: 'perLakh',
    modeId: 'modeId',
    mode: 'mode',
  },
};
export enum PREFERENCE_TYPE_OPTION {
  TOGGLE = 'toggle',
  INPUT = 'input',
}

export enum LABEL_BY_PREFERENCE_TYPE {
  TRANSFERS = 'Transfers',
  CASHGRAM = 'Cashgram',
  NOTIFICATIONS = 'Notifications',
  WEBHOOKS = 'Webhooks',
  BULK_UPLOAD = 'Bulk Upload',
}

export const preferenceTypeDescription = {
  [LABEL_BY_PREFERENCE_TYPE.TRANSFERS]:
    'Configure transfer related preferences for your payout account',
  [LABEL_BY_PREFERENCE_TYPE.CASHGRAM]:
    'Configure cashgram related settings for your payout account',
  [LABEL_BY_PREFERENCE_TYPE.NOTIFICATIONS]:
    'Configure notification related settings for your payout account',
  [LABEL_BY_PREFERENCE_TYPE.WEBHOOKS]:
    'Enable or disable incident webhooks for your payout account',
  [LABEL_BY_PREFERENCE_TYPE.BULK_UPLOAD]:
    'Enable or disable bulk uploads for your payout account',
};

export const preferencesByType = {
  [LABEL_BY_PREFERENCE_TYPE.TRANSFERS]: [
    {
      name: 'DISABLE_RETRY_TRANSFER_PAYOUT',
      title: 'Disable Transfer Retry',
      description:
        'Transfer will not be retried by Cashfree in case the first transfer attempt has Failed.',
      type: PREFERENCE_TYPE_OPTION.TOGGLE,
      editable: true,
      validation: _noop,
    },
    {
      name: 'DISABLE_NEFT_RETRY',
      title: 'Disable NEFT Retry',
      description: 'If NEFT mode is enabled, retry will happen via NEFT mode.',
      type: PREFERENCE_TYPE_OPTION.TOGGLE,
      editable: true,
      validation: _noop,
    },
    {
      name: 'MAX_LOW_BALANCE_QUEUEING_TIME',
      title: 'Maximum time for Low Balance Transfer Queuing',
      description:
        'Set a maximum time for low balance transfer queuing, transfers will be marked as failed if the fund source is not recharged within this queuing time (in hours)',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: true,
      validation: digitsValidation,
    },
    {
      name: 'PHONE_MODE_NAME_MATCH_THRESHOLD',
      title: 'Name Match Threshold',
      description:
        'Customise the name match threshold for payouts to phone number and Cashgram validation.',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: true,
      validation: requiredValidation,
    },
    {
      name: 'TRANSFERS_MAX_RETRY_TIME',
      title: 'Maximum Retry time for Transfers',
      description:
        'Set a maximum time for transfer retries (in hours). Transfers will be marked as failed if this time is breached, and no further retries will be done by Cashfree',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: true,
      validation: digitsValidation,
    },
  ],
  [LABEL_BY_PREFERENCE_TYPE.CASHGRAM]: [
    {
      name: 'CASHGRAM_REDIRECT_URL',
      title: 'Cashgram Redirect URL',
      description:
        'Customise the URL to which the beneficiary should be redirected after the transfer is completed.',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: true,
      validation: requiredValidation,
    },
    {
      name: 'CASHGRAM_SUPPORT_MAIL',
      title: 'Cashgram Support Mail',
      description:
        'Set a customer support email for the beneficiaries in case of escalations.',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: true,
      validation: emailValidation,
    },
    {
      name: 'CASHGRAM_TRANSFER_ENABLED',
      title: 'Enable Cashgram ',
      description: 'Enable/ Disable Cashgram product',
      type: PREFERENCE_TYPE_OPTION.TOGGLE,
      editable: true,
      validation: _noop,
    },
    {
      name: 'CASHGRAM_MERCHANT_NAME',
      title: 'Customised Cashgram Merchant Name',
      description:
        'Customise the brand name, this name will appear in beneficiary notifications and on the Cashgram page visible to the end beneficiary',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: false,
      validation: _noop,
    },
    {
      name: 'CASHGRAM_VALIDATION_BV_RATE',
      title: 'Cashgram Bank Account Validation Rate',
      description: 'Cashgram Bank Account Validation rate',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: false,
      validation: _noop,
    },
    {
      name: 'CASHGRAM_VALIDATION_CREATION_RATE',
      title: 'Cashgram Creation Rate',
      description: 'Cashgram Creation Rate',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: false,
      validation: _noop,
    },
  ],
  [LABEL_BY_PREFERENCE_TYPE.WEBHOOKS]: [
    {
      name: 'INCIDENT_WEBHOOK_ENABLED',
      title: 'Enable Webhooks for Incidents',
      description: 'Enable webhooks in case there are any incidents',
      type: PREFERENCE_TYPE_OPTION.TOGGLE,
      editable: true,
      validation: _noop,
    },
  ],
  [LABEL_BY_PREFERENCE_TYPE.NOTIFICATIONS]: [
    {
      name: 'AMAZON_UPI_BENE_NOTIFY_MEDIUM',
      title: 'Amazon Beneficiary Notification Channels',
      description:
        'Enable notification channels for amzn_upi mode transfers. Beneficiaries will be notified on the enabled channels',
      type: PREFERENCE_TYPE_OPTION.INPUT,
      editable: false,
      validation: _noop,
    },
  ],
  [LABEL_BY_PREFERENCE_TYPE.BULK_UPLOAD]: [
    {
      name: 'BULK_UPLOADS_BENE',
      title: 'Enable Beneficiary Bulk Uploads',
      description:
        'Allow uploading beneficiaries in bulk from the payouts dashboard',
      type: PREFERENCE_TYPE_OPTION.TOGGLE,
      editable: true,
      validation: _noop,
    },
  ],
};
