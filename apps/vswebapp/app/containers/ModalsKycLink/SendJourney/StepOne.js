import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Button,
  Space,
  Text,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon as CoherentIcon,
} from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Components
import SelectableTiles from './SelectableTiles';

// Constants
import { CHANNELS, DATE_OPTIONS } from './constants';

// Styles
import { Divider } from 'styled/common';

// Services
import { getJourneyList, getDefaultJourneyList } from 'services/forms';

const StepOne = ({ setStep, formData, setFormData, handleCreateJourney }) => {
  const [dropDownOptions, setDropDownOptions] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      let templates = [];
      const [publishedTemplate, defaultTemplate] = await Promise.all([
        getJourneyList(),
        getDefaultJourneyList(),
      ]);

      if (!publishedTemplate.error) {
        templates.push(..._get(publishedTemplate, 'data', []));
      }

      if (!defaultTemplate.error) {
        templates.push(..._get(defaultTemplate, 'data', []));
      }

      const options = templates.map(journey => ({
        key: journey.id,
        text: _startCase(journey.templateName),
        value: journey.templateName,
        description: journey.description,
      }));

      setDropDownOptions(options);
    })();
  }, []);

  const handleTileClick = days => {
    setFormData(formData => ({
      ...formData,
      dateOptions: days,
    }));
  };

  const handleChannelClick = channelKey =>
    setFormData(formData => {
      let channels = formData.channels;
      const exists = formData.channels.includes(channelKey);

      if (exists) {
        channels = channels.filter(channel => channel !== channelKey);
      } else {
        channels = [...channels, channelKey];
      }

      return {
        ...formData,
        channels,
      };
    });

  const isDisabled = !(
    formData.journeyName &&
    formData.channels.length &&
    formData.dateOptions
  );

  return (
    <div>
      <Space direction="column" gap={3} className="pt-4 px-4">
        <div>
          <Text color="bodyLight" variant="b14" className="mb-2">
            Select a Template
          </Text>

          <Dropdown
            selection
            placeholder="Select here"
            icon="chevron down"
            text={
              formData.journeyName ? _startCase(formData.journeyName) : null
            }
            style={{ width: '100%' }}
          >
            <DropdownMenu>
              {dropDownOptions.map(option => (
                <DropdownItem
                  key={option.key}
                  onClick={() =>
                    setFormData(formData => ({
                      ...formData,
                      journeyName: option.value,
                    }))
                  }
                  selectedDropdownMenu={
                    !!formData.journeyName &&
                    option.value === formData.journeyName
                  }
                >
                  <Space gap={1} direction="column">
                    <Text>{option.text}</Text>
                    <Text
                      variant="b12"
                      color="bodyLight"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {option.description}
                    </Text>
                  </Space>
                </DropdownItem>
              ))}

              <Divider contain noMargin />

              {!dropDownOptions.length && (
                <Space justifyContent="start" className="py-1">
                  <Button
                    link
                    icon={<CoherentIcon name="add" />}
                    onClick={handleCreateJourney}
                  >
                    Create KYC Template
                  </Button>
                </Space>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div>
          <Text color="bodyLight" variant="b14" className="mb-2">
            Set validity period for KYC Links from date of initiation
          </Text>

          <Space gap={2}>
            <SelectableTiles
              selected={formData.dateOptions}
              options={DATE_OPTIONS}
              handleTileClick={handleTileClick}
            />
          </Space>
        </div>

        <div>
          <Text color="bodyLight" variant="b14" className="mb-2">
            Choose channels to send via
          </Text>

          <Space gap={2}>
            {CHANNELS.map(channel => (
              <Checkbox
                label={channel.text}
                onClick={e => handleChannelClick(channel.key)}
                checked={formData.channels.includes(channel.key)}
              />
            ))}
          </Space>
        </div>
      </Space>

      <Divider contain />

      <Space justifyContent="end" className="pb-2">
        <div className="pr-4">
          <Button disabled={isDisabled} primary onClick={() => setStep(2)}>
            Add Receiver Details
          </Button>
        </div>
      </Space>
    </div>
  );
};

StepOne.propTypes = {
  formData: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleCreateJourney: PropTypes.func.isRequired,
};

export default StepOne;
