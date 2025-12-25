// Constants
import { MODAL_TYPE } from './constants';

export type LastInternalTransferCardProps = {
  data: {
    amount: number;
    status?: string;
    addedOn?: string;
  };
  status: string;
};

export type InternalTransferModalProps = {
  nonConnectedAccounts: Account[];
  balance: FsBalance;
  onResponse: (status: string, amount: number) => void;
  onClose: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  nonConnectedAccounts: Account[];
};

export type OptionProps = {
  name: string;
  amount: string;
};
