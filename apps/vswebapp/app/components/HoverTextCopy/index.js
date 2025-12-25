import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Segment } from '@cashfree-intl/coherent';

// Components
import Icon from 'components/Icon';

// Utils
import { copyToClipboard } from 'utils/common';

// Styled
import { StyledDimmable, StyledDimmer } from './styled';

export const HoverTextCopy = ({ text, children }) => {
  const [active, setActive] = useState();

  const handleCopy = e => {
    e.stopPropagation();

    copyToClipboard(text);
  };

  return (
    <StyledDimmable
      as={active ? Segment : null}
      dimmed={active}
      onMouseEnter={() => setActive(text)}
      onMouseLeave={() => setActive()}
    >
      {active && (
        <StyledDimmer active inverted onClick={handleCopy}>
          <div>
            <Icon name="copy" />
            <Text as="span" color="primary" variant="h16">
              Copy
            </Text>
          </div>
        </StyledDimmer>
      )}
      {children}
    </StyledDimmable>
  );
};

HoverTextCopy.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default HoverTextCopy;
