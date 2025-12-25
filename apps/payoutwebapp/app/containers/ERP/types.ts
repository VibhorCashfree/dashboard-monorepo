// Constants
import { CONNECTED_BANK } from 'containers/BankAccountSelfServe/constants';
import { MODAL_TYPE } from './constants';

export type ERPProps = {
  fundSources: AnyObject[];
  fetchFundSources: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  selectedBank: CONNECTED_BANK.CANARA_CONNECTED | CONNECTED_BANK.AU_CONNECTED;
};

export type CreateBankAccountProps = {
  selectedBank: CONNECTED_BANK.CANARA_CONNECTED | CONNECTED_BANK.AU_CONNECTED;
  onClose: () => void;
};
