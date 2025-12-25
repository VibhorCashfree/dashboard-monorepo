import React from 'react';
import { Image, Text } from '@cashfree-intl/coherent';

// Utils
import Banks from 'utils/banks';
import FundSourcesUtil from 'utils/fundSources';

// Constants
import { AGGREGATOR } from 'constants/fundSources';

// Images
import razorpayIcon from 'images/banks/razorpay.svg';

export const getFundSourcesOptions = (
  fundSources: AnyObject[],
  key = 'paymentInstrumentId',
) =>
  FundSourcesUtil.getActives(fundSources).map((fundSource) => ({
    key: fundSource.fundSourceId,
    text: fundSource.displayName,
    value: fundSource[key],
    description: (
      <span>
        <Image
          inline
          width="55"
          src={
            fundSource.connBankName === AGGREGATOR.RAZORPAY
              ? razorpayIcon
              : Banks.getIcon(fundSource.ifsc, fundSource.fsDisplayType)
          }
          style={{ marginTop: -8 }}
        />
      </span>
    ),
  }));

export const getFiltersConfig = (
  fundSources: AnyObject[],
  filtersConfig = {},
) => ({
  ...filtersConfig,
  'Fund Source': {
    columns: 2,
    items: FundSourcesUtil.getActives(fundSources).map((fundSource) => (
      <label
        key={fundSource.paymentInstrumentId}
        // @ts-ignore
        value={fundSource.paymentInstrumentId}
        htmlFor={fundSource.paymentInstrumentId}
      >
        <Text className="text-ellipsis" style={{ width: 150 }}>
          {fundSource.displayName || '–'}
        </Text>
      </label>
    )),
  },
});
