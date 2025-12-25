import moment from 'moment';
import _cloneDeep from 'lodash/cloneDeep';

// Constants
import { METRIC_TYPE } from 'containers/APIMetrics/constants';

const from = (data: any, metricType: METRIC_TYPE) => {
  const map: any = {};
  const dataKeys: string[] = [];
  const items = _cloneDeep(data);

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
        a.timestamp - b.timestamp,
    );

    items.forEach((item: { [x: string]: any }, index: string | number) => {
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
        a.timestamp - b.timestamp,
    );

    items.forEach(
      (
        item: { timestamp: number; percentage: number; latency: number },
        index: string | number,
      ) => {
        items[index].displayText = moment.unix(item.timestamp).format('l LT');

        if (metricType === METRIC_TYPE.STATUS_CODE) {
          items[index].error_percentage = item.percentage.toFixed(2);
        }

        if (metricType === METRIC_TYPE.LATENCY) {
          items[index].latency = item.latency.toFixed(2);
        }
      },
    );

    if (metricType === METRIC_TYPE.STATUS_CODE) {
      dataKeys.push('error_percentage');
    }

    if (metricType === METRIC_TYPE.LATENCY) {
      dataKeys.push('latency');
    }
  }

  return {
    data: items,
    dataKeys,
  };
};

export default {
  from,
};
