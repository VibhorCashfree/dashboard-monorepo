type Response = any;

const from = (fundSource: Response): AnyObject => {
  const {
    id,
    fsName,
    bankName,
    balance,
    availableBalance,
    fundsOnHold,
    overdraft,
    updatedOn,
    ...obj
  } = fundSource;

  return {
    ...obj,
    fundSourceId: id,
    paymentInstrumentId: fsName,
    cfBankName: bankName,
    fsBalance: {
      balance,
      availableBalance,
      fundsOnHold,
      overdraft,
      lastUpdated: updatedOn,
    },
  };
};

export default {
  from,
};
