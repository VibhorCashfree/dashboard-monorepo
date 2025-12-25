// Constants
import { MODAL_TYPE } from './constants';

export type CreateCashgramModalProps = {
  onClose: () => void;
  onResponse: (status: 'SUCCESS' | 'FAILED', data: AnyObject) => void;
};

export type DeactivateCashgramModalProps = {
  onClose: () => void;
  data: {
    cashgramId: string;
    name: string;
    phone: string;
    amount: number;
  };
  onSubmit: (modalType: MODAL_TYPE) => void;
};

export type ModalData = {
  vpa?: string;
  referenceId?: string;
  cashgramId?: string;
  amount?: number;
  cashgramLink?: string;
  toBeSent?: boolean;
  message?: string;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  selectedRow: AnyObject;
};

export type SendCashgramModalProps = {
  onClose: () => void;
  data: {
    id: string;
    cashgramId: string;
    name: string;
    email?: string;
    phone?: string;
  };
};
