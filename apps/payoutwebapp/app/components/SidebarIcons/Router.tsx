import React from 'react';

// Types
import type { StyledProps } from './types';

const Router = ({ fill, ...props }: StyledProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_196_13698"
      // style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="2"
      y="1"
      width="14"
      height="16"
    >
      <path
        d="M13.7251 2.7002H4.2751C3.90231 2.7002 3.6001 3.0024 3.6001 3.3752V15.5252C3.6001 15.898 3.90231 16.2002 4.2751 16.2002H13.7251C14.0979 16.2002 14.4001 15.898 14.4001 15.5252V3.3752C14.4001 3.0024 14.0979 2.7002 13.7251 2.7002Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.30029 2.7002H9.33779V8.10019L7.81904 6.7502L6.30029 8.10019V2.7002Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.30029 10.8003H9.67529M6.30029 12.8253H11.7003"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </mask>
    <g mask="url(#mask0_196_13698)">
      <path
        d="M0.899902 1.80029H17.0999V18.0003H0.899902V1.80029Z"
        fill={fill || '#6B6C7B'}
      />
    </g>
  </svg>
);

export default Router;
