import React from 'react';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';
import { CORE_LABEL_BY_STATUS } from '../../constants/status';
import type { StatusLabelProps } from './types';

// This component will need styled component from apps
// For now, creating a simple version that apps can wrap
const StatusLabel = ({ children, ...props }: StatusLabelProps) => {
  if (!children) {
    return <>–</>;
  }

  const label = CORE_LABEL_BY_STATUS[children] || _capitalize(_startCase(children));
  
  return <div {...props}>{label}</div>;
};

export default StatusLabel;
export type { StatusLabelProps } from './types';
