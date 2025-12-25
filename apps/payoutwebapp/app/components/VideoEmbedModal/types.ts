// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  children: React.ReactNode;
  embedKey: keyof typeof VIDEO_EMBEDS;
  onClose: () => void;
}

export type StyledProps = Props & WithTheme;
