// Constants
import { MODAL_TYPE } from './constants';

export type CreateVirtualAccountModalProps = {
  onResponse: (response: AnyObject, formObj: AnyObject) => void;
  onClose: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
};
