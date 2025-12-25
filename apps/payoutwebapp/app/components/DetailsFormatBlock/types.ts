export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  title: string;
  renderBy: AnyObject;
  children: React.ReactNode;
}

export type StyledProps = Props & WithTheme;
