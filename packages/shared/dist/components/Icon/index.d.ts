import React from 'react';
export interface IconProps {
    name: string;
    verticalAlign?: 'bottom' | 'middle' | 'top';
    fill?: string;
    theme?: any;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
}
export declare const iconMap: Record<string, React.FC<any>>;
declare const _default: React.ForwardRefExoticComponent<{
    [x: string]: React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;
    [x: number]: React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;
    [x: symbol]: React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;
} & {
    theme?: any;
}>;
export default _default;
//# sourceMappingURL=index.d.ts.map