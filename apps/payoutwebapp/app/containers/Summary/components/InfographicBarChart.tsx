import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { Paper, Space, Text, Popup } from '@cashfree-intl/coherent';
import {
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  BarChart,
  CartesianGrid,
} from 'recharts';
import moment, { Moment } from 'moment';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _capitalize from 'lodash/capitalize';
import _keyBy from 'lodash/keyBy';
import _uniq from 'lodash/uniq';
import _sum from 'lodash/sum';

// Components
import withErrorBoundary from 'components/ErrorBoundary/hocs';
import Icon from 'components/Icon';
import Switch from './Switch';
import CustomTooltip from './CustomTooltip';

// Constants
import { ALERT_BY_STATUS, LABEL_BY_STATUS, STATUS } from 'constants/status';
import EVENTS from 'constants/events';
import {
  GRAPH,
  options,
  startFormatByUnit,
  endFormatByUnit,
} from '../constants';

// Utils
import Analytics from 'utils/analytics';
import { formatAmount, formatNumber } from 'utils/common';
import { getToUrl } from '../utils';

// Styled
import { StyledDiv, StyledColorDot } from '../styled';

// Types
import type { InfographicBarChartProps } from '../types';

const InfographicBarChart: React.FC<InfographicBarChartProps> = ({
  type,
  dataByStatus,
  unit,
  dateValue,
}) => {
  const { COLORS } = useContext(ThemeContext);

  const [chartType, setChartType] = useState('amount');

  const {
    displayText: dateType,
    range: [startDate, endDate],
  } = dateValue;
  const statuses: string[] = Object.keys(dataByStatus);

  const legendsData = statuses
    .map((status) => ({
      status,
      count: dataByStatus[status].totalCount,
      amount: dataByStatus[status].totalVolume,
    }))
    .filter((legend) => legend.count);

  const dataPointsByStatus = statuses.reduce((acc, status) => {
    acc[status] = _keyBy(
      _get(dataByStatus, [status, 'dataPoints'], []),
      (dataPoint) => `${dataPoint.startTime} - ${dataPoint.endTime}`,
    );
    return acc;
  }, {} as AnyObject);

  let formattedData: Array<{
    name: string;
    count: Record<string, number>;
    amount: Record<string, number>;
  }> = [];

  try {
    const dateRanges: string[] = _uniq(
      Object.values(dataPointsByStatus)
        .map((dataPoint) => Object.keys(dataPoint))
        .flat(),
    ).sort((dateRange, anotherDateRange) => {
      const [start] = dateRange.split(' - ');
      const [end] = anotherDateRange.split(' - ');

      if (moment(start).isAfter(end)) {
        return 1;
      } else if (moment(start).isBefore(end)) {
        return -1;
      }
      return 0;
    });

    formattedData = dateRanges
      .map((dateRange) => {
        const startFormat = startFormatByUnit[unit];
        const endFormat = endFormatByUnit[unit];

        const [startTime, endTime] = dateRange.split(' - ');
        const startMoment: Moment = moment(startTime);
        const endMoment: Moment = moment(endTime);

        const name = `${startMoment.format(startFormat)} - ${endMoment.format(
          endFormat,
        )}`;

        const countByStatus: Record<string, number> = statuses.reduce(
          (acc, status) => {
            acc[status] = _get(
              dataPointsByStatus,
              [status, dateRange, 'count'],
              0,
            );
            return acc;
          },
          {} as AnyObject,
        );

        const amountByStatus: Record<string, number> = statuses.reduce(
          (acc, status) => {
            acc[status] = _get(
              dataPointsByStatus,
              [status, dateRange, 'volume'],
              0,
            );
            return acc;
          },
          {} as AnyObject,
        );

        return {
          name,
          count: countByStatus,
          amount: amountByStatus,
        };
      })
      .filter(
        (data) =>
          _sum(Object.values(data.count)) || _sum(Object.values(data.amount)),
      );
  } catch (error) {
    formattedData = [];
  }

  const renderContent = () => {
    if (_size(dataByStatus) > 0) {
      return statuses.map((status) => (
        <Bar
          key={status}
          name={status}
          dataKey={`${chartType}.${status}`}
          stackId="a"
          fill={COLORS[ALERT_BY_STATUS[status as STATUS]]}
        />
      ));
    }

    let noDataMessage: string;

    switch (dateType) {
      case 'Custom':
        noDataMessage = `No ${type} created from ${moment(startDate).format(
          'l',
        )} to ${moment(endDate).format('l')}`;
        break;

      case 'Today':
        noDataMessage = `No ${type} created today`;
        break;

      default:
        noDataMessage = `No ${type} created in ${dateType}`;
        break;
    }

    return (
      <text
        x={GRAPH.width / 2}
        y={GRAPH.height / 2}
        fill={COLORS.bodyLight}
        fontSize={16}
        textAnchor="middle"
      >
        {noDataMessage}
      </text>
    );
  };

  return (
    <Paper>
      <Space justifyContent="space-between" alignItems="flex-start">
        <div className="mr-2">
          <Text
            variant="h16"
            color="bodyLight"
            className="mb-1 text-capitalize"
          >
            Valid {type} Initiated{' '}
            <Popup
              position="right center"
              content={`Excludes ${type} rejected by Cashfree`}
              trigger={
                <span>
                  <Icon
                    name="info"
                    className="pointer ml-1"
                    verticalAlign="top"
                  />
                </span>
              }
            />
          </Text>
          <Text variant="b12" color="bodyLight" className="mb-1">
            Last updated - {moment().format('lll')}
          </Text>
        </div>
        <Space gap={10} alignItems="center">
          <Switch
            value={chartType}
            options={options}
            onChange={(chartType: string) => {
              Analytics.track(EVENTS.SUMMARY.TOGGLE_CHART_TYPE, {
                chart_type: chartType,
              });
              setChartType(chartType);
            }}
          />
          <Link to={`/${type}/all`}>
            <Icon name="top-right-arrow" />
          </Link>
        </Space>
      </Space>
      <StyledDiv>
        <BarChart
          width={GRAPH.width}
          height={GRAPH.height}
          data={formattedData}
          maxBarSize={70}
          margin={{
            top: 20,
            right: 30,
            bottom: 5,
            left: 15,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            stroke={COLORS.bodyLight}
            fill={COLORS.bodyLight}
            tick={formattedData.length > 0}
          >
            <Label
              fill={COLORS.bodyLight}
              value="Duration"
              offset={-5}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            stroke={COLORS.bodyLight}
            fill={COLORS.bodyLight}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) => formatNumber(value)}
          >
            <Label
              fill={COLORS.bodyLight}
              value={_capitalize(`${type} ${chartType}`)}
              angle={-90}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip
            open
            wrapperStyle={{ width: 300 }}
            offset={0}
            content={<CustomTooltip />}
            cursor={false}
            allowEscapeViewBox={{ x: true, y: true }}
          />
          {renderContent()}
        </BarChart>

        <div className="custom-legend">
          {legendsData.map((item) => {
            const to: string = getToUrl(item.status, type, {
              startDate: String(+startDate),
              endDate: String(+endDate),
            });

            return (
              <Link to={to} key={item.status}>
                <StyledColorDot
                  $color={COLORS[ALERT_BY_STATUS[item.status as STATUS]]}
                />
                <div>
                  <Text variant="b12" color="bodyLight" className="mb-0">
                    {LABEL_BY_STATUS[item.status as STATUS]}
                  </Text>
                  <Text className="mb-0">{item.count}</Text>
                  <Text variant="b12" color="bodyLight" className="mb-0">
                    {formatAmount(item.amount)}
                  </Text>
                </div>
                <Icon className="ui image" name="top-right-arrow" />
              </Link>
            );
          })}
        </div>
      </StyledDiv>
    </Paper>
  );
};

export default withErrorBoundary(InfographicBarChart);
