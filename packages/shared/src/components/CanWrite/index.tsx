import React from 'react';
import { CanWriteProps } from './types';

const CanWrite: React.FC<CanWriteProps> = ({ children, isAllowed, remove }) => {
  if (isAllowed) {
    return <>{children}</>;
  }

  return (
    <span data-testid="can-write" className={remove ? 'hide' : 'invisible'}>
      {children}
    </span>
  );
};

export default CanWrite;
export type { CanWriteProps } from './types';
