export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  id?: string;
  children: (arg: boolean) => void;
  options: Option[];
  onClick: (value: any) => void;
}

export type StyledProps = Props & WithTheme;
