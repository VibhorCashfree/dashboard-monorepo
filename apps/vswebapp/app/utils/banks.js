// Constants
import { BANK_CODES } from 'constants/banks';

// Images
import axisIcon from 'images/banks/axis.svg';
import citibankIcon from 'images/banks/citibank.svg';
import hdfcIcon from 'images/banks/hdfc.svg';
import iciciIcon from 'images/banks/icici.svg';
import idfcIcon from 'images/banks/idfc.svg';
import rblIcon from 'images/banks/rbl.svg';
import kotakIcon from 'images/banks/kotak.svg';
import sbiIcon from 'images/banks/sbi.svg';
import standardCharteredIcon from 'images/banks/standard-chartered.svg';
import yesbankIcon from 'images/banks/yes.svg';
import indusIndbankIcon from 'images/banks/indus.svg';
import paytmbankIcon from 'images/paytm.svg';
import cashfreeIcon from 'images/cashfree.svg';

const iconByCode = {
  [BANK_CODES.UTIB]: axisIcon,
  [BANK_CODES.CITI]: citibankIcon,
  [BANK_CODES.HDFC]: hdfcIcon,
  [BANK_CODES.ICIC]: iciciIcon,
  [BANK_CODES.IDFB]: idfcIcon,
  [BANK_CODES.RBLB]: rblIcon,
  [BANK_CODES.KKBK]: kotakIcon,
  [BANK_CODES.SBIN]: sbiIcon,
  [BANK_CODES.SCBL]: standardCharteredIcon,
  [BANK_CODES.YESB]: yesbankIcon,
  [BANK_CODES.INDB]: indusIndbankIcon,
  [BANK_CODES.CASH]: cashfreeIcon,
  [BANK_CODES.PYTM]: paytmbankIcon,
};

const getCode = ifsc => ifsc.slice(0, 4);

const getIcon = ifsc => {
  const code = getCode(ifsc);
  return iconByCode[code];
};

export default {
  getCode,
  getIcon,
};
