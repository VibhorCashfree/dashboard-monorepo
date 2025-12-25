import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

// Services
import * as FundSourcesService from 'services/fundSources';

// Containers
import Summary from '..';

// Components
import Wrapper from '__tests__/components/Wrapper';
import CustomTooltip from '../components/CustomTooltip';
import InfographicBarChart from '../components/InfographicBarChart';

jest.mock('recharts', () => ({
  // eslint-disable-next-line react/prop-types
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  // eslint-disable-next-line react/prop-types
  Bar: ({ name }) => <div data-testid="bar">{name}</div>,
  XAxis: () => <div data-testid="x-axis">XAxis</div>,
  YAxis: () => <div data-testid="y-axis">YAxis</div>,
  CartesianGrid: () => <div data-testid="grid">Grid</div>,
  Tooltip: () => <div data-testid="tooltip">Tooltip</div>,
  Label: () => <div data-testid="label">Label</div>,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

const dataByStatusMock = {
  success: {
    totalCount: 10,
    totalVolume: 5000,
    dataPoints: [
      {
        startTime: '2024-01-01',
        endTime: '2024-01-02',
        count: 5,
        volume: 2500,
      },
      {
        startTime: '2024-01-02',
        endTime: '2024-01-03',
        count: 5,
        volume: 2500,
      },
    ],
  },
  failure: {
    totalCount: 3,
    totalVolume: 1000,
    dataPoints: [
      { startTime: '2024-01-01', endTime: '2024-01-02', count: 2, volume: 700 },
      { startTime: '2024-01-02', endTime: '2024-01-03', count: 1, volume: 300 },
    ],
  },
};

const dateValueMock = {
  displayText: 'Today',
  range: [moment().subtract(1, 'days'), moment()],
};

beforeEach(() => {
  jest.mock('services/summary');

  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'getBalance').mockImplementation(() =>
    Promise.resolve({
      balance: '8940',
      availableBalance: '8940',
      fundsOnHold: '0',
      overdraft: '0',
      lastUpdated: '2022-12-04 11:12:22',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Summary Container', () => {
  test('Zero Balance Alert should work for 0 available balance', async () => {
    render(
      <Summary
        lowBalanceThreshold={{
          lowBalance: '20',
          isActive: false,
          email: 'amit@cashfree.com',
        }}
        availableBalance={{
          availableBalance: '0',
          balance: '9988386845.61',
          overdraft: '10000',
          fundsOnHold: '33997369.61',
        }}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText(/Recharge your Payouts Account/i),
      ).toBeInTheDocument();
    });
  });

  test('All fund source balance cards should appear', async () => {
    render(
      <Summary
        lowBalanceThreshold={{
          lowBalance: '20',
          isActive: false,
          email: 'amit@cashfree.com',
        }}
        availableBalance={{
          availableBalance: '21',
          balance: '9988386845.61',
          overdraft: '10000',
          fundsOnHold: '33997369.61',
        }}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(FundSourcesService.getBalance).toHaveBeenCalledWith(
        'RBL_CONNECTED',
      );
      expect(FundSourcesService.getBalance).toHaveBeenCalledWith(
        'CREDIT_CARD_102_c5fecd2',
      );
    });
  });

  test('<InfographicBarChart /> should render the bar chart with correct elements', async () => {
    const { getByTestId } = render(
      <InfographicBarChart
        type="transaction"
        dataByStatus={dataByStatusMock}
        unit="days"
        dateValue={dateValueMock}
      />,
      { wrapper: Wrapper },
    );

    {
      const infoIcon = getByTestId('info');

      expect(
        screen.queryByText('Excludes transaction rejected by Cashfree'),
      ).not.toBeInTheDocument();

      await userEvent.hover(infoIcon);

      await waitFor(() => {
        expect(
          screen.queryByText('Excludes transaction rejected by Cashfree'),
        ).toBeInTheDocument();
      });

      await userEvent.unhover(infoIcon);

      await waitFor(() => {
        expect(
          screen.queryByText('Excludes transaction rejected by Cashfree'),
        ).not.toBeInTheDocument();
      });
    }

    // Check if the chart is rendered
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();

    // Check bars for each status
    expect(screen.getAllByTestId('bar').length).toBe(2); // success, failure
    expect(screen.getAllByTestId('bar')[0]).toHaveTextContent('success');
    expect(screen.getAllByTestId('bar')[1]).toHaveTextContent('failure');

    // Check if axes and other chart elements are rendered
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  test('<InfographicBarChart /> should render the legend with correct status information', () => {
    render(
      <InfographicBarChart
        type="transaction"
        dataByStatus={dataByStatusMock}
        unit="days"
        dateValue={dateValueMock}
      />,
      { wrapper: Wrapper },
    );

    // Check if legend data is rendered
    expect(screen.getByText('10')).toBeInTheDocument(); // success count
    expect(screen.getByText('3')).toBeInTheDocument(); // failure count
    expect(screen.getByText('₹ 5,000.00')).toBeInTheDocument(); // success volume
    expect(screen.getByText('₹ 1,000.00')).toBeInTheDocument(); // failure volume
  });

  test('<InfographicBarChart /> should change chart type when switch is clicked', () => {
    const { container } = render(
      <InfographicBarChart
        type="transaction"
        dataByStatus={dataByStatusMock}
        unit="days"
        dateValue={dateValueMock}
      />,
      { wrapper: Wrapper },
    );

    // Initially, chart type is 'amount'
    expect(container.querySelectorAll('[data-testid="bar"]').length).toBe(2); // Bars rendered

    const switchButton = screen.getByText('Amount'); // Mocked Switch value
    fireEvent.click(switchButton); // Change the chart type
  });

  test('<InfographicBarChart /> should display "No data" message when there is no data', () => {
    render(
      <InfographicBarChart
        type="transaction"
        dataByStatus={{}}
        unit="days"
        dateValue={dateValueMock}
      />,
      { wrapper: Wrapper },
    );

    // Check if "No data" message is rendered
    expect(
      screen.getByText('No transaction created today'),
    ).toBeInTheDocument();
  });

  test('<InfographicBarChart /> should handle link click in the legend correctly', () => {
    render(
      <InfographicBarChart
        type="transaction"
        dataByStatus={dataByStatusMock}
        unit="days"
        dateValue={dateValueMock}
      />,
      { wrapper: Wrapper },
    );

    // Ensure links are present for each status
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3); // success, failure
  });

  test('<CustomTooltip /> should not render anything when inactive or no payload is provided', () => {
    const { container } = render(
      <CustomTooltip active={false} payload={null} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(container.firstChild).toBeNull();

    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  test('<CustomTooltip /> should render tooltip with correct data when active and payload is provided', () => {
    render(
      <CustomTooltip
        active={true}
        payload={[
          {
            name: 'PENDING',
            value: 1000,
            color: '#00FF00',
            payload: {
              name: '2023-09-15 - 2023-09-16',
              amount: { PENDING: 1000, FAILED: 500 },
              count: { PENDING: 10, FAILED: 5 },
            },
          },
          {
            name: 'REJECTED',
            value: 500,
            color: '#FF0000',
            payload: {
              name: '2023-09-15 - 2023-09-16',
              amount: { SUCCESS: 1000, REJECTED: 500 },
              count: { SUCCESS: 10, REJECTED: 5 },
            },
          },
          {
            name: 'FAILED',
            value: 500,
            color: '#FF0000',
            payload: {
              name: '2023-09-15 - 2023-09-16',
              amount: { SUCCESS: 120, REJECTED: 120 },
              count: { SUCCESS: 110, REJECTED: 110 },
            },
          },
        ]}
      />,
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.queryByText('2023-09-15 - 2023-09-16')).toBeInTheDocument();

    expect(screen.queryByText('Pending')).toBeInTheDocument();
    expect(screen.queryByText('Rejected')).toBeInTheDocument();

    expect(screen.queryByText('₹ 1,000.00')).toBeInTheDocument();
    expect(screen.queryByText('₹ 1,000.00')).toHaveClass('amount-value');
    expect(screen.queryByText('₹ 500.00')).toBeInTheDocument();
    expect(screen.queryByText('₹ 500.00')).toHaveClass('amount-value');
    expect(screen.queryByText('10')).toBeInTheDocument();
    expect(screen.queryByText('10')).toHaveClass('count-value');
    expect(screen.queryByText('5')).toBeInTheDocument();
    expect(screen.queryByText('5')).toHaveClass('count-value');

    expect(screen.queryByText('₹ 110.00')).not.toBeInTheDocument();
    expect(screen.queryByText('₹ 120.00')).not.toBeInTheDocument();
  });
});
