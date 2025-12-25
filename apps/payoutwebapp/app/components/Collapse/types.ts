export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  label?: string;
  children: React.ReactNode;
}

export type StyledProps = Props & WithTheme;
