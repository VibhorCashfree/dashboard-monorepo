import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, Space, Conditional, Toggle } from '@cashfree-intl/coherent';
import { StyledCard, StyledText, StyledChildrenContainer } from './styled';

const CategoryCard = ({
  title,
  description,
  open,
  children,
  active,
  onClick,
  onToggleStatus,
}) => (
  <StyledCard>
    <Space
      className="w-100"
      justifyContent="space-between"
      alignItems="center"
      onClick={onClick}
    >
      <div>
        <StyledText strong variant="b14">
          {title}
        </StyledText>
        <StyledText variant="p14" color="bodyLight">
          {description}
        </StyledText>
      </div>
      <Space gap={2} data-testid="category-card-toggle-container">
        <Toggle
          active={active}
          onToggle={e => {
            e.stopPropagation();
            onToggleStatus();
          }}
        />
        <Icon name={open ? 'chevron-up' : 'chevron-down'} />
      </Space>
    </Space>
    <Conditional if={open}>
      <StyledChildrenContainer direction="column" className="mt-2">
        {children}
      </StyledChildrenContainer>
    </Conditional>
  </StyledCard>
);
CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onToggleStatus: PropTypes.func.isRequired,
};

export default memo(CategoryCard);
