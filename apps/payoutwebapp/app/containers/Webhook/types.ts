// Constants
import { MODAL_TYPE, ACTION_TYPE } from './constants';

export type UpdateWebhookModalProps = {
  url?: string;
  actionType: ACTION_TYPE;
  versions: Record<string, { version: string }>;
  onSubmit: (newVersion: string) => void;
  onClose: () => void;
};

export type DeleteWebhookModalProps = {
  onClose: () => void;
  onDelete: () => void;
};

export type ModalsProps = {
  modalType: keyof typeof MODAL_TYPE;
  setFetchCounter: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: () => void;
  handleClose: () => void;
  selected?: string;
  versions: Record<string, { version: string }>;
  setSelectedVersion: React.Dispatch<React.SetStateAction<string>>;
};

export type WebhookData = {
  webhook: {
    webhookUrl: string;
  };
  versions: AnyObject;
};
