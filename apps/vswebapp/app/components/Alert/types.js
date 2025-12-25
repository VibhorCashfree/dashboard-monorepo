import PropTypes from 'prop-types';

export const AlertPropTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'danger', 'info']).isRequired,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const AlertDefaultProps = {
  type: 'info',
  compact: false,
  bordered: false,
  rounded: false,
  size: 'md',
};
