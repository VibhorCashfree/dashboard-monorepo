export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'value' | 'onChange'
  > {
  config?: AnyObject;
  labelByStatus?: StringObject;
  searchOptions?: Array<{ value: string; text: string }>;
  value: AnyObject;
  onChange: (filters: AnyObject, searchBy: string | undefined) => void;
  specialCase?:
    | 'TRANSFERS'
    | 'BATCH_TRANSFER_DETAILS'
    | 'SUMMARY'
    | 'RECHARGE_HISTORY'
    | 'DOWNTIMES';
}

export type StyledProps = Props & WithTheme;
