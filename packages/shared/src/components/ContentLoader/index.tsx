import React from 'react';
import { Loader, Segment } from '@cashfree-intl/coherent';
import { StyledDimmable } from './styled';
import type { ContentLoaderProps } from './types';

const ContentLoader = ({ loading, children, ...props }: ContentLoaderProps) => (
  <StyledDimmable as={loading ? Segment : null} dimmed={loading} {...props}>
    {loading && <Loader active page={false} />}
    {children}
  </StyledDimmable>
);

export default ContentLoader;
export type { ContentLoaderProps } from './types';
