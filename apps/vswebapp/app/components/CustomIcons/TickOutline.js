import React from 'react';
import PropTypes from 'prop-types';

const TickOutline = ({ fill, theme, ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM12.9731 6.21938C12.6804 5.92456 12.2038 5.92371 11.91 6.2175L7.5 10.6275L6.08676 9.21972C5.79429 8.92838 5.32116 8.92884 5.02926 9.22074C4.73696 9.51304 4.73696 9.98696 5.02926 10.2793L7.5 12.75L12.9712 7.27875C13.2636 6.98643 13.2644 6.51274 12.9731 6.21938Z"
      fill={fill || theme.COLORS.primary}
    />
  </svg>
);

TickOutline.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default TickOutline;
