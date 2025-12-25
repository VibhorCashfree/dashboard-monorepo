// Constants
import { MODAL_TYPE } from './constants';

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  hasBatchPreference: boolean;
  batchRowDetails: AnyObject;
  count: number;
  amount: string;
  handleAction: () => void;
};
