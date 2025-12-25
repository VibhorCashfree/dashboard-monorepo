import _get from 'lodash/get';
import _first from 'lodash/first';
import _last from 'lodash/last';
import _isUndefined from 'lodash/isUndefined';

export const getPaginationInfo = (
  data: { data: AnyObject[]; count: number; hasNext: boolean },
  currentPage: number,
) => {
  const rowData = _get(data, 'data', []);
  const count = _get(data, 'count', 0);
  const hasNext = _get(data, 'hasNext', false);
  const totalCount = count === -1 ? 0 : count;

  const currentPageCount = rowData.length;
  const hasPrev = currentPage !== 1;

  return {
    rowData,
    currentPageCount,
    totalCount,
    hasPrev,
    hasNext,
  };
};

export const getCursor = (
  data: TableData,
  previousPage: number | undefined,
  currentPage: number,
): [string, any] => {
  if (!_isUndefined(previousPage)) {
    if (previousPage > currentPage) {
      const firstRow = data && _first(data.data);

      return ['previousId', currentPage === 1 ? '0' : _get(firstRow, 'id')];
    }
  }

  const lastRow = data && _last(data.data);

  return ['lastId', currentPage === 1 ? '0' : _get(lastRow, 'id')];
};
