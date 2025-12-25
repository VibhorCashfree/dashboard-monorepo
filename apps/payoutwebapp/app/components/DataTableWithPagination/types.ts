export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  loading: boolean;
  limit: number;
  currentPage: number;
  data?: any;
  columns: AnyObject[];
  noRecords?: { text: string; icon: React.ReactNode };
  selectProps?: any;
  onPageChange: (e: React.MouseEvent, data: any) => void;
  onLimitChange: (e: React.MouseEvent, data: any) => void;
  onRowClick: (arg: any) => void;
}

export type StyledProps = Props & WithTheme;
