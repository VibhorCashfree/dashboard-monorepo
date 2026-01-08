export interface FilterPopoverProps {
    buttonDisplayText?: string;
    value: any;
    onApply: (filters: any, searchBy?: string) => void;
    children: (values: any, onChange: (e: any, data: {
        value: string;
    }) => void) => React.ReactNode;
}
//# sourceMappingURL=types.d.ts.map