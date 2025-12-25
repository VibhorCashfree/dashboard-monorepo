import React from 'react';
import { DataTable, Icon } from '@cashfree-intl/coherent';

// Utils
import { getPaginationInfo } from 'utils/pagination';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Types
import type { Props } from './types';

const DataTableWithPagination = ({
  loading,
  limit,
  currentPage,
  data,
  columns,
  noRecords = {
    text: 'No data found!',
    icon: <Icon name="noRecordsTableIcon" />,
  },
  selectProps,
  onPageChange,
  onLimitChange,
  onRowClick,
}: Props) => {
  const {
    rowData: records,
    // currentPageCount,
    totalCount,
    hasPrev,
    hasNext,
  } = getPaginationInfo(data, currentPage);

  const startRecordCount = currentPage * limit - limit + 1;
  const endRecordCount = Math.min(currentPage * limit, totalCount);

  const otherProps: { onRowClick?: (arg: any) => void } = {};

  if (onRowClick) {
    otherProps.onRowClick = (row) => onRowClick(row.original);
  }

  return (
    <DataTable
      fetching={loading}
      columns={columns}
      records={records}
      pagination={{
        limit,
        hasPrev,
        hasNext,
        currentPage,
        startRecordCount,
        endRecordCount,
        onPageChange,
        onLimitChange,
      }}
      rowSelect={selectProps}
      noRecords={noRecords}
      {...otherProps}
    />
  );
};

export default withErrorBoundary(DataTableWithPagination);
