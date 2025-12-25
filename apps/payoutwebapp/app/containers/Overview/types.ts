// Constants
import { CURRENCY } from 'constants/common';

export type OverviewProps = {
  fetchFundSources: () => void;
};

export type DetailsType = {
  displayName: string;
  paymentInstrumentId: string;
  addedOn: string;
  merchantName: string;
  bankAccount: string;
  status: string;
};

export type AvailableBalanceCardProps = {
  showBalance: boolean;
  availableBalance: string;
  balanceMeta: StringObject;
  onRecharge?: () => void;
};

export type ICICIProps = {
  collectedAmount: string;
  to: string;
  downtimes: AnyObject[];
};

export type LastRechargeCardProps = {
  data: {
    status: string;
    utr: string;
    amount: number;
    error: boolean;
    depositTime: string;
  };
  fsDisplayType: string;
};

export type LowBalanceThresholdCardProps = {
  fundSourceId: number;
  data: {
    lowBalance: number;
  };
  currency: CURRENCY;
};

export type OtherBanksProps = {
  collectedAmount: string;
  to: string;
  downtimes: AnyObject[];
};

type Balance = {
  availableBalance: number;
  overdraft: number;
};

export type OverdraftLimitCardProps = {
  balance: Balance;
  accountManager?: AccountManager;
  currency: CURRENCY;
};

export type AccountType = {
  ifsc: string;
  accountNumber: string;
};

export type RechargeSectionProps = {
  accounts: AccountType[];
};

export type YesBankProps = {
  collectedAmount: string;
  to: string;
  downtimes: AnyObject[];
};
