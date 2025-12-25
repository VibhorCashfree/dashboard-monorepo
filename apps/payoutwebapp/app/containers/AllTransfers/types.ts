// Constants
import { MODAL_TYPE, LABEL_BY_MODE } from './constants';

export type AllTransfersProps = {
  fundSources: AnyObject[];
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
};

export type QuickTransferModalProps = {
  isOneEscrow?: boolean;
  initialPaymentInstrumentId?: string;
  beneId?: string;
  setBeneId: React.Dispatch<React.SetStateAction<string>>;
  fundSources: AnyObject[];
  switchAddBeneficiary: () => void;
  onClose: () => void;
  onResponse: (response: { type: string; result: any }) => void;
};

export type Mode = keyof typeof LABEL_BY_MODE;

export type Suggestion = {
  beneId: string;
  modes: Mode[];
  name: string;
};
