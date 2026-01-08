import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Checkbox,
  Text,
  InputWithAction,
  Dropdown,
  Accordion,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { FilterPopover } from '@dashboard-monorepo/shared';

// Components
import Icon from 'components/Icon';

// Styled
import { FlexGrid } from 'styled/common';
import { StyledInputDropdown, SectionHeader } from './styled';

// Utils
import Analytics from 'utils/analytics';

export const CustomFilterPopover = ({
  config,
  labelByStatus,
  searchOptions,
  value,
  onChange,
}) => {
  const initialState = _get(searchOptions, '[0]');
  const [searchBy, setSearchBy] = useState(initialState);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSearchByChange = (e, { value }) => {
    const searchBy = _find(searchOptions, { value });
    setSearchBy(searchBy);

    Analytics.track('Dropdown_Search', {
      value,
    });
  };

  const handleAccordionClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const accordionActive = active => (active ? 'chevron-up' : 'chevron-down');

  return (
    <FilterPopover
      buttonDisplayText="Search & Filter"
      value={value}
      onApply={filters => onChange(filters, _get(searchBy, 'value'))}
    >
      {(values, onFiltersChange) => (
        <>
          <label
            className={classNames('px-4 block pb-1', {
              'text-grey': !searchOptions,
            })}
          >
            Search
          </label>
          {searchOptions ? (
            <StyledInputDropdown>
              <InputWithAction
                className="px-4"
                fluid
                label={
                  <Dropdown
                    defaultValue={searchBy.value}
                    options={searchOptions}
                    icon={
                      <Icon name={accordionActive(open)} className="ml-1" />
                    }
                    onChange={handleSearchByChange}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                  />
                }
                name="search"
                value={values.search}
                onChange={onFiltersChange}
                labelPosition="left"
                placeholder={`Enter ${searchBy.text}`}
              />
            </StyledInputDropdown>
          ) : (
            <Text variant="b12" color="bodyLight" className="px-4">
              No search available
            </Text>
          )}

          <label
            className={classNames('px-4 block pt-4', {
              'text-grey': !config,
            })}
          >
            Filters
          </label>
          {config ? (
            <Accordion>
              {Object.keys(config).map((title, index) => (
                <React.Fragment key={title}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={handleAccordionClick}
                  >
                    <SectionHeader active={activeIndex === index}>
                      <span>{title} </span>
                      <Icon
                        name={accordionActive(activeIndex === index)}
                        className="ml-1"
                      />
                    </SectionHeader>
                  </Accordion.Title>
                  <Accordion.Content
                    className="p-0"
                    active={activeIndex === index}
                  >
                    <FlexGrid
                      className="pt-2 px-4"
                      cols={_get(config[title], 'columns', 3)}
                      wrap
                    >
                      {config[title].items.map(status => {
                        const labelObjectKey =
                          typeof status === 'object' ? status.props.value : '';

                        return (
                          <Checkbox
                            className="pb-2"
                            data-event-name={`Checkbox_${labelObjectKey}`}
                            key={labelObjectKey || status}
                            name={labelObjectKey || status}
                            label={labelByStatus[status] || status}
                            checked={!!values[labelObjectKey || status]}
                            onChange={onFiltersChange}
                          />
                        );
                      })}
                    </FlexGrid>
                  </Accordion.Content>
                </React.Fragment>
              ))}
            </Accordion>
          ) : (
            <Text variant="b12" color="bodyLight" className="mx-4 mt-1 mb-4">
              No filters available
            </Text>
          )}
        </>
      )}
    </FilterPopover>
  );
};

CustomFilterPopover.propTypes = {
  config: PropTypes.object,
  labelByStatus: PropTypes.object,
  searchOptions: PropTypes.array,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomFilterPopover;
