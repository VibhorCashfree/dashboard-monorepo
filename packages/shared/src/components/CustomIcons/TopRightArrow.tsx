import React from 'react';

// Types
import type { StyledProps } from './types';

const TopRightArrow = ({ fill, theme, ...props }: StyledProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      opacity="0.1"
      width="24"
      height="24"
      rx="4"
      fill={fill || theme.COLORS.primary}
    />
    <path
      d="M15.2092 8.07885L8.20576 8.07885L8.12079 8.08259C7.56576 8.1384 7.15686 8.58829 7.15686 9.12775L7.16061 9.21272L7.17123 9.29099C7.25947 9.80576 7.69199 10.1766 8.20576 10.1766L12.6771 10.1764L8.0477 14.8059L7.99346 14.8648C7.63718 15.2956 7.66461 15.9061 8.0477 16.2892L8.09804 16.3364C8.51004 16.6982 9.13782 16.6825 9.53106 16.2892L14.1602 11.6601L14.1603 16.1312L14.164 16.2161C14.2198 16.7712 14.6697 17.1801 15.2092 17.1801C15.7885 17.1801 16.2581 16.7105 16.2581 16.1312L16.2581 9.12775L16.2527 9.02102C16.1985 8.48775 15.7486 8.07885 15.2092 8.07885Z"
      fill={fill || theme.COLORS.primary}
    />
  </svg>
);

export default TopRightArrow;
