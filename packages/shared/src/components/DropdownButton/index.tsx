import React, { useState } from 'react';
import {
  Image,
  Space,
  Text,
  Dropdown,
  DropdownMenu,
} from '@cashfree-intl/coherent';
import styled from 'styled-components';

const StyledDropdownItem = styled(Dropdown.Item)`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props: any) => props.theme.colors.backgroundLight};
  }
`;

export interface DropdownOption {
  value: any;
  text?: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

export interface DropdownButtonProps {
  id?: string;
  children: (open: boolean) => React.ReactNode;
  options: DropdownOption[];
  onClick: (value: any) => void;
  dropdownMinWidth?: number | string;
}

const DropdownButton = ({
  id,
  children,
  options,
  onClick,
  dropdownMinWidth = 224,
}: DropdownButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      icon={null}
      trigger={children(open)}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <DropdownMenu
        id={id}
        direction="left"
        style={{ minWidth: dropdownMinWidth }}
      >
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
                    {option.icon && (
                      <Image
                        inline
                        src={option.icon}
                        className="mr-1"
                        verticalAlign="top"
                      />
                    )}
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
