export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size'
  > {
  fundSource: AnyObject;
  downtimes: AnyObject[];
}

export type StyledProps = Props & WithTheme;

export type DataState = {
  availableBalance: string;
  lastUpdated: string;
};
