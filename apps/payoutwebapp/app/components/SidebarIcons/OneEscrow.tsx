import React from 'react';

// Types
import type { StyledProps } from './types';

const OneEscrow = ({ fill, ...props }: StyledProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_24579_15316"
      maskUnits="userSpaceOnUse"
      x="2"
      y="0"
      width="14"
      height="18"
    >
      <path
        d="M14.25 1.5H3.75C3.33579 1.5 3 1.83579 3 2.25V15.75C3 16.1642 3.33579 16.5 3.75 16.5H14.25C14.6642 16.5 15 16.1642 15 15.75V2.25C15 1.83579 14.6642 1.5 14.25 1.5Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 1.5H9.375V7.5L7.6875 6L6 7.5V1.5Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5H9.75M6 12.75H12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </mask>
    <g mask="url(#mask0_24579_15316)">
      <path d="M0 0H18V18H0V0Z" fill={fill || '#6B6C7B'} />
    </g>
  </svg>
);

export default OneEscrow;
