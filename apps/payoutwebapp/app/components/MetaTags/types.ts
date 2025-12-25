export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'title'
  > {
  title: string;
}

export type StyledProps = Props & WithTheme;
