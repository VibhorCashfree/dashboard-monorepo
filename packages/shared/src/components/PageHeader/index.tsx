import React from 'react';
import { Space } from '@cashfree-intl/coherent';
import styled from 'styled-components';
import { PageHeaderProps } from './types';

const PageHeading = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const PageHeader: React.FC<PageHeaderProps> = ({ children, extra }) => (
  <Space justifyContent="space-between" className="mb-1" style={{ alignItems: 'center' }}>
    <PageHeading>{children}</PageHeading>
    {extra && <div className="page-header-extra">{extra}</div>}
  </Space>
);

export default PageHeader;
export type { PageHeaderProps } from './types';
