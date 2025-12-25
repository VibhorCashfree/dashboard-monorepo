// Constants
import { MODAL_TYPE } from './constants';

export type AddIPAddressModalProps = {
  onClose: () => void;
  onSubmit: () => void;
};

export type DeleteIPAddressModalProps = {
  ipAddress: string;
  onClose: () => void;
  onDeleteIP?: () => void;
};

export type DeletePublicKeyModalProps = {
  onClose: () => void;
  onDeletePublicKey?: () => void;
};

export type GenerateTwoFactorModalProps = {
  email: string;
  onClose: () => void;
  onSubmit: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  handleSwitchMethod: () => void;
  deletePublicKey: () => void;
  deleteIPAddress: () => void;
  selected: string;
  currentMethod: string;
  data: {
    merchantEmail: string;
  };
};

export type SwitchTwoFactorModalProps = {
  method?: string;
  onSwitch: () => void;
  onClose: () => void;
};

export type IPRow = {
  addedOn: string;
  generatedBy: string;
  merchantIP: string;
  isActive: 0 | 1;
  isApproved: 0 | 1;
};

export type PublicKeyRow = {
  addedOn: string;
  generatedBy: string;
};
