import { FilterChips } from '@dashboard-monorepo/shared';
import PropTypes from 'prop-types';

// Re-export styled for backward compatibility
export { StyledChipsContainer } from './styled';

FilterChips.propTypes = {
  chips: PropTypes.array.isRequired,
  maxWidth: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

export default FilterChips;
