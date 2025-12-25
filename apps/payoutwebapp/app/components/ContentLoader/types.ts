export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'data'
  > {
  loading: boolean;
  children?: React.ReactNode;
}

export type StyledProps = Props & WithTheme;
