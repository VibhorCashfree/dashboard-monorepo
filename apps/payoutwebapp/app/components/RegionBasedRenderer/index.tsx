import React from 'react';

// Utils
import Region from 'utils/region';

// Types
import type { Props } from './types';

const RegionBasedRenderer = ({ regions, children }: Props) => {
  const region = Region.get();

  // Check if the current region is included in the allowed regions
  if (regions.includes(region)) {
    return <>{children}</>;
  }

  // If the current region is not allowed, render nothing
  return null;
};

export default RegionBasedRenderer;
