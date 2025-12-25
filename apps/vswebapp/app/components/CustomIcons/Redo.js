import React from 'react';
import PropTypes from 'prop-types';

const Redo = ({ fill, theme, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.8889 10.2222L16 7.11111M16 7.11111L12.8889 4M16 7.11111H5.88889C3.74112 7.11111 2 8.85223 2 11C2 13.1478 3.74111 14.8889 5.88889 14.8889H9.77778"
      stroke={fill || theme.COLORS.primary}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

Redo.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default Redo;
