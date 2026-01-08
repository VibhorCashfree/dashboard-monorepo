export interface StatusLabelProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'as' | 'children'> {
  children: string;
  animation?: boolean;
  filled?: boolean;
}
