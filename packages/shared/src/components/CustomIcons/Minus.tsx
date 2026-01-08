import React from 'react';

// Types
import type { StyledProps } from './types';

const Minus = ({ theme, fill, ...props }: StyledProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.625 9.9375H3.375C3.12636 9.9375 2.8879 9.83873 2.71209 9.66291C2.53627 9.4871 2.4375 9.24864 2.4375 9C2.4375 8.75136 2.53627 8.5129 2.71209 8.33709C2.8879 8.16127 3.12636 8.0625 3.375 8.0625H14.625C14.8736 8.0625 15.1121 8.16127 15.2879 8.33709C15.4637 8.5129 15.5625 8.75136 15.5625 9C15.5625 9.24864 15.4637 9.4871 15.2879 9.66291C15.1121 9.83873 14.8736 9.9375 14.625 9.9375Z"
      fill={fill || theme.COLORS.primary}
    />
  </svg>
);

export default Minus;
