import React from 'react';
import { Loader, Segment } from '@cashfree-intl/coherent';

// Styled
import { StyledDimmable } from './styled';

// Types
import type { Props } from './types';

const ContentLoader = ({ loading, children, ...props }: Props) => (
  <StyledDimmable as={loading ? Segment : null} dimmed={loading} {...props}>
    {loading && <Loader active page={false} />}
    {children}
  </StyledDimmable>
);

export default ContentLoader;
