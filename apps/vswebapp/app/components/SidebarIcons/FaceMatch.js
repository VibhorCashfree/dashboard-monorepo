import React from 'react';
import PropTypes from 'prop-types';

const Forms = ({ fill, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 6V4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H6M3 12V13.5C3 13.8978 3.15804 14.2794 3.43934 14.5607C3.72064 14.842 4.10218 15 4.5 15H6M12 3H13.5C13.8978 3 14.2794 3.15804 14.5607 3.43934C14.842 3.72064 15 4.10218 15 4.5V6M12 15H13.5C13.8978 15 14.2794 14.842 14.5607 14.5607C14.842 14.2794 15 13.8978 15 13.5V12M6.75 7.5H6.7575M11.25 7.5H11.2575M7 11.5C7.24441 11.7494 7.66114 11.6976 7.9831 11.8329C8.30505 11.9682 8.65077 12.0379 9 12.0379C9.34923 12.0379 9.69495 11.9682 10.0169 11.8329C10.3389 11.6976 10.7556 11.7494 11 11.5"
      stroke={fill || '#6B6C7B'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Forms.propTypes = {
  fill: PropTypes.string,
};

export default Forms;
