import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { CartesianGrid, XAxis, YAxis, Line, Tooltip } from 'recharts';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { GRAPH } from '../constants';

// Styled
import { StyledLineChart } from '../styled';

// Types
import type { LineChartProps } from '../types';

const LineChart: React.FC<LineChartProps> = ({
  data = [],
  dataKeys = [],
  formatter,
}) => {
  const { COLORS } = useContext(ThemeContext);

  const renderContent = () => {
    if (_size(data)) {
      return dataKeys.map((dataKey: string, index: number) => (
        <Line
          key={dataKey}
          type="monotone"
          dataKey={dataKey}
          stroke={GRAPH.colors[index]}
          strokeWidth={1}
          isAnimationActive={false}
          connectNulls
          dot={null}
        />
      ));
    }

    return (
      <text
        x={GRAPH.width / 2}
        y={GRAPH.height / 2}
        fill={COLORS.bodyLight}
        fontSize={16}
        textAnchor="middle"
      >
        No record found
      </text>
    );
  };

  return (
    <StyledLineChart
      width={GRAPH.width}
      height={GRAPH.height}
      data={data}
      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        stroke={COLORS.bodyLight}
        fill={COLORS.bodyLight}
        tick={data.length > 0}
        dataKey="displayText"
        tickLine
        minTickGap={-25}
      />
      <YAxis
        stroke={COLORS.bodyLight}
        fill={COLORS.bodyLight}
        axisLine={false}
        tickLine={false}
        tickFormatter={formatter}
      />
      <Tooltip
        wrapperStyle={{ minWidth: 300 }}
        cursor={false}
        formatter={formatter}
        allowEscapeViewBox={{ x: true, y: true }}
      />

      {renderContent()}
    </StyledLineChart>
  );
};

export default withErrorBoundary(LineChart);
