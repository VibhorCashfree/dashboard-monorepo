type DateDetail = {
  addedDate: string;
  statusRate: number;
  bankStatusDetail: BankStatusDetail[];
};

export type BankStatusDetail = {
  bankStatus: string;
  totalTransfer: number;
};

export type DataElement = {
  status: string;
  dateDetail: DateDetail[];
};

export type StatusMaps = {
  statusDateMap: Record<string, Record<string, number>>;
  bankStatusDateMap: Record<string, Record<string, Record<string, number>>>;
};

export type SuccessRateProps = {
  fundSources: AnyObject[];
};
