// Constants
import { MODAL_TYPE } from './constants';

export type AllFundSourcesProps = {
  fundSources: AnyObject[];
  downtimes: AnyObject[];
  fetchFundSources: () => void;
};

export type AddBalanceModalProps = {
  paymentInstrumentId: string;
  onClose: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  selectedRow: AnyObject | undefined;
  setSelectedRow?: React.Dispatch<React.SetStateAction<AnyObject | undefined>>;
  modalData: AnyObject | undefined;
  setModalData: React.Dispatch<React.SetStateAction<AnyObject | undefined>>;
  fundSources: AnyObject[];
  fetchFundSources: () => void;
};

export type UpdateDetailsModalProps = {
  selectedRow: AnyObject;
  onResponse: () => void;
  onClose: () => void;
};

export type UpdateWeightageModalProps = {
  fundSources: AnyObject[];
  onSubmit: (weightage: Weightage[], callback: () => void) => void;
  onClose: () => void;
};
