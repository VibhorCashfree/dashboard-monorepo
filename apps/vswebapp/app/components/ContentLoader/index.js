import { ContentLoader } from '@dashboard-monorepo/shared';
import PropTypes from 'prop-types';

// Re-export styled for backward compatibility
export { StyledDimmable } from './styled';

ContentLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default ContentLoader;
