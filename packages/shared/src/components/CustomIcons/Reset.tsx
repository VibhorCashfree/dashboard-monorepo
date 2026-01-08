import React from 'react';
import type { StyledProps } from './types';

const Reset = ({ theme, fill, ...props }: StyledProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_3498_3705)">
      <path
        d="M9.33333 8C9.33333 7.26667 8.73333 6.66667 8 6.66667C7.26667 6.66667 6.66667 7.26667 6.66667 8C6.66667 8.73333 7.26667 9.33333 8 9.33333C8.73333 9.33333 9.33333 8.73333 9.33333 8ZM8 2C4.68667 2 2 4.68667 2 8H0L2.66667 10.6667L5.33333 8H3.33333C3.33333 5.42 5.42 3.33333 8 3.33333C10.58 3.33333 12.6667 5.42 12.6667 8C12.6667 10.58 10.58 12.6667 8 12.6667C6.99333 12.6667 6.06 12.34 5.29333 11.8L4.34667 12.76C5.36 13.5333 6.62667 14 8 14C11.3133 14 14 11.3133 14 8C14 4.68667 11.3133 2 8 2Z"
        fill="#6930CA"
      />
    </g>
    <defs>
      <clipPath id="clip0_3498_3705">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Reset;
