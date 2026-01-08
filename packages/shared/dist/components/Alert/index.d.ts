import React from 'react';
import type { AlertProps } from './types';
declare const Alert: {
    ({ type, compact, bordered, rounded, size, iconSrc, children, ...props }: AlertProps): JSX.Element;
    Content: import("styled-components").StyledComponent<string, any, {
        size?: "sm" | "md";
        children: React.ReactNode;
    }, never>;
    Actions: import("styled-components").StyledComponent<string, any, {}, never>;
};
export default Alert;
export type { AlertProps } from './types';
//# sourceMappingURL=index.d.ts.map