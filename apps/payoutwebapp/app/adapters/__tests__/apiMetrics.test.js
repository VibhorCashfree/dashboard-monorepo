// Constants
import { METRIC_TYPE } from 'containers/APIMetrics/constants';

// Adapters
import apiMetrics from '../apiMetrics';

const { from } = apiMetrics;

describe('apiMetrics adapters', () => {
  test('from()', () => {
    const errorData = from(
      [
        {
          order_already_exists_invalid_request_error: 8,
          'order_splits[0].amount_invalid_invalid_request_error': 2,
          'order_splits[0].percentage_invalid_invalid_request_error': 2,
          'order_splits[0]_invalid_invalid_request_error': 1,
          timestamp: 1669061880,
          vendor_id_invalid_invalid_request_error: 3,
        },
        {
          order_already_exists_invalid_request_error: 8,
          'order_splits[0].amount_invalid_invalid_request_error': 2,
          'order_splits[0].percentage_invalid_invalid_request_error': 2,
          'order_splits[0]_invalid_invalid_request_error': 1,
          timestamp: 1669061920,
          vendor_id_invalid_invalid_request_error: 3,
        },
        {
          order_already_exists_invalid_request_error: 8,
          'order_splits[0].amount_invalid_invalid_request_error': 2,
          'order_splits[0].percentage_invalid_invalid_request_error': 2,
          'order_splits[0]_invalid_invalid_request_error': 1,
          timestamp: 1669061980,
          vendor_id_invalid_invalid_request_error: 3,
        },
      ],
      METRIC_TYPE.ERROR,
    );

    expect(errorData.dataKeys).toStrictEqual([
      'order_already_exists_invalid_request_error',
      'order_splits[0].amount_invalid_invalid_request_error',
      'order_splits[0].percentage_invalid_invalid_request_error',
      'order_splits[0]_invalid_invalid_request_error',
      'vendor_id_invalid_invalid_request_error',
    ]);

    const latencyData = from(
      [
        {
          latency: 0.14226570899999835,
          timestamp: 1669102980,
        },
        {
          latency: 0.7198977984999999,
          timestamp: 1669110760,
        },
        {
          latency: 0.07390025200000139,
          timestamp: 1669093980,
        },
      ],
      METRIC_TYPE.LATENCY,
    );

    expect(latencyData.dataKeys).toStrictEqual(['latency']);

    const statusCodeData = from(
      [
        {
          percentage: 0,
          timestamp: 1669099820,
        },
        {
          percentage: 0,
          timestamp: 1669109340,
        },
        {
          percentage: 0,
          timestamp: 1669109420,
        },
      ],
      METRIC_TYPE.STATUS_CODE,
    );

    expect(statusCodeData.dataKeys).toStrictEqual(['error_percentage']);
  });
});
