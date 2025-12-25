import React, { useEffect } from 'react';

// Styled
import { StyledOverlay, AlertBody } from './styled';

// Types
import type { Props } from './types';

const Drawer = (props: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return <StyledOverlay {...props} />;
};

Drawer.AlertBody = AlertBody;

export default Drawer;
