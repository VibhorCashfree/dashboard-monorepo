import React, { lazy, Suspense } from 'react';
import { NotificationProps } from '../Notification/types';

const NotificationPopoverMF = lazy(() =>
  // @ts-ignore
  import('CommonModule/NotificationPopover').catch(() => ({
    default: () => null,
  }))
);

const NotificationPopover: React.FC<NotificationProps & { errorBoundary?: React.ComponentType<{ fallback: React.ReactNode, children: React.ReactNode }> }> = ({ 
  isShellV2, 
  fallbackComponent: Fallback, 
  errorBoundary: ErrorBoundary 
}) => {
  const content = (
    <Suspense fallback={<></>}>
      <NotificationPopoverMF isShellV2={isShellV2} />
    </Suspense>
  );

  if (ErrorBoundary) {
    return <ErrorBoundary fallback={<></>}>{content}</ErrorBoundary>;
  }

  return content;
};

export default NotificationPopover;
