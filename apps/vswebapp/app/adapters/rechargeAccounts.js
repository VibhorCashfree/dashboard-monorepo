// Utils
import Banks from 'utils/banks';

// Constants
import { BANK_CODES } from 'constants/banks';

const from = response => {
  const VALID_BANKS = [BANK_CODES.IDFB, BANK_CODES.RBLB];
  return response.filter(account => {
    const code = Banks.getCode(account.ifsc);
    const bankCheck = VALID_BANKS.includes(code);
    const accountNumberCheck = !account.accountNumber.startsWith('808080');
    return bankCheck && accountNumberCheck;
  });
};
export default {
  from,
};
