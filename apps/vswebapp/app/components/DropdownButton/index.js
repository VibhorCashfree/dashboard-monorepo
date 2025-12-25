import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Space, Text, Dropdown } from '@cashfree-intl/coherent';

// Styled
import {
  StyledDropdown,
  StyledDropdownMenu,
  StyledDropdownItem,
} from './styled';

const DropdownButton = ({ options, dropdownMinWidth, children, onClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledDropdown
      icon={null}
      trigger={children(open)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <StyledDropdownMenu
        direction="center"
        style={{ minWidth: `${dropdownMinWidth}px` }}
      >
        <Dropdown.Menu scrolling>
          {options.map(option => (
            <StyledDropdownItem
              key={option.value}
              label={
                <Space>
                  <Image
                    inline
                    src={option.icon}
                    className="mr-1"
                    verticalAlign="top"
                  />
                  <Text>{option.text}</Text>
                </Space>
              }
              disabled={option.disabled}
              onClick={() => onClick(option.value)}
            />
          ))}
        </Dropdown.Menu>
      </StyledDropdownMenu>
    </StyledDropdown>
  );
};

DropdownButton.propTypes = {
  children: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      icon: PropTypes.string,
      text: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  dropdownMinWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};

export default DropdownButton;
