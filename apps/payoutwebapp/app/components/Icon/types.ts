// Constants
import { map } from './';

export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  name: keyof typeof map;
  fill?: string;
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

export type StyledProps = Props & WithTheme;
