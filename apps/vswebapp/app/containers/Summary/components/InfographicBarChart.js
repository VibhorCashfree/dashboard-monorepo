import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
import moment from 'moment';
import _uniq from 'lodash/uniq';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _sumBy from 'lodash/sumBy';
import _flatMap from 'lodash/flatMap';
import _capitalize from 'lodash/capitalize';

// Constants
import { ALERT_BY_STATUS, LABEL_BY_STATUS } from 'constants/status';

import { GRAPH } from '../constants';

// Utils
import Analytics from 'utils/analytics';
import { formatNumber } from 'utils/common';

// Components
import Icon from 'components/Icon';
import CustomTooltip from './CustomTooltip';

// Styled
import { StyledDiv, StyledColorDot } from '../styled';

const InfographicBarChart = ({
  data,
  type,
  linkTo,
  unitInHours,
  dateValue,
}) => {
  const { COLORS } = useContext(ThemeContext);

  const entries = _get(data, 'entries', []);
  const flatDetails = _flatMap(_map(entries, 'details'));
  const statusList = _map(flatDetails, 'status');
  const uniqueStatusList = _uniq(statusList);

  const { displayText: dateType, range: domain } = dateValue;

  const startFormat = unitInHours ? 'h:00 a' : 'D';
  const endFormat = unitInHours ? 'h:00 a' : 'D MMM';

  const legendsData = uniqueStatusList.map(status => {
    const filteredDetails = flatDetails.filter(
      detail => detail.status === status,
    );

    return {
      status,
      count: _sumBy(filteredDetails, 'count'),
    };
  });

  const formattedData = entries.map(entry => {
    const countByStatus = uniqueStatusList.reduce((acc, status) => {
      const detail = _find(entry.details, { status });
      const count = _get(detail, 'count', 0);

      return { ...acc, [status]: count };
    }, {});

    const startMoment = moment(entry.startTime);
    const name = `${startMoment.format(startFormat)}-${startMoment
      .add(1, unitInHours ? 'hours' : 'days')
      .format(endFormat)}`;

    return {
      name,
      count: countByStatus,
    };
  });

  console.log(formattedData);

  const renderContent = () => {
    if (entries.length) {
      return uniqueStatusList.map(status => (
        <Bar
          key={status}
          name={status}
          dataKey={`count.${status}`}
          stackId="a"
          fill={COLORS[ALERT_BY_STATUS[status]]}
        />
      ));
    }

    const getNoDataMessage = () => {
      switch (dateType) {
        case 'Custom':
          return `No ${type} created from ${moment(domain[0]).format(
            'l',
          )} to ${moment(domain[1]).format('l')}`;

        case 'Today':
          return `No ${type} created today`;

        default:
          return `No ${type} created in ${dateType}`;
      }
    };

    return (
      <text
        x={GRAPH.width / 2}
        y={GRAPH.height / 2}
        fill={COLORS.bodyLight}
        fontSize={16}
        textAnchor="middle"
      >
        {getNoDataMessage()}
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
            title={type}
          >
            {type}
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
        <Link to={linkTo}>
          <Icon name="top-right-arrow" />
        </Link>
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
            tickFormatter={value => formatNumber(value)}
          >
            <Label
              fill={COLORS.bodyLight}
              value={_capitalize(type)}
              angle={-90}
              offset={0}
              position="insideBottomLeft"
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
          {legendsData.map(item => {
            const to = `${linkTo}?status=${
              item.status
            }&startDate=${+domain[0]}&endDate=${+domain[1]}`;

            return (
              <Link
                to={to}
                key={item.status}
                onClick={() => Analytics.track(`Navigated to All ${type}`)}
              >
                <StyledColorDot $color={COLORS[ALERT_BY_STATUS[item.status]]} />
                <div>
                  <Text variant="b12" color="bodyLight" className="mb-0">
                    {LABEL_BY_STATUS[item.status]}
                  </Text>
                  <Text className="count">{item.count}</Text>
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

InfographicBarChart.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  unitInHours: PropTypes.bool.isRequired,
  dateValue: PropTypes.object.isRequired,
};

export default InfographicBarChart;
