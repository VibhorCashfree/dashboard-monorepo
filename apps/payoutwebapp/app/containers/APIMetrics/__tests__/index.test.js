import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Services
import * as DevelopersService from 'services/developers';

// Constants
import { GRAPH } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import LineChart from '../components/LineChart';

// Containers
import APIMetrics from '..';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.mock('services/developers');

  jest.spyOn(DevelopersService, 'getMetrics').mockImplementation(() =>
    Promise.resolve({
      data: [],
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In APIMetrics Container', () => {
  test('checks render', async () => {
    render(<APIMetrics />, { wrapper: Wrapper });

    expect(DevelopersService.getMetrics).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      expect(
        screen.queryByText('How does Developers tab work?'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Today')).toBeInTheDocument();
      expect(screen.queryByText('Get Transfer Report')).toBeInTheDocument();
      expect(screen.queryByText('Cashgram Transfers')).toBeInTheDocument();
      expect(screen.queryByText('Error Percentage')).toBeInTheDocument();
    });
  });
});

describe('In LineChart components', () => {
  test('should render "No record found" text when data is empty', () => {
    render(
      <LineChart data={[]} dataKeys={['value']} formatter={(value) => value} />,
      { wrapper: Wrapper },
    );

    expect(screen.getByText('No record found')).toBeInTheDocument();
  });

  test('should render lines when data is provided', () => {
    render(
      <LineChart
        data={[
          { displayText: 'Jan', value: 100 },
          { displayText: 'Feb', value: 200 },
        ]}
        dataKeys={['value']}
        formatter={(value) => value}
      />,
      { wrapper: Wrapper },
    );

    expect(screen.queryByText('No record found')).not.toBeInTheDocument();
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
  });

  test('should apply the correct theme colors', () => {
    render(
      <LineChart
        data={[
          { displayText: 'Jan', value: 100 },
          { displayText: 'Feb', value: 200 },
        ]}
        dataKeys={['value']}
        formatter={(value) => value}
      />,
      { wrapper: Wrapper },
    );

    const displayTextElement = screen.getByText(/Jan/).closest('text');

    expect(displayTextElement).toHaveAttribute('fill', '#6B6C7B');
    expect(displayTextElement).toHaveClass(
      'recharts-text recharts-cartesian-axis-tick-value',
    );

    const valueElement = screen.getByText(/150/).closest('text');

    expect(valueElement).toHaveAttribute('fill', '#6B6C7B');
    expect(valueElement).toHaveClass(
      'recharts-text recharts-cartesian-axis-tick-value',
    );
  });

  test('should apply the correct stroke color to the lines', () => {
    render(
      <LineChart
        data={[
          { displayText: 'Jan', value: 100 },
          { displayText: 'Feb', value: 200 },
        ]}
        dataKeys={['value']}
        formatter={(value) => value}
      />,
      { wrapper: Wrapper },
    );

    const line = document.querySelector('path.recharts-line-curve');
    expect(line).toHaveAttribute('stroke', GRAPH.colors[0]);
  });

  test('back button is functional', async () => {
    render(<APIMetrics />, { wrapper: Wrapper });

    await waitFor(() => {
      const backButton = screen.getByText('Back');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
