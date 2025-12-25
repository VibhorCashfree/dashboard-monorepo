import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styled
import { StyledOverlay, AlertBody } from './styled';

const Drawer = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return <StyledOverlay {...props} />;
};

Drawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Drawer.AlertBody = AlertBody;

export default Drawer;
