// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';
import { MODAL_TYPE } from './constants';

export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'title'
  > {
  title: React.ReactNode;

  descriptions: string[];
  embedKey?: keyof typeof VIDEO_EMBEDS;
  product: string;
  activationContent?: React.ReactNode;
  features: { heading: string; body: string }[];
  thumbnail?: AnyObject;
}

export type ModalProps = {
  modalType: MODAL_TYPE;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  handleActivation: () => void;
  embedKey?: keyof typeof VIDEO_EMBEDS;
  product: string;
  activationContent?: React.ReactNode;
};

export type StyledProps = Props & WithTheme;
