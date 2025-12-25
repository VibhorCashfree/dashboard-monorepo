import React from 'react';
import PropTypes from 'prop-types';

const CircularChevronRight = ({ theme, fill, ...props }) => (
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_7739_824832)">
      <circle
        cx="12"
        cy="12"
        r="12"
        transform="matrix(-1 0 0 1 32.5 4)"
        fill="white"
      />
    </g>
    <path
      d="M19 13L22 16L19 19"
      stroke="#6930CA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_7739_824832"
        x="0.5"
        y="0"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7739_824832"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_7739_824832"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

CircularChevronRight.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default CircularChevronRight;
