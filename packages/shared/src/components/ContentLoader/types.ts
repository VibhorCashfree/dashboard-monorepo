export interface ContentLoaderProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'as'> {
  loading: boolean;
  children?: React.ReactNode;
}
