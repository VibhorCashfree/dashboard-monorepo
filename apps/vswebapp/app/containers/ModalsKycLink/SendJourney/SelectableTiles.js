import React from 'react';
import { Space } from '@cashfree-intl/coherent';

// Styles
import { Tile } from '../../JourneysKycLink/styled';

const SelectableTiles = ({ selected, options, handleTileClick }) => (
  <Space gap={2}>
    {options.map(option => (
      <Tile
        active={option.addToCurrentDate === selected}
        onClick={() => handleTileClick(option.addToCurrentDate)}
      >
        {option.text}
      </Tile>
    ))}
  </Space>
);

export default SelectableTiles;
