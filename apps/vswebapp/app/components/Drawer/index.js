import { Drawer } from '@dashboard-monorepo/shared';
import PropTypes from 'prop-types';

// Re-export styled for backward compatibility
export { StyledOverlay, AlertBody } from './styled';

Drawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Drawer.AlertBody = require('./styled').AlertBody;

export default Drawer;
