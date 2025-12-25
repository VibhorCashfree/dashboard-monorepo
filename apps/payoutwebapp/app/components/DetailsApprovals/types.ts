export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'data'
  > {
  data: ApprovalRejectionItem[];
}

export type StyledProps = Props & WithTheme;
