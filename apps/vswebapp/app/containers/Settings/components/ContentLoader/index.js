import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from '@cashfree-intl/coherent';

// Components
import Loader from 'components/Loader';

// Styled
import { StyledDimmable } from './styled';

const ContentLoader = ({ loading, children, ...props }) => (
  <StyledDimmable as={loading ? Segment : null} dimmed={loading} {...props}>
    {loading && <Loader active page={false} />}
    {children}
  </StyledDimmable>
);

ContentLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default ContentLoader;
