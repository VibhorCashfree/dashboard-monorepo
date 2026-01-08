import React from 'react';
export interface DropdownOption {
    value: any;
    text?: string;
    icon?: string;
    description?: string;
    disabled?: boolean;
}
export interface DropdownButtonProps {
    id?: string;
    children: (open: boolean) => React.ReactNode;
    options: DropdownOption[];
    onClick: (value: any) => void;
    dropdownMinWidth?: number | string;
}
declare const DropdownButton: ({ id, children, options, onClick, dropdownMinWidth, }: DropdownButtonProps) => JSX.Element;
export default DropdownButton;
//# sourceMappingURL=index.d.ts.map