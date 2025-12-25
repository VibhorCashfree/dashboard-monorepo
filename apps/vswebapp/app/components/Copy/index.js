import React from 'react';
import PropTypes from 'prop-types';
import { toast } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Utils
import { copyToClipboard } from 'utils/common';

const Copy = ({ value }) => {
  if (!value) {
    return null;
  }

  const handleCopy = e => {
    e.stopPropagation();

    copyToClipboard(value);
    toast.success('Copied to clipboard!');
  };

  return (
    <Icon
      name="copy"
      className="pointer"
      onClick={handleCopy}
      data-testid="copy-btn"
    />
  );
};

Copy.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Copy;
