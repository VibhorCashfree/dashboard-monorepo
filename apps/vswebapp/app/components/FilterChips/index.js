import React from 'react';
import PropTypes from 'prop-types';
import { Cross, Label } from '@cashfree-intl/coherent';

// Styled
import { StyledChipsContainer } from './styled';

const FilterChips = ({ maxWidth, chips, onRemove }) =>
  chips.length > 0 && (
    <StyledChipsContainer $maxWidth={maxWidth}>
      {chips.map(({ key, text }) => (
        <Label key={key} size="tiny">
          {text}
          <Cross size="sm" className="pl-1" onClick={() => onRemove(key)} />
        </Label>
      ))}
    </StyledChipsContainer>
  );

FilterChips.propTypes = {
  chips: PropTypes.array.isRequired,
  maxWidth: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

export default FilterChips;
