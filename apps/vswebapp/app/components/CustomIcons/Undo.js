import React from 'react';
import PropTypes from 'prop-types';

const Undo = ({ fill, theme, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.11111 10.2222L2 7.11111M2 7.11111L5.11111 4M2 7.11111H12.1111C14.2589 7.11111 16 8.85223 16 11C16 13.1478 14.2589 14.8889 12.1111 14.8889H8.22222"
      stroke={fill || theme.COLORS.primary}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

Undo.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default Undo;
