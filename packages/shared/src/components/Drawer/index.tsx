import React, { useEffect } from 'react';
import type { DrawerProps } from './types';

const Drawer = (props: DrawerProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Return a simple div - apps will provide styled overlay
  return <div {...props} />;
};

export default Drawer;
export type { DrawerProps } from './types';
