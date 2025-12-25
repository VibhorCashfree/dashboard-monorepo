import React from 'react';
import PropTypes from 'prop-types';

// Components
import { DataTable } from '@cashfree-intl/coherent';

const PaginatedTable = ({
  data,
  limit,
  hasPrev,
  hasNext,
  totalCount,
  currentPage,
  onPageChange,
  onLimitChange,
  tableHeading,
  emptyTableComponent,
  fetching = false,
  onRowClick,
  isPaginated = true,
}) => {
  const paginationInfo = {
    limit,
    hasPrev,
    hasNext,
    onPageChange,
    onLimitChange,
    startRecordCount: currentPage * limit - limit + 1,
    endRecordCount: totalCount
      ? Math.min(currentPage * limit, totalCount)
      : currentPage * limit,
  };

  return (
    <DataTable
      columns={tableHeading}
      records={data}
      {...(isPaginated ? { pagination: paginationInfo } : {})}
      noRecords={emptyTableComponent}
      fetching={fetching}
      {...onRowClick && { onRowClick: row => onRowClick(row.original) }}
    />
  );
};
const NoRecordProps = PropTypes.shape({
  text: PropTypes.string,
  icon: PropTypes.node,
  description: PropTypes.string,
  action: PropTypes.node,
});

PaginatedTable.propTypes = {
  data: PropTypes.array,
  limit: PropTypes.number,
  hasPrev: PropTypes.bool,
  hasNext: PropTypes.bool,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onLimitChange: PropTypes.func,
  tableHeading: PropTypes.any,
  emptyTableComponent: NoRecordProps,
  fetching: PropTypes.bool,
  onRowClick: PropTypes.func,
  isPaginated: PropTypes.bool,
};

export default PaginatedTable;
