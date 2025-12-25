import moment from 'moment';
import _get from 'lodash/get';
import _find from 'lodash/find';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { STATUS } from 'containers/AllFundSources/constants';

const getActives = (fundSources: AnyObject[]) =>
  fundSources.filter((fundSource) => fundSource.status === STATUS.ACTIVE);

const getByTypes = (fundSources: AnyObject[], types: string[]) =>
  fundSources.filter((fundSource) => types.includes(fundSource.fsDisplayType));

const getPreferences = (fundSources: AnyObject[], fundSourceId: number) => {
  const fundSource = _find(fundSources, { fundSourceId });
  return fundSource?.preferences;
};

const getDowntime = (connBankName: string, downtimes: AnyObject[]) =>
  downtimes.find(function (downtime) {
    if (downtime.cfGateway === connBankName) {
      return moment().isBetween(
        moment(downtime.startTime),
        moment(downtime.endTime),
      );
    }
  });

export const getMainAccountBalance = (fundSources: AnyObject[]) => {
  const mainAccountFundSource = _find(fundSources, { isMainAccount: true });

  const mainAccountBalance = _get(mainAccountFundSource, 'fsBalance');

  if (mainAccountBalance) {
    return mainAccountBalance;
  }

  const cfWalletFundSource = _find(fundSources, {
    fsDisplayType: FS_DISPLAY_TYPE.CASHFREE_WALLET,
  });

  const cfWalletAccountBalance = _get(cfWalletFundSource, 'fsBalance');

  if (cfWalletAccountBalance) {
    return cfWalletAccountBalance;
  }

  return {
    balance: '0',
    availableBalance: '0',
    fundsOnHold: '0',
    overdraft: '0',
    lastUpdated: '',
  };
};

export const getOneEscrow = (fundSources: AnyObject[]) =>
  _find(fundSources, {
    product: 'ONE_ESCROW',
    fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
  });

export const getVirtualAccounts = (fundSources: AnyObject[]) =>
  fundSources.filter(
    (fundSource) =>
      fundSource.product === 'ONE_ESCROW' &&
      fundSource.status !== 'DEACTIVATED' &&
      fundSource.fsDisplayType !== FS_DISPLAY_TYPE.BANK_ACCOUNT,
  );

export default {
  getActives,
  getByTypes,
  getPreferences,
  getDowntime,
  getMainAccountBalance,
  getOneEscrow,
  getVirtualAccounts,
};
