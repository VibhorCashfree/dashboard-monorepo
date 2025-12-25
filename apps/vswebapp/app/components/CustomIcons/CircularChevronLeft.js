import React from 'react';
import PropTypes from 'prop-types';

const CircularChevronLeft = ({ theme, fill, ...props }) => (
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_7739_824822)">
      <circle cx="20.5" cy="16" r="12" fill="white" />
    </g>
    <path
      d="M22 13L19 16L22 19"
      stroke="#6930CA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_7739_824822"
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
          result="effect1_dropShadow_7739_824822"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_7739_824822"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

CircularChevronLeft.propTypes = {
  fill: PropTypes.string,
  theme: PropTypes.object,
};

export default CircularChevronLeft;
