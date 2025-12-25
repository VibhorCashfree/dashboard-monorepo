export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  type: 'success' | 'warning' | 'danger' | 'info';
  compact?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export type StyledProps = Props & WithTheme;
