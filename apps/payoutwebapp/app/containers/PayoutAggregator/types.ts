import React from 'react';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { MODAL_TYPE } from 'containers/AllFundSources/constants';

export type ContextType = {
  wizardData: WizardDataState;
  setWizardData: React.Dispatch<React.SetStateAction<WizardDataState>>;
};

export type WizardDataState = {
  bankName?: string;
  fundSourceId?: number;
  lead: AnyObject | null;
  gateway?: {
    id: number;
    cfBankId: number;
    gatewayName: string;
    gatewayType: string;
    status: string;
    supportedModes: string;
    credentialSchema: string;
    ifscSubStr: string;
    operationalSchema: string;
    leadInfoSchema: string;
  };
};

export type PayoutAggregatorProps = {
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
  onDone: () => void;
};

export type VerifyProdCredentialsProps = {
  fundSource: AnyObject;
  actionType: ACTION_TYPE;
  setActionType: React.Dispatch<React.SetStateAction<ACTION_TYPE>>;
  formObj: AnyObject;
  errorObj: AnyObject;
  setFormObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setErrorObj: React.Dispatch<React.SetStateAction<AnyObject>>;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
};
