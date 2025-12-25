import React from 'react';
import PropTypes from 'prop-types';

const Pencil = ({ fill, theme, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.00001 17.46V20.46C3.00001 20.5926 3.05268 20.7198 3.14645 20.8136C3.24022 20.9073 3.3674 20.96 3.50001 20.96H6.50001C6.56558 20.9608 6.6306 20.9479 6.69088 20.922C6.75116 20.8962 6.80536 20.858 6.85001 20.81L17.81 9.94L14.06 6.19L3.15001 17.1C3.10169 17.1465 3.06345 17.2025 3.03765 17.2644C3.01184 17.3264 2.99903 17.3929 3.00001 17.46Z"
      fill={fill || theme.COLORS.primary}
    />
    <path
      d="M20.71 5.63L18.37 3.29C18.1826 3.10375 17.9292 2.99921 17.665 2.99921C17.4008 2.99921 17.1474 3.10375 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7C20.8844 6.81454 20.9815 6.56956 20.9815 6.315C20.9815 6.06044 20.8844 5.81546 20.71 5.63Z"
      fill={fill || theme.COLORS.primary}
    />
  </svg>
);

Pencil.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default Pencil;
