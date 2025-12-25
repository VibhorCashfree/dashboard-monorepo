export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'onClick'
  > {
  actions: {
    text: string;
    value: any;
    primary?: boolean;
    disabled?: boolean;
    tooltip?: string;
  }[];
  onClick: (e: React.MouseEvent, itemSelected: any) => void;
}

export type StyledProps = Props & WithTheme;
