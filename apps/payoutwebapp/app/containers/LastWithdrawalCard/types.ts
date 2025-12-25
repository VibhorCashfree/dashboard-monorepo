// Constants
import { MODAL_TYPE } from './constants';

export type LastWithdrawalCardProps = {
  status: string;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  data: AnyObject;
  setData: React.Dispatch<React.SetStateAction<AnyObject>>;
};

export type SelfWithdrawalModalProps = {
  onResponse: (response: AnyObject, amount: string) => void;
  onClose: () => void;
};
