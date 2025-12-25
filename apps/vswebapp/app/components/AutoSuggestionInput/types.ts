import { Maybe } from 'shared/types';

export type TAutoSuggestInputProps = {
  maxWidth?: string;
  label?: string;
  placeholder?: string;
  options: IOption[];
  initialSelection: Maybe<IOption>;
  onAddUserClick: () => void;
  onSelectionChange: (option: Maybe<IOption>) => void;
};

export interface IOption {
  key: number | string;
  text: string;
  description: string;
}
