export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  children: React.ReactNode;
  onConfirm: () => void;
}

export type StyledProps = Props & WithTheme;
