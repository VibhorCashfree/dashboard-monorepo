import _keyBy from 'lodash/keyBy';

// Utils
import { arrayToObject } from 'utils/common';

const from = (response: {
  data: {
    AccountConfig?: any;
    Preferences?: any;
    SlabCharges?: any;
    modes?: any;
  };
}) => {
  const accountType = response.data.AccountConfig.AccountType;
  const preferenceByProperty = arrayToObject(
    response.data.Preferences,
    'Property',
    'Value',
  );

  const { modes = [] } = response.data;

  const modeByName = _keyBy(modes, 'Mode');
  const enabledModes = Object.keys(modeByName);

  const preferences = {
    isConnected: accountType === 'CONNECTED_BANK',
    enableRouter: Boolean(+preferenceByProperty.ENABLE_ROUTER),
    selfWithdrawal: Boolean(+preferenceByProperty.ENABLE_SELF_WITHDRAWAL),
    isPostpaid: Boolean(+preferenceByProperty.IS_POSTPAID),
    quickTransfer: Boolean(+preferenceByProperty.ENABLE_QUICK_TRANSFER),
    enableTransferTypes: Boolean(+preferenceByProperty.ENABLE_TRANSFER_TYPES),
    enableOneEscrow: Boolean(+preferenceByProperty.ENABLE_ONE_ESCROW),
    enableModeRouting: Boolean(+preferenceByProperty.MODE_WISE_ROUTING_ENABLED),
    webhookVersion: preferenceByProperty.WEBHOOK_VERSION,
    enableVAOnConnectedFS: Boolean(
      +preferenceByProperty.ENABLE_VA_ON_CONNECTED_FS,
    ),
    rechargePercentage:
      +preferenceByProperty.CC_FUNDSOURCE_CHARGE_PERCENTAGE || 2.4,
    enablePrepaidCard: Boolean(
      +preferenceByProperty.ENABLE_PREPAID_CARD_ISSUANCE,
    ),
    enableAPI: preferenceByProperty.ENABLE_API
      ? Boolean(+preferenceByProperty.ENABLE_API)
      : true,
    modeByName,
    transfers: {
      individual: preferenceByProperty.ENABLE_BULK_UPLOADS_TRANSFER_APPROVAL,
      batch: preferenceByProperty.BULK_UPLOADS_APPROVAL,
      upload: Boolean(+preferenceByProperty.ENABLE_BULK_UPLOADS),
      approve: Boolean(+preferenceByProperty.PAYOUT_CHECKER_COUNT),
    },
    cashgrams: {
      activated: Boolean(+preferenceByProperty.CASHGRAM_TRANSFER_ENABLED),
      individual: preferenceByProperty.ENABLE_BULK_UPLOADS_CASHGRAM_APPROVAL,
      batch: preferenceByProperty.BULK_UPLOADS_CASHGRAM_APPROVAL,
      upload: Boolean(+preferenceByProperty.ENABLE_BULK_UPLOADS_CASHGRAM),
      verify: Boolean(+preferenceByProperty.ENABLE_CASHGRAM_VALIDATION_FLOW),
    },
    beneficiaries: {
      purpose: {
        others: Boolean(+preferenceByProperty.BULK_UPLOADS_BENE),
        corpCC: Boolean(+preferenceByProperty.ENABLE_CORP_CC_BENE),
        amazonUPI: enabledModes.includes('AMZN_UPI'),
      },
    },
    merchantPreferences: {
      DISABLE_NEFT_RETRY: Boolean(+preferenceByProperty.DISABLE_NEFT_RETRY),
      DISABLE_RETRY_TRANSFER_PAYOUT: Boolean(
        +preferenceByProperty.DISABLE_RETRY_TRANSFER_PAYOUT,
      ),
      MAX_LOW_BALANCE_QUEUEING_TIME:
        preferenceByProperty.MAX_LOW_BALANCE_QUEUEING_TIME,
      PHONE_MODE_NAME_MATCH_THRESHOLD:
        preferenceByProperty.PHONE_MODE_NAME_MATCH_THRESHOLD,
      TRANSFERS_MAX_RETRY_TIME: preferenceByProperty.TRANSFERS_MAX_RETRY_TIME,
      CASHGRAM_TRANSFER_ENABLED: Boolean(
        +preferenceByProperty.CASHGRAM_TRANSFER_ENABLED,
      ),
      CASHGRAM_MERCHANT_NAME: preferenceByProperty.CASHGRAM_MERCHANT_NAME,
      CASHGRAM_REDIRECT_URL: preferenceByProperty.CASHGRAM_REDIRECT_URL,
      CASHGRAM_SUPPORT_MAIL: preferenceByProperty.CASHGRAM_SUPPORT_MAIL,
      CASHGRAM_VALIDATION_BV_RATE:
        preferenceByProperty.CASHGRAM_VALIDATION_BV_RATE,
      CASHGRAM_VALIDATION_CREATION_RATE:
        preferenceByProperty.CASHGRAM_VALIDATION_CREATION_RATE,
      AMAZON_UPI_BENE_NOTIFY_MEDIUM:
        preferenceByProperty.AMAZON_UPI_BENE_NOTIFY_MEDIUM,
      INCIDENT_WEBHOOK_ENABLED: Boolean(
        +preferenceByProperty.INCIDENT_WEBHOOK_ENABLED,
      ),
      BULK_UPLOADS_BENE: Boolean(+preferenceByProperty.BULK_UPLOADS_BENE),
    },
  };

  return {
    preferences,
    accountConfig: response.data.AccountConfig,
    slabCharges: response.data.SlabCharges || [],
  };
};

export default {
  from,
};
