// Constants
import { MODE_BY_PREF, LABEL_BY_MODE, UNIT } from './constants';

export type SummaryProps = {
  balance: FsBalance;
  fundSources: AnyObject[];
};

export type SwitchProps = {
  value: string;
  options: { key: string; displayName: string }[];
  onChange: (key: string) => void;
};

export type InfographicBarChartProps = {
  type: string;
  dataByStatus: Record<
    string,
    {
      totalCount: number;
      totalVolume: number;
      dataPoints: Array<{
        startTime: string;
        endTime: string;
        count: number;
        volume: number;
      }>;
    }
  >;
  unit: UNIT;
  dateValue: DateRangeValue;
};

export type FundSourceBalanceProps = {
  fundSources: AnyObject[];
};

type PayloadInfo = {
  name: string;
  value: number;
  color: string;
  payload: {
    amount: Record<string, number>;
    count: Record<string, number>;
  };
};

export type CustomTooltipProps = {
  payload?: PayloadInfo[] | null;
  active?: boolean;
};

export type ModePref = keyof typeof MODE_BY_PREF;
export type Mode = keyof typeof LABEL_BY_MODE;

export type activeStatusType = {
  isActive?: boolean;
  isFreeTrialActive?: boolean;
  freeTrialExpiryDate?: string | null;
};

export type PayoutProtectImpactProps = {
  source?: string;
};
