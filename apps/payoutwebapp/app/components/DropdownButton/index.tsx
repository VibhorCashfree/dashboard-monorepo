import React, { useState } from 'react';
import {
  Image,
  Space,
  Text,
  Dropdown,
  DropdownMenu,
} from '@cashfree-intl/coherent';

// Styled
import { StyledDropdownItem } from './styled';

// Types
import type { Props } from './types';

const DropdownButton = ({ id, children, options, onClick }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      icon={null}
      trigger={children(open)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <DropdownMenu id={id} direction="left" style={{ minWidth: 224 }}>
        <Dropdown.Menu scrolling>
          {options.map((option) => (
            <StyledDropdownItem
              key={option.value}
              label={
                option.description ? (
                  <>
                    <Text className="mb-1">{option.text}</Text>
                    <Text variant="b12" color="bodyLight">
                      {option.description}
                    </Text>
                  </>
                ) : (
                  <Space>
                    <Image
                      inline
                      src={option.icon}
                      className="mr-1"
                      verticalAlign="top"
                    />
                    <Text>{option.text}</Text>
                  </Space>
                )
              }
              disabled={option.disabled}
              onClick={() => onClick(option.value)}
            />
          ))}
        </Dropdown.Menu>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownButton;
