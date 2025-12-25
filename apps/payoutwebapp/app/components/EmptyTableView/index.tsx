import React from 'react';
import { Space, Image } from '@cashfree-intl/coherent';

// Images
import emptyImg from 'images/empty.svg';

// Styled
import { StyledEmptyTableView } from './styled';

const EmptyTableView = () => (
  <StyledEmptyTableView>
    <Space direction="column" gap={1} alignItems="center" className="my-6">
      <Image src={emptyImg} />
      <div>No data found!</div>
    </Space>
  </StyledEmptyTableView>
);

export default EmptyTableView;
