import React, { useState } from 'react';
import { toast } from '@cashfree-intl/coherent';
import Icon from '../Icon';
import { copyToClipboard } from '../../utils/common';
import type { CopyProps } from './types';

const Copy = ({
  value,
  onClick,
  showToast = false,
  className = 'pointer ml-1',
}: CopyProps) => {
  const [copied, setCopied] = useState(false);

  if (!value) {
    return null;
  }

  const handleCopy = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    copyToClipboard(String(value));

    if (showToast) {
      toast.success('Copied to clipboard!');
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Icon
      name={copied ? 'tick' : 'copy'}
      data-event-name="Copy"
      data-testid="copy-btn"
      className={className}
      onClick={handleCopy}
    />
  );
};

export default Copy;
export type { CopyProps } from './types';
