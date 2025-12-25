type Response = {
  fundSourceId: number;
  Utr: string;
  Amount: number;
  RemitterName: string;
  RemitterAccount: string;
  RemitterIfsc: string;
  AddedOn: string;
  ProcessedOn: string;
};

const from = (response: Response[], fundSourceId: number) => ({
  data: response
    .filter((item) => item.fundSourceId === fundSourceId)
    .map((item) => ({
      addedOn: item.AddedOn,
      updatedOn: item.ProcessedOn,
      utr: item.Utr,
      amount: item.Amount,
      status: 'PENDING_APPROVAL',
    })),
  hasNext: false,
});

export default {
  from,
};
