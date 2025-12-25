import React from 'react';
import { Helmet } from 'react-helmet';

// Types
import type { Props } from './types';

const MetaTags = ({ title }: Props) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default MetaTags;
