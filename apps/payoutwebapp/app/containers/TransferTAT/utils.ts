import _get from 'lodash/get';

export const getTotalByDate = (
  statusDateMap: AnyObject,
  dateString: string,
): number =>
  Object.values(statusDateMap).reduce((acc: number, curr: any) => {
    acc += Number(_get(curr, [dateString, 'terminalTransfers'], 0));
    return acc;
  }, 0);
