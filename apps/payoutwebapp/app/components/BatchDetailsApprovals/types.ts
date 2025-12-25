export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'data'
  > {
  data: ApprovalRejectionItem[];
  count: number;
  totalCount: string;
}

export type StyledProps = Props & WithTheme;
