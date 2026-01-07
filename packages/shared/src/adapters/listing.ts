export interface PaginationQueryObj {
  size: number;
  previousId?: string | number;
  [key: string]: any;
}

export const from = (
  rows: any[],
  queryObj: PaginationQueryObj,
  extra = {},
) => {
  const hasNext = rows.length === queryObj.size + 1;

  let data;

  if (hasNext) {
    if (
      typeof queryObj.previousId !== 'undefined' &&
      Number(queryObj.previousId)
    ) {
      // For previous page: slice from the start
      data = rows.slice(1);
    } else {
      // For next page: slice from the end
      data = rows.slice(0, rows.length - 1);
    }
  } else {
    data = rows;
  }

  return {
    data,
    hasNext,
    ...extra,
  };
};

export const to = (queryObj: PaginationQueryObj): PaginationQueryObj => ({
  ...queryObj,
  size: queryObj.size + 1,
});

export default {
  from,
  to,
};
