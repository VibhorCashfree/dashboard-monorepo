import React from 'react';
import PropTypes from 'prop-types';

const Mobile = ({ fill, ...props }) => (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 1.83333C2 1.47971 2.14048 1.14057 2.39052 0.890524C2.64057 0.640476 2.97971 0.5 3.33333 0.5H8.66667C9.02029 0.5 9.35943 0.640476 9.60948 0.890524C9.85952 1.14057 10 1.47971 10 1.83333V11.1667C10 11.5203 9.85952 11.8594 9.60948 12.1095C9.35943 12.3595 9.02029 12.5 8.66667 12.5H3.33333C2.97971 12.5 2.64057 12.3595 2.39052 12.1095C2.14048 11.8594 2 11.5203 2 11.1667V1.83333ZM8.66667 1.83333H3.33333V11.1667H8.66667V1.83333Z"
      fill="#6930CA"
    />
  </svg>
);

Mobile.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default Mobile;
