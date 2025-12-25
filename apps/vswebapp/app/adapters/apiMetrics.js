import moment from 'moment';
import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';
import _max from 'lodash/max';
import _get from 'lodash/get';

// Constants
import { METRIC_TYPE } from 'containers/APIMetrics/constants';

const from = (data, metricType) => {
  const map = {};
  const dataKeys = [];
  const items = _cloneDeep(data);

  let maxData;

  if (metricType === METRIC_TYPE.ERROR) {
    items.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'timestamp' && !map[key]) {
          map[key] = 1;
          dataKeys.push(key);
        }
      });
    });

    items.sort((a, b) => a.timestamp - b.timestamp);

    items.forEach((item, index) => {
      Object.keys(item).forEach(key => {
        if (key === 'timestamp') {
          items[index].displayText = moment.unix(item[key]).format('l LT');
        }
      });

      dataKeys.forEach(key => {
        if (!item[key]) {
          items[index][key] = 0;
        }
      });
    });
  } else {
    items.sort((a, b) => a.timestamp - b.timestamp);

    items.forEach((item, index) => {
      if (metricType === METRIC_TYPE.STATUS_CODE) {
        const successCount = _get(items[index], '200', 0);
        const errorCodes = _omit(items[index], ['timestamp', '200']);

        const errorCount = Object.values(errorCodes).reduce(
          (prev, curr) => prev + curr,
          0,
        );

        const totalCount = successCount + errorCount;

        items[index].Success = Number(
          ((successCount / totalCount) * 100).toFixed(2),
        );
      }

      if (metricType === METRIC_TYPE.LATENCY) {
        items[index].latency = item.latency.toFixed(2);
      }

      items[index].displayText = moment.unix(item.timestamp).format('l LT');
    });

    if (metricType === METRIC_TYPE.STATUS_CODE) {
      dataKeys.push('Success');

      const maxPercentage = items.map(item => Number(item.Success));
      maxData = _max(maxPercentage);
    }

    if (metricType === METRIC_TYPE.LATENCY) {
      dataKeys.push('latency');

      const allLatency = items.map(item => Number(item.latency));
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
