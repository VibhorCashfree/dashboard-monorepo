// Constants
import { MODAL_TYPE } from './constants';

export type ModalData = {
  id?: string;
  error?: {
    message: string;
  };
  count?: {
    invalid: number;
    valid: number;
  };
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  downloadSampleFile: () => void;
};
