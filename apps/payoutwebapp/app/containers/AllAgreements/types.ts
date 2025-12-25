// Constants
import { MODAL_TYPE } from './constants';

export type AddAgreementModalProps = {
  onClose: () => void;
  onResponse: (status: string, data: any) => void;
};

export type AgreementPartiesProps = {
  data: {
    id: string;
    type: string;
    name: string;
    pan: string;
    phone: string;
    email: string;
    address: string;
    bank_account: string;
    ifsc: string;
    allocated_percentage_of_amount: number;
  };
  index: number;
  onDelete: (id: string) => void;
  onEdit: (data: any) => void;
};

export type MarkTerminalStatusModalProps = {
  data: {
    agreement_id: string;
    total_amount: number;
    parties: { name: string; type: string; allocated_amount: number }[];
  };
  onClose: () => void;
  onResponse: (type: string, payload: any) => void;
};

export type ModalData = {
  agreement_id?: string;
  number_of_payouts?: number;
  total_amount?: number;
  message?: string;
  number_of_parties?: number;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  data: AnyObject;
};

export type StepOneProps = {
  formObj: AnyObject;
  errorObj: AnyObject;
  onChange: (
    event: React.ChangeEvent | null,
    data: { name: string; value: any },
  ) => void;
};

export type PartyType = {
  id: number;
  type: string;
  name: string;
  pan: string;
  phone: string;
  email: string;
  bank_account: string;
  ifsc: string;
  address: string;
  allocated_percentage_of_amount: number;
};

export type StepTwoProps = {
  formObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  errorObj: AnyObject;
  onChange: (event: React.ChangeEvent | null) => void;
  parties: PartyType[];
  setParties: React.Dispatch<React.SetStateAction<PartyType[]>>;
  amount: number;
  wasLastPage: boolean;
  setWasLastPage: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StepThreeProps = {
  formObj: AnyObject;
  parties: {
    name: string;
    type: string;
  }[];
};
