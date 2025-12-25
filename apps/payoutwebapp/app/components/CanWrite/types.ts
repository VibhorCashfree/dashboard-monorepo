export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  children: React.ReactNode;
  code: number | number[];
  remove?: boolean;
}

export type StyledProps = Props & WithTheme;
