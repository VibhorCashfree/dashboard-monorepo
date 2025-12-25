import React from 'react';
import PropTypes from 'prop-types';

const Passport = ({ fill, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.2143 1.39286H14.7857C14.9278 1.39286 15.0641 1.4493 15.1645 1.54977C15.265 1.65023 15.3214 1.78649 15.3214 1.92857V16.0714C15.3214 16.2135 15.265 16.3498 15.1645 16.4502C15.0641 16.5507 14.9278 16.6071 14.7857 16.6071H3.2143C3.07222 16.6071 2.93596 16.5507 2.8355 16.4502L2.30812 16.9776L2.8355 16.4502C2.73503 16.3498 2.67859 16.2135 2.67859 16.0714V1.92857C2.67859 1.78649 2.73503 1.65023 2.8355 1.54977C2.93596 1.4493 3.07222 1.39286 3.2143 1.39286Z"
      stroke={fill || '#6B6C7B'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C9.79565 11 10.5587 10.6839 11.1213 10.1213C11.6839 9.55871 12 8.79565 12 8M9 11C8.20435 11 7.44129 10.6839 6.87868 10.1213C6.31607 9.55871 6 8.79565 6 8M9 11V5M12 8C12 7.20435 11.6839 6.44129 11.1213 5.87868C10.5587 5.31607 9.79565 5 9 5M12 8H6M9 5C8.20435 5 7.44129 5.31607 6.87868 5.87868C6.31607 6.44129 6 7.20435 6 8"
      stroke={fill || '#6B6C7B'}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

Passport.propTypes = {
  fill: PropTypes.string,
};

export default Passport;
