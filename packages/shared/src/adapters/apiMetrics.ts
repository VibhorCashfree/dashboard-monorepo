import moment from 'moment';
import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';
import _max from 'lodash/max';
import _get from 'lodash/get';
import { METRIC_TYPE } from '../constants/apiMetrics';

export const from = (data: any, metricType: METRIC_TYPE) => {
  const map: any = {};
  const dataKeys: string[] = [];
  const items = _cloneDeep(data);

  let maxData;

  if (metricType === METRIC_TYPE.ERROR) {
    items.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'timestamp' && !map[key]) {
          map[key] = 1;
          dataKeys.push(key);
        }
      });
    });

    items.sort(
      (a: { timestamp: number }, b: { timestamp: number }) =>
        a.timestamp - b.timestamp
    );

    items.forEach((item: any, index: number) => {
      Object.keys(item).forEach((key) => {
        if (key === 'timestamp') {
          items[index].displayText = moment.unix(item[key]).format('l LT');
        }
      });

      dataKeys.forEach((key) => {
        if (!item[key]) {
          items[index][key] = 0;
        }
      });
    });
  } else {
    items.sort(
      (a: { timestamp: number }, b: { timestamp: number }) =>
        a.timestamp - b.timestamp
    );

    items.forEach((item: any, index: number) => {
      if (metricType === METRIC_TYPE.STATUS_CODE) {
        const successCount = _get(items[index], '200', 0);
        const errorCodes = _omit(items[index], ['timestamp', '200']);

        const errorCount = Object.values(errorCodes).reduce(
          (prev: number, curr: any) => prev + Number(curr),
          0
        );

        const totalCount = successCount + errorCount;

        items[index].Success = Number(((successCount / totalCount) * 100).toFixed(2));
        // For payoutwebapp compatibility (it uses error_percentage)
        items[index].error_percentage = item.percentage ? item.percentage.toFixed(2) : ((1 - successCount / totalCount) * 100).toFixed(2);
      }

      if (metricType === METRIC_TYPE.LATENCY) {
        items[index].latency = item.latency.toFixed(2);
      }

      items[index].displayText = moment.unix(item.timestamp).format('l LT');
    });

    if (metricType === METRIC_TYPE.STATUS_CODE) {
      // vswebapp uses 'Success'
      dataKeys.push('Success');
      // payoutwebapp uses 'error_percentage', effectively handled by unified object?
       
      const maxPercentage = items.map((item: any) => Number(item.Success));
      maxData = _max(maxPercentage);
    }

    if (metricType === METRIC_TYPE.LATENCY) {
      dataKeys.push('latency');

      const allLatency = items.map((item: any) => Number(item.latency));
      maxData = _max(allLatency);
    }
  }

  return {
    data: items,
    dataKeys,
    maxData,
  };
};

export default {
  from,
};
