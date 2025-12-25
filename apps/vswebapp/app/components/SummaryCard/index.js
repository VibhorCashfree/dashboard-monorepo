import React from 'react';
import PropTypes from 'prop-types';
import { Space } from '@cashfree-intl/coherent';

// Styled
import { StyledPaper } from './styled';

const SummaryCard = ({ children, ...props }) => (
  <StyledPaper {...props}>{children}</StyledPaper>
);

const Header = ({ children }) => (
  <header>
    <Space justifyContent="space-between" alignItems="center">
      <>{children}</>
    </Space>
  </header>
);

const Content = ({ children }) => <section>{children}</section>;

SummaryCard.Header = Header;
SummaryCard.Content = Content;

SummaryCard.propTypes = {
  children: PropTypes.any,
};

export default SummaryCard;
