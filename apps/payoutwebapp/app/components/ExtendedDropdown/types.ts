export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  actions: {
    text: string;
    value: any;
    primary?: boolean;
    disabled?: boolean;
    tooltip?: string;
  }[];
  onClick: (value: any) => void;
}

export type StyledProps = Props & WithTheme;
