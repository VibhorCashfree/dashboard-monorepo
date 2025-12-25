export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  fallback?: any;
  children: React.ReactNode;
}

export type StyledProps = Props & WithTheme;
