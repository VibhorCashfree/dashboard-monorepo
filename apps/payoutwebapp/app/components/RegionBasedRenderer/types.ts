// Constants
import { REGION } from 'constants/common';

export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  children: React.ReactNode;
  regions: REGION[];
}

export type StyledProps = Props & WithTheme;
