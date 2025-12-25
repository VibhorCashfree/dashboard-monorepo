import React from 'react';
import { Label, Cross } from '@cashfree-intl/coherent';

// Styled
import { StyledChipsContainer } from './styled';

// Types
import type { Props } from './types';

const FilterChips: React.FC<Props> = ({ maxWidth = '680', chips, onRemove }) =>
  chips.length > 0 ? (
    <StyledChipsContainer $maxWidth={maxWidth}>
      {chips.map(({ key, text }) => (
        <Label key={key} size="tiny">
          {text}
          <Cross size="sm" className="pl-1" onClick={() => onRemove(key)} />
        </Label>
      ))}
    </StyledChipsContainer>
  ) : null;

export default FilterChips;
