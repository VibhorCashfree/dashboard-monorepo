import React from 'react';
import { Popup, Icon, Conditional } from '@cashfree-intl/coherent';
import { StyledCross, StyledSpace, StyledText } from './styled';
import PropTypes from 'prop-types';

const ChipUI = ({
  name,
  verified = false,
  maxWidth = '198px',
  onDelete,
  ...popupTriggerProps
}) => (
  <StyledSpace
    {...popupTriggerProps}
    $verified={verified}
    $maxWidth={maxWidth}
    className="py-1 px-2"
    gap={1}
    alignItems="center"
    justifyContent="space-between"
  >
    <Conditional if={verified}>
      <Icon style={{ flexShrink: 0 }} name="GREEN_TICK" />
    </Conditional>
    <StyledText $verified={verified} title={name} variant="p14">
      {name}
    </StyledText>
    <StyledCross
      data-testid="chip-delete-button"
      $verified={verified}
      onClick={onDelete}
    />
  </StyledSpace>
);

const Chip = ({ popoverText, ...props }) =>
  popoverText ? (
    <Popup
      content={popoverText}
      trigger={<ChipUI {...props} />}
      position="top center"
      hoverable
    />
  ) : (
    <ChipUI {...props} />
  );

Chip.propTypes = {
  name: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  maxWidth: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  popoverText: PropTypes.node,
};

ChipUI.propTypes = {
  name: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  maxWidth: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default Chip;
