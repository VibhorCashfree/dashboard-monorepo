import { BANK_CODE } from '../constants/banks';
import Banks from '../utils/banks';

type Response = {
  accountNumber: string;
  bankName: string;
  ifsc: string;
};

export const from = (response: Response[]) => {
  const VALID_BANKS: string[] = [BANK_CODE.IDFB, BANK_CODE.RBLB];

  return response.filter((account) => {
    const code = Banks.getCode(account.ifsc);
    const bankCheck = VALID_BANKS.includes(code);
    const accountNumberCheck = !account.accountNumber.startsWith('808080');

    return bankCheck && accountNumberCheck;
  });
};

export default {
  from,
};
