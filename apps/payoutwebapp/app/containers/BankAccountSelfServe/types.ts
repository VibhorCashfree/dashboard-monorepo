// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { MODAL_TYPE } from 'containers/AllFundSources/constants';

export type BankAccountSelfServeProps = {
  isRouter?: boolean;
  selectedRow?: AnyObject;
  fundSources: AnyObject[];
  fetchFundSources: () => void;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  modalData?: AnyObject;
  setModalData: React.Dispatch<React.SetStateAction<AnyObject>>;
  handleClose: () => void;
};

export type AccountDetailsProps = {
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  errorObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  modalData?: any;
  onDone: (step?: number) => void;
};

export type ICICIBusinessDetailsProps = {
  fundSource: AnyObject;
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  errorObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
};

export type MakePaymentProps = {
  fundSources: AnyObject[];
  fundSource: AnyObject;
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
};

export type ModeRequestResponseProps = {
  data: {
    transferType: string;
    bankUrl: string;
    request: string;
    response: string;
    verified: boolean;
  };
};

export type RouterAccountDetailsProps = {
  lead: { id: string; status: string } | null;
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  errorObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  onDone: (step?: number) => void;
};

export type VerifyProdCredentialsProps = {
  fundSource: {
    fundSourceId: number;
    status: string;
    supportedModes: string[];
  };
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  errorObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  onDone: () => void;
};

export type VerifyUATCredentialsProps = {
  fundSource: AnyObject;
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  errorObj: AnyObject;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  onDone: () => void;
};

export type YesBusinessDetailsProps = {
  fundSource: {
    fundSourceId: number;
    bankAccount: string;
  };
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  errorObj: AnyObject;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setModalData: React.Dispatch<React.SetStateAction<AnyObject>>;
  onDone: () => void;
};
