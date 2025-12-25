// Constants
import { MODAL_TYPE } from './constants';

export type TransferDetailsProps = {
  fundSources: AnyObject[];
};

export type RiskInsightsProps = {
  transferDetails: {
    vpa: string;
    bankAccount: string;
    ifsc: string;
    addedOn: string;
  };
};

export type ReviewTransferProps = {
  original: Record<string, unknown>;
  transactionData: {
    status: string;
    amount: number;
  };
  referenceId: number;
  fetchTransferDetails: () => void;
};

export type ModalsProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  amount: string;
  referenceId: number;
  fetchTransferDetails: () => void;
};

export type SubCardInsights = {
  header: React.ReactNode;
  body: string;
  footer: string;
};

export type InsightsCardProps = {
  title: string;
  infoDescription?: string;
  loading: boolean;
  childElements: SubCardInsights[];
};

export type BlockedReasonProps = {
  detailedDescription: string;
  status: string;
  original: {
    selectedCard: string;
    metadata: string;
  };
};

export type ApproveAndWhiteListProps = {
  transferDetails: AnyObject;
  fetchTransferDetails: () => void;
  original: AnyObject;
};

export type LocationState = {
  fromBatch: boolean;
  fileType: string;
  type: string;
  original: AnyObject;
};
