// Constants
import { VIDEO_EMBEDS } from 'constants/videoEmbeds';

export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  embedKey?: keyof typeof VIDEO_EMBEDS;
  children: any;
}

export type StyledProps = Props & WithTheme;
