import React from 'react';
import PropTypes from 'prop-types';
import { Copy } from '@dashboard-monorepo/shared';

const VSCopy = ({ value }) => <Copy value={value} showToast />;

VSCopy.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default VSCopy;
