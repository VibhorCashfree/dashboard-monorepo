import React from 'react';
import { Image } from '@cashfree-intl/coherent';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

// Utils
import Banks from 'utils/banks';
import FundSourcesUtil from 'utils/fundSources';

export const getFundSourcesOptions = (fundSources: AnyObject[]) => {
  const activeFundSources: AnyObject[] =
    FundSourcesUtil.getActives(fundSources);

  const fundSourcesByTypes: AnyObject[] = FundSourcesUtil.getByTypes(
    activeFundSources,
    [FS_DISPLAY_TYPE.CASHFREE_WALLET, FS_DISPLAY_TYPE.CONNECTED_WALLET],
  );

  return fundSourcesByTypes.map((fundSource: AnyObject) => ({
    key: fundSource.fundSourceId,
    text: fundSource.displayName,
    value: fundSource.fundSourceId,
    description: (
      <span>
        <Image
          inline
          width="55"
          src={Banks.getIcon(fundSource.ifsc, fundSource.fsDisplayType)}
          style={{ marginTop: -8 }}
        />
      </span>
    ),
  }));
};
