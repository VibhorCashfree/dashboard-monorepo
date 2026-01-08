import React from 'react';
import type { StyledProps } from './types';

const Undo = ({ theme, fill, ...props }: StyledProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.11111 10.2222L2 7.11111M2 7.11111L5.11111 4M2 7.11111H12.1111C14.2589 7.11111 16 8.85223 16 11C16 13.1478 14.2589 14.8889 12.1111 14.8889H8.22222"
      stroke={fill || theme.COLORS.primary}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Undo;
