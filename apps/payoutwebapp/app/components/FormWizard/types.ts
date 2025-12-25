export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  header: {
    title: string;
    subTitle: string;
    actionButtons?: (arg: any) => React.ReactNode;
  };
  closeConfirm: {
    title: string;
    body: string;
  };
  items: {
    label: string;
    render: (arg: any) => React.ReactNode;
    requiredFields: (arg: any) => string[];
  }[];
  activeIndex: number;
  onStepChange: (newStep: number) => void;
  onClose: () => void;
}

export type StyledProps = Props & WithTheme;
