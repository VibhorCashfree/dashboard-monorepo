export type DataState = {
  beneficiary: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  validTill: string;
  addedBy: {
    name: string;
    source: string;
  };
  link: string;
  status: string;
  approvals: Array<any>;
  rejections: Array<any>;
  redemption: {
    redeemedAt: string;
    utr: string;
    transferMethod: string;
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    vpa: string;
    phone: string;
    maskedCard: string;
  };
  verificationDetails: {
    name: string;
    date: string;
    status: boolean;
  };
  reason: string;
  type: string;
  description: string;
  remarks: string;
};

export type LocationState = {
  rowDetails: {
    cashgramId: string;
    amount: number;
  };
  fromBatch: boolean;
};
