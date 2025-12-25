import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import {
  Cross,
  DropdownMenu,
  DropdownItem,
  Text,
  Space,
  Conditional,
} from '@cashfree-intl/coherent';

// styles
import { StyledDropdown, StyledIcon } from './styled';

const AutoSuggestionInput = ({
  maxWidth,
  placeholder = 'Search for a user by name or email address...',
  options = [],
  initialSelection,
  label,
  onSelectionChange = () => {},
  onAddUserClick,
}) => {
  const [searchValue, setSearchValue] = useState(initialSelection?.text || '');
  const [selected, setSelected] = useState(initialSelection || null);
  const [optionsInSearch, setOptionsInSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const opts = options.filter(({ text, description }) => {
        const searchValueLowerCase = searchValue.toLowerCase();
        return (
          text.toLowerCase().includes(searchValueLowerCase) ||
          description.toLowerCase().includes(searchValueLowerCase)
        );
      });
      setOptionsInSearch(opts);
      setLoading(false);
    }, 500);
  }, [searchValue, options]);

  const renderContent = () => {
    const isOptionAvailable = optionsInSearch.length > 0;

    if (isOptionAvailable) {
      return optionsInSearch.map((option, i) => (
        <DropdownItem
          key={option.key}
          onClick={e => {
            e.stopPropagation();
            setSelected(option);
            setSearchValue(option.text);
            dropDownRef.current.close();
            // pass selected option details to parent
            onSelectionChange(option);
          }}
          selected={i === 0}
        >
          <Space gap={0} direction="column">
            <Text color="bodyLight">{option.text}</Text>
            <Text variant="b12">{option.description}</Text>
          </Space>
        </DropdownItem>
      ));
    }
    return (
      <DropdownItem onClick={onAddUserClick} selected>
        <Space gap={0} direction="column">
          <Space alignItems="center" gap={0.5}>
            <StyledIcon name="add" fill="#6B6C7B" />
            <Text color="bodyLight">Add</Text>
          </Space>
          <Text variant="b12">Click to add a new user</Text>
        </Space>
      </DropdownItem>
    );
  };

  const onSearchChange = (e, data) => {
    setSelected(null);
    setLoading(true);
    setSearchValue(data.searchQuery);
  };

  return (
    <Space direction="column">
      <Conditional if={!!label}>
        <Text variant="p14" color="bodyLight" className="mb-1">
          {label}
        </Text>
      </Conditional>
      <StyledDropdown
        ref={dropDownRef}
        fluid
        search
        selection
        label
        placeholder={placeholder}
        searchQuery={searchValue}
        onSearchChange={onSearchChange}
        loading={loading}
        icon={
          selected ? (
            <Cross
              data-testid="auto-suggestion-input-clear"
              onClick={() => {
                setSearchValue('');
                setSelected(null);
                onSelectionChange(null);
              }}
            />
          ) : (
            undefined
          )
        }
        $maxWidth={maxWidth}
      >
        <DropdownMenu>{renderContent()}</DropdownMenu>
      </StyledDropdown>
    </Space>
  );
};

AutoSuggestionInput.propTypes = {
  maxWidth: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  initialSelection: PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    description: PropTypes.string,
  }),
  label: PropTypes.string,
  onSelectionChange: PropTypes.func,
  onAddUserClick: PropTypes.func,
};

export default AutoSuggestionInput;
