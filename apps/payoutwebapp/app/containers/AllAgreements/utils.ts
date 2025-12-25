// Constants
import { ESCROW_PARTY_TYPE } from './constants';

type Party = {
  type: ESCROW_PARTY_TYPE;
  allocated_percentage_of_amount: string;
};

export const isFormTwoValid = (parties: Party[]) => {
  let buyerProportion = 0;
  let sellerProportion = 0;

  parties.forEach((party: Party) => {
    if (party.type === ESCROW_PARTY_TYPE.SELLER) {
      sellerProportion =
        sellerProportion + parseFloat(party.allocated_percentage_of_amount);
    } else if (party.type === ESCROW_PARTY_TYPE.BUYER) {
      buyerProportion =
        buyerProportion + parseFloat(party.allocated_percentage_of_amount);
    }
  });

  return buyerProportion === 100 && sellerProportion === 100;
};
