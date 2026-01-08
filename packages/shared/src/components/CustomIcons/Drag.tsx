import React from 'react';
import type { StyledProps } from './types';

const Drag = ({ theme, fill, ...props }: StyledProps) => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="6" width="4" height="4" rx="2" fill="#6B6C7B" />
    <rect y="12" width="4" height="4" rx="2" fill="#6B6C7B" />
    <rect x="6" y="6" width="4" height="4" rx="2" fill="#6B6C7B" />
    <rect x="6" y="12" width="4" height="4" rx="2" fill="#6B6C7B" />
    <rect x="12" y="6" width="4" height="4" rx="2" fill="#6B6C7B" />
    <rect x="12" y="12" width="4" height="4" rx="2" fill="#6B6C7B" />
  </svg>
);

export default Drag;
