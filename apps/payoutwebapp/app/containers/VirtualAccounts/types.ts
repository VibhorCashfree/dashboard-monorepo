// Constants
import { MODAL_TYPE } from './constants';

export type AllocateFundsModalProps = {
  onResponse: (response: { type: string; result: any }) => void;
  onClose: () => void;
};

export type InternalFundTransferModalProps = {
  selectedRow: AnyObject;
  onResponse: (response: AnyObject, formObj: AnyObject) => void;
  onClose: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter?: React.Dispatch<React.SetStateAction<number>>;
  selectedRow: AnyObject;
};
