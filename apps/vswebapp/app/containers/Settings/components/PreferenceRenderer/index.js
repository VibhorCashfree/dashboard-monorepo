import React from 'react';
import PropTypes from 'prop-types';
import { Space, Checkbox } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import {
  StyledContainer,
  StyledRow,
  StyledPreferenceBox,
  StyledChannelText,
  StyledDescriptionText,
  StyledHeadingText,
} from './styled';

const PreferenceRenderer = ({
  heading,
  visibleChannels,
  data,
  isReadOnly = true,
  onChange,
}) => (
  <StyledContainer direction="column">
    <StyledRow>
      <StyledHeadingText variant="h20">
        {heading.toLowerCase()}
      </StyledHeadingText>
      <Space>
        {visibleChannels.map(channel => (
          <StyledPreferenceBox key={channel}>
            <StyledChannelText data-testid="preference-channel" variant="p14">
              {channel === 'SMS' ? 'SMS' : channel.toLowerCase()}
            </StyledChannelText>
          </StyledPreferenceBox>
        ))}
      </Space>
    </StyledRow>
    {Object.values(data).map(({ id, title, description, isActive }) => (
      <StyledRow className="py-1" key={title}>
        <Space direction="column">
          <StyledHeadingText variant="b14" strong>
            {title}
          </StyledHeadingText>
          <StyledDescriptionText variant="p14" color="bodyLight">
            {description}
          </StyledDescriptionText>
        </Space>
        <Space>
          {visibleChannels.map(channel => (
            // const popupContent = canEdit
            //   ? _get(
            //       preference,
            //       `[${channel}].channelDetails.channelValue`,
            //       '',
            //     )
            //   : 'Not Applicable';
            <StyledPreferenceBox key={`${title}-${channel}`}>
              <Checkbox
                data-testid="preference-checkbox"
                label=""
                disabled={isReadOnly}
                checked={isActive || false}
                onChange={() => {
                  if (onChange) {
                    onChange({
                      id,
                      title,
                      channel,
                      isActive: !isActive,
                    });
                  }
                }}
              />
              {/* <Popup
                    position="top center"
                    content={popupContent}
                    trigger={
                      <Checkbox
                        data-testid="preference-checkbox"
                        label=""
                        disabled={isReadOnly || !canEdit}
                        checked={_get(
                          preference,
                          `[${channel}].isActive`,
                          false,
                        )}
                        onChange={() => {
                          const channelPref = preference[channel];
                          if (channelPref && onChange) {
                            onChange({
                              title,
                              channel,
                              isActive: !channelPref.isActive,
                            });
                          }
                        }}
                      />
                    }
                  /> */}
            </StyledPreferenceBox>
          ))}
        </Space>
      </StyledRow>
    ))}
  </StyledContainer>
);

PreferenceRenderer.propTypes = {
  heading: PropTypes.string.isRequired,
  visibleChannels: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PreferenceRenderer;
