import _first from 'lodash/first';

type Response = {
  amount: string;
  rechargedAmount: string;
  serviceCharge: string;
  serviceTax: string;
  utr: string;
  status: string;
  updatedOn: string;
};

const from = (list: Response[]) => {
  const recharge = _first(list);

  if (!recharge) {
    return {};
  }

  return {
    amount: recharge.amount,
    rechargedAmount: recharge.rechargedAmount,
    serviceCharge: recharge.serviceCharge,
    serviceTax: recharge.serviceTax,
    utr: recharge.utr,
    status: recharge.status,

    depositTime: recharge.updatedOn,
  };
};

export default {
  from,
};
