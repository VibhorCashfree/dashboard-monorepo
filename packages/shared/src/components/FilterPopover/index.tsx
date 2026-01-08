import React from 'react';
import { FilterPopover } from '@cashfree-intl/coherent';
import { FilterPopoverProps } from './types';

const SharedFilterPopover: React.FC<FilterPopoverProps> = ({
  buttonDisplayText = 'Search & Filter',
  value,
  onApply,
  children,
}) => (
  <FilterPopover
    buttonDisplayText={buttonDisplayText}
    value={value}
    onApply={(filters: any) => onApply(filters)}
  >
    {children}
  </FilterPopover>
);

export default SharedFilterPopover;
export type { FilterPopoverProps } from './types';
