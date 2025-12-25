import React, { useState } from 'react';
import classNames from 'classnames';
import {
  Checkbox,
  Dropdown,
  FilterPopover,
  Popup,
  Text,
  InputWithAction,
  Accordion,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _find from 'lodash/find';

// Components
import Icon from 'components/Icon';

// Constants
import { STATUS as TRANSFERS_STATUS } from 'containers/AllTransfers/constants';
import { STATUS as DOWNTIMES_STATUS } from 'pages/Downtimes/constants';

// Styled
import { FlexGrid } from 'styled/common';
import { SectionHeader } from './styled';

// Types
import type { Props } from './types';

const CustomFilterPopover: React.FC<Props> = ({
  config,
  labelByStatus,
  searchOptions,
  value,
  onChange,
  specialCase,
}) => {
  const initialState = _get(searchOptions, '[0]');

  const [searchBy, setSearchBy] = useState(
    initialState as { value: string; text: string } | undefined,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSearchByChange = (
    e: React.MouseEvent,
    { value }: { value: string },
  ) => {
    const searchBy = _find(searchOptions, { value });
    setSearchBy(searchBy);
  };

  const handleAccordionClick = (
    e: React.MouseEvent,
    { index }: { index: number },
  ) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <FilterPopover
      buttonDisplayText="Search & Filter"
      value={value}
      onApply={(filters: AnyObject) =>
        onChange(filters, _get(searchBy, 'value'))
      }
    >
      {(
        values: AnyObject,
        onChange: (e: React.MouseEvent, { value }: { value: string }) => void,
      ) => (
        <>
          <label
            className={classNames('px-4 block pb-1', {
              'text-grey': !searchOptions,
            })}
          >
            Search
          </label>
          {searchOptions ? (
            <InputWithAction
              className="px-4"
              fluid
              label={
                <Dropdown
                  defaultValue={searchBy?.value}
                  options={searchOptions}
                  icon={
                    <Icon
                      name={open ? 'chevron-up' : 'chevron-down'}
                      className="ml-1"
                    />
                  }
                  onChange={handleSearchByChange}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                />
              }
              name="search"
              value={values.search}
              onChange={onChange}
              labelPosition="left"
              placeholder={`Enter ${searchBy?.text}`}
            />
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
                      <span>
                        {title}{' '}
                        {index === 1 && specialCase === 'TRANSFERS' && (
                          <Popup
                            content="Acknowledgement from the beneficiary bank that the amount has been received."
                            trigger={
                              <span>
                                <Icon
                                  name="info"
                                  className="pointer"
                                  verticalAlign="top"
                                />
                              </span>
                            }
                          />
                        )}
                      </span>
                      <Icon
                        name={
                          activeIndex === index ? 'chevron-up' : 'chevron-down'
                        }
                        className="ml-1"
                      />
                    </SectionHeader>
                  </Accordion.Title>
                  <Accordion.Content
                    className="p-0"
                    active={activeIndex === index}
                  >
                    {index === 1 && specialCase === 'TRANSFERS' && (
                      <Text variant="b12" color="warning" className="px-4 m-0">
                        Acknowledgement status is applicable only for successful
                        transfers.
                      </Text>
                    )}
                    <FlexGrid
                      className="pt-2 px-4"
                      cols={config[title].columns || 3}
                      wrap
                    >
                      {config[title].items.map((status: string | AnyObject) => {
                        let specialCondition: boolean | undefined;

                        switch (specialCase) {
                          case 'TRANSFERS':
                            if (
                              (status === 'Yes' || status === 'No') &&
                              (!values[TRANSFERS_STATUS.SUCCESS] ||
                                values[TRANSFERS_STATUS.PENDING] ||
                                values[TRANSFERS_STATUS.FAILED] ||
                                values[TRANSFERS_STATUS.REVERSED])
                            ) {
                              specialCondition = true;
                            }
                            break;

                          case 'DOWNTIMES':
                            if (
                              (status === DOWNTIMES_STATUS.SCHEDULED &&
                                values[DOWNTIMES_STATUS.UNSCHEDULED]) ||
                              (status === DOWNTIMES_STATUS.UNSCHEDULED &&
                                values[DOWNTIMES_STATUS.SCHEDULED])
                            ) {
                              specialCondition = true;
                            }
                            break;

                          case 'RECHARGE_HISTORY':
                            if (
                              (status === 'PENDING_APPROVAL' &&
                                values.SUCCESS) ||
                              (status === 'SUCCESS' && values.PENDING_APPROVAL)
                            ) {
                              specialCondition = true;
                            }
                            break;
                        }

                        const labelObjectKey =
                          typeof status === 'object' ? status.props.value : '';

                        return (
                          <Checkbox
                            className="pb-2"
                            key={labelObjectKey || status}
                            name={labelObjectKey || status}
                            label={_get(
                              labelByStatus,
                              [status as keyof typeof labelByStatus],
                              status,
                            )}
                            checked={
                              specialCondition
                                ? false
                                : !!values[labelObjectKey || status]
                            }
                            disabled={specialCondition}
                            onChange={onChange}
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

export default CustomFilterPopover;
