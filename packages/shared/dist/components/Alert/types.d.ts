export interface AlertProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as' | 'size'> {
    type?: 'success' | 'warning' | 'danger' | 'info';
    compact?: boolean;
    bordered?: boolean;
    rounded?: boolean;
    size?: 'sm' | 'md';
    children: React.ReactNode;
    iconSrc?: string;
}
export type StyledProps = AlertProps & {
    theme: any;
};
//# sourceMappingURL=types.d.ts.map