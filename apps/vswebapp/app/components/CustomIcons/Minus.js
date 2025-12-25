import React from 'react';
import PropTypes from 'prop-types';

const Minus = ({ fill, theme, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.6252 9.9375H3.37518C3.12654 9.9375 2.88809 9.83873 2.71227 9.66291C2.53646 9.4871 2.43768 9.24864 2.43768 9C2.43768 8.75136 2.53646 8.5129 2.71227 8.33709C2.88809 8.16127 3.12654 8.0625 3.37518 8.0625H14.6252C14.8738 8.0625 15.1123 8.16127 15.2881 8.33709C15.4639 8.5129 15.5627 8.75136 15.5627 9C15.5627 9.24864 15.4639 9.4871 15.2881 9.66291C15.1123 9.83873 14.8738 9.9375 14.6252 9.9375Z"
      fill={fill || '#6B6C7B'}
    />
  </svg>
);

Minus.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default Minus;
