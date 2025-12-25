export interface Props {
  accept?: string;
  error?: string;
  value?: string;
  checkList: string[];
  viaAPI?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: { name: string; value: File | any },
  ) => void;
  onError: (message: string) => void;
  onReset: () => void;
}

export type StyledProps = Props & WithTheme;
