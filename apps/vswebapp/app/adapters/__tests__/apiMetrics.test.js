import apiMetrics from '../apiMetrics';
import moment from 'moment';

const { from } = apiMetrics;

const today = moment();
const displayText = moment.unix(today).format('l LT');

describe('apiMetrics adapters', () => {
  test('from() LATENCY', () => {
    expect(
      from(
        [
          {
            latency: 10.558823529411754,
            timestamp: today,
          },
          {
            latency: 10,
            timestamp: today,
          },
        ],
        'LATENCY',
      ),
    ).toStrictEqual({
      data: [
        {
          latency: '10.56',
          timestamp: today,
          displayText,
        },
        {
          latency: '10.00',
          timestamp: today,
          displayText,
        },
      ],
      dataKeys: ['latency'],
      maxData: 10.56,
    });
  });

  test('from() ERROR', () => {
    expect(
      from(
        [
          {
            '424': 3,
            timestamp: today,
          },
          {
            '428': 10,
            timestamp: today,
          },
        ],
        'ERROR',
      ),
    ).toStrictEqual({
      data: [
        {
          '424': 3,
          '428': 0,
          timestamp: today,
          displayText,
        },
        {
          '428': 10,
          '424': 0,
          timestamp: today,
          displayText,
        },
      ],
      dataKeys: ['424', '428'],
      maxData: undefined,
    });
  });

  test('from() STATUS_CODE', () => {
    expect(
      from(
        [
          {
            '412': 96,
            '424': 24,
            '200': 132,
            timestamp: today,
          },
        ],
        'STATUS_CODE',
      ),
    ).toStrictEqual({
      data: [
        {
          '412': 96,
          '424': 24,
          timestamp: today,
          '200': 132,
          Success: 52.38,
          displayText,
        },
      ],
      dataKeys: ['Success'],
      maxData: 52.38,
    });
  });
});
