// Images
import amex from 'images/cards/amex.svg';
import discover from 'images/cards/discover.svg';
import mastercard from 'images/cards/master.svg';
import maestro from 'images/cards/maestro.svg';
import diners from 'images/cards/diners.svg';
import jcb from 'images/cards/jcb.svg';
import rupay from 'images/cards/rupay.svg';
import visa from 'images/cards/visa.svg';

// Utils
import { getCardCompany } from 'utils/common';

const map: AnyObject = {
  amex,
  discover,
  mastercard,
  maestro,
  diners,
  jcb,
  rupay,
  visa,
};

const getCardIcon = (type: string, value: string) => {
  let company;

  switch (type) {
    case 'NUMBER':
      company = getCardCompany(value);
      break;

    case 'NAME':
      company = value;
      break;
  }

  return company ? map[company] : null;
};

export default getCardIcon;
