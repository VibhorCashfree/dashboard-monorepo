const to = (body: {
  bankAccount: string | number;
  ifsc: string;
  panCard: string;
  gstIn: string;
  cin: string;
  din: string;
}) => ({
  bankAccount: body.bankAccount,
  ifsc: body.ifsc,
  source: 'DASHBOARD',
  kycDocuments: {
    PAN: body.panCard,
    GST: body.gstIn,
    CIN: body.cin,
    DIN: body.din,
  },
});

export default {
  to,
};
