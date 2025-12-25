export type EscrowPartyProps = {
  data: {
    type: string;
    name: string;
    pan: string;
    phone: string;
    email: string;
    address: string;
    bank_account: string;
    ifsc: string;
  };
  index: number;
};

export type PartiesTransferDetailsProps = {
  data: {
    name: string;
    transfer_detail: {
      transfer_id: string;
      added_on: string;
      transfer_status: string;
      amount: number;
    };
    bene_Id: string;
  };
};
