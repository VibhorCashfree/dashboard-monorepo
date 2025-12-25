// Constants
import { MODAL_TYPE } from './constants';

export type AddBeneficiaryModalProps = {
  type: MODAL_TYPE;
  selectedRow: AnyObject;
  onClose: () => void;
  onSubmit: (beneId: string) => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  selectedRow: AnyObject;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
};

export type StepOneProps = {
  formObj: AnyObject;
  errorObj: AnyObject;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export type IbanFeedback = {
  [key: string]: {
    type: string;
    message: string;
  };
};

export type StepTwoProps = {
  benePurpose: string;
  formObj: AnyObject;
  errorObj: AnyObject;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    data: { name: string; value: string },
  ) => void;
};

export type StepThreeProps = {
  selectedRow: AnyObject;
  formObj: AnyObject;
  errorObj: AnyObject;
  onChange: (event: React.ChangeEvent) => void;
};
