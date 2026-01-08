import React from 'react';
import { Label, Cross } from '@cashfree-intl/coherent';
import type { FilterChipsProps } from './types';

const FilterChips: React.FC<FilterChipsProps> = ({ maxWidth = '680', chips, onRemove }) =>
  chips.length > 0 ? (
    <div style={{ maxWidth: `${maxWidth}px` }}>
      {chips.map(({ key, text }) => (
        <Label key={key} size="tiny">
          {text}
          <Cross size="sm" className="pl-1" onClick={() => onRemove(key)} />
        </Label>
      ))}
    </div>
  ) : null;

export default FilterChips;
export type { FilterChipsProps, FilterChip } from './types';
