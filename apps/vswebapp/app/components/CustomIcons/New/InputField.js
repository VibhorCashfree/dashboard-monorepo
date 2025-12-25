import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ theme, fill, ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z"
      stroke="#A6A7B0"
      strokeLinejoin="round"
    />
    <path
      d="M5.3335 6.33398V5.33398H10.6668V6.33398M7.3335 11.334H8.66683M8.00016 6.00065V11.334"
      stroke="#A6A7B0"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

InputField.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default InputField;
