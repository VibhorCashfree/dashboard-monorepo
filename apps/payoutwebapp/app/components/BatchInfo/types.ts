import { CURRENCY } from 'constants/common';

export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'data'
  > {
  fileName: string;
  fileId: number;
  uploadedAt: string;
  uploadedBy: string;
  amount: string;
  currency: CURRENCY | undefined;
  status: string;
}

export type StyledProps = Props & WithTheme;
