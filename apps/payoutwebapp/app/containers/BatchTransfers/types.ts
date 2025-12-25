// Constants
import { MODAL_TYPE } from './constants';

export type ModalData = {
  id?: number;
  error?: {
    message: string;
  };
  count?: {
    valid: number;
    invalid: number;
  };
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  fundSources: AnyObject[];
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  downloadSampleFile: () => void;
};
