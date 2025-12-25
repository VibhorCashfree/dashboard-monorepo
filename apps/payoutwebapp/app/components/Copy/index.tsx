import React, { useState } from 'react';
import _noop from 'lodash/noop';

// Components
import Icon from 'components/Icon';

// Utils
import { copyToClipboard } from 'utils/common';

// Types
import type { Props } from './types';

const Copy = ({ value, onClick = _noop }: Props) => {
  const [copied, setCopied] = useState(false);

  if (!value) {
    return null;
  }

  const handleCopy = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    setCopied(true);

    copyToClipboard(value);
    onClick(e);
  };

  return (
    <Icon
      name={copied ? 'tick' : 'copy'}
      data-event-name="Copy"
      className="pointer ml-1"
      onClick={handleCopy}
    />
  );
};

export default Copy;
