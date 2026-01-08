import React from 'react';
export interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    product: string;
    team: string;
    onGlobalError?: () => void;
    additionalTags?: Record<string, string | undefined>;
}
declare const ErrorBoundary: ({ children, fallback, product, team, onGlobalError, additionalTags, }: ErrorBoundaryProps) => JSX.Element;
export default ErrorBoundary;
//# sourceMappingURL=index.d.ts.map