export interface FilterChip {
    key: string;
    text: string;
}
export interface FilterChipsProps {
    chips: FilterChip[];
    onRemove: (key: string) => void;
    maxWidth?: string;
}
//# sourceMappingURL=types.d.ts.map