import React from 'react';

// Styled
import { EmptyTableView } from 'styled/common';

export const showEmptyTableView = paginationInfo =>
  !paginationInfo.currentPageCount && <EmptyTableView />;
