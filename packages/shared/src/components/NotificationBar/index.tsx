import React, { lazy, Suspense } from 'react';
import { NotificationProps } from '../Notification/types';

const NotificationBarMF = lazy(() =>
  // @ts-ignore
  import('CommonModule/NotificationBar').catch(() => ({
    default: () => null,
  }))
);

const NotificationBar: React.FC<NotificationProps & { errorBoundary?: React.ComponentType<{ fallback: React.ReactNode, children: React.ReactNode }> }> = ({ 
  fallbackComponent: Fallback, 
  errorBoundary: ErrorBoundary 
}) => {
  const content = (
    <Suspense fallback={<></>}>
      <NotificationBarMF />
    </Suspense>
  );

  if (ErrorBoundary) {
    return <ErrorBoundary fallback={<></>}>{content}</ErrorBoundary>;
  }

  return content;
};

export default NotificationBar;
