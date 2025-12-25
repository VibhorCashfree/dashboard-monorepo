export interface Props
  extends Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as'> {
  maxWidth?: string;
  chips: Chip[];
  onRemove: (key: string) => void;
}

export type StyledProps = Props & WithTheme;

export type Chip = {
  key: string;
  text: string;
};
