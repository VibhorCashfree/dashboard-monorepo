import React from 'react';
import { Helmet } from 'react-helmet';
import type { MetaTagsProps } from './types';

const MetaTags = ({ title }: MetaTagsProps) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default MetaTags;
export type { MetaTagsProps } from './types';
