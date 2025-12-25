// Constants
import { BANK_CODE } from 'constants/banks';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

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
import enbdBankIcon from 'images/banks/enbd.svg';
import cashfreeIcon from 'images/cashfree.svg';

const iconByCode: AnyObject = {
  [BANK_CODE.UTIB]: axisIcon,
  [BANK_CODE.CITI]: citibankIcon,
  [BANK_CODE.HDFC]: hdfcIcon,
  [BANK_CODE.ICIC]: iciciIcon,
  [BANK_CODE.IDFB]: idfcIcon,
  [BANK_CODE.RBLB]: rblIcon,
  [BANK_CODE.KKBK]: kotakIcon,
  [BANK_CODE.SBIN]: sbiIcon,
  [BANK_CODE.SCBL]: standardCharteredIcon,
  [BANK_CODE.YESB]: yesbankIcon,
  [BANK_CODE.INDB]: indusIndbankIcon,
  [BANK_CODE.ENBD]: enbdBankIcon,
  [BANK_CODE.CASH]: cashfreeIcon,
};

const getCode = (ifsc: string) => ifsc.slice(0, 4);

const getIcon = (ifsc: string, fsDisplayType?: FS_DISPLAY_TYPE) => {
  let code;

  switch (fsDisplayType) {
    case FS_DISPLAY_TYPE.CASHFREE_WALLET:
      code = BANK_CODE.CASH;
      break;

    default:
      code = getCode(ifsc);
      break;
  }

  return iconByCode[code];
};

export default {
  getCode,
  getIcon,
};
