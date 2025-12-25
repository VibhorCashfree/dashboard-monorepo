export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'required' | 'onChange'
  > {
  label: string;
  required?: string;
  property: string;
  readOnly?: boolean;
  description?: string;
  extensions?: string[];
  type: string;
  width?: number;
  enums?: string[];
  error: string;
  value: string;
  onChange: (
    e: React.ChangeEvent | null,
    { name, value }: { name: string; type?: string; value: any },
  ) => void;
}

export type StyledProps = Props & WithTheme;
