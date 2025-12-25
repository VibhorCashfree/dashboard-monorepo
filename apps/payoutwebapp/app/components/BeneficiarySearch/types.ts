export interface Props
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'children' | 'ref' | 'as' | 'size' | 'onChange'
  > {
  name: string;
  value?: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent,
    { name, value }: { name?: string; value: string | undefined },
  ) => void;
}

export type StyledProps = Props & WithTheme;

export type Suggestion = {
  beneId: string;
  modes: string[];
  name: string;
};

export type QueryState = string | undefined;

export type SuggestionsState = Suggestion[];
