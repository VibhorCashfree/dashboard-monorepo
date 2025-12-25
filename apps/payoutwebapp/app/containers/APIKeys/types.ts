// Constants
import { MODAL_TYPE } from './constants';

export type DeleteAPIKeyModalProps = {
  isMerchantLevel: boolean;
  clientId: string;
  onDelete: (clientId: string) => void;
  onClose: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  isMerchantLevel: boolean;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: () => void;
  selected?: string;
};

export type NewAPIKeyModalProps = {
  isMerchantLevel: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export type DataState = {
  clientId: string;
  clientSecret: string;
};
