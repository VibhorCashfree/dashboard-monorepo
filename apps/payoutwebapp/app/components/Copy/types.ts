export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  value: any;
  onClick?: (event: React.MouseEvent) => void;
}

export type StyledProps = Props & WithTheme;
