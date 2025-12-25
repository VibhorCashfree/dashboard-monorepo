// Constants
import { MODAL_TYPE, LABEL_BY_PREFERENCE_TYPE } from './constants';

export type FundSourceChargesProps = {
  fundSource: AnyObject;
  mode: string;
};

export type Category = {
  notifType: string;
  notifSubType: string;
  name: string;
  description: string;
  enabled: boolean;
  recipients: string[];
};

export type EmailCategoryProps = {
  category: Category;
  onToggle: (event: React.MouseEvent, category: Category) => void;
  onRemoveRecipient: (
    event: React.MouseEvent,
    category: Category,
    recipient: string,
  ) => void;
};

export type Preferences = {
  modeByName: AnyObject;
};

export type PayoutMethodsProps = {
  fundSources: AnyObject[];
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  selectedAccountId: number;
  data: AnyObject;
};

export type PreferenceListProps = {
  preferenceType: LABEL_BY_PREFERENCE_TYPE;
};

export type PreferenceOptionProps = {
  preferenceType: LABEL_BY_PREFERENCE_TYPE;
  preferenceName: string;
  canUpdate: boolean;
};

export type SetThresholdProps = {
  fundSources: AnyObject[];
};

type RecipientData = {
  [key: string]: {
    name: string;
    notifType: string;
    notifSubType: string;
  };
};

export type AddRecipientModalProps = {
  data: RecipientData;
  selectedAccountId?: number;
  onSubmit: (status: string) => void;
  onClose: () => void;
};
