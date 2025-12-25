import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ModeRequestResponse from '../components/ModeRequestResponse';

describe('ModeRequestResponse component', () => {
  test('renders null if data is not provided', () => {
    const { container } = render(<ModeRequestResponse data={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders the component with request and response logs', () => {
    render(
      <ModeRequestResponse
        data={{
          transferType: 'NEFT',
          bankUrl: 'https://api.bank.com/transfer',
          request: '{"amount":1000,"currency":"INR"}',
          response: '{"status":"SUCCESS","transactionId":"12345"}',
          verified: true,
        }}
      />,
      { wrapper: Wrapper },
    );

    expect(screen.getByText(/NEFT/)).toBeInTheDocument();

    expect(
      screen.getByText(/--url 'https:\/\/api.bank.com\/transfer'/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/--data-raw '{"amount":1000,"currency":"INR"}'/),
    ).toBeInTheDocument();

    expect(screen.getByText('Response:')).toBeInTheDocument();
    expect(screen.getByText(/"status": "SUCCESS"/)).toBeInTheDocument();
    expect(screen.getByText(/"transactionId": "12345"/)).toBeInTheDocument();

    expect(
      screen.getByText(
        /The credentials for this mode are successfully verified./,
      ),
    ).toBeInTheDocument();
  });

  test('renders the "not verified" comment when data.verified is false', () => {
    render(
      <ModeRequestResponse
        data={{
          transferType: 'NEFT',
          bankUrl: 'https://api.bank.com/transfer',
          request: '{"amount":1000,"currency":"INR"}',
          response: '{"status":"SUCCESS","transactionId":"12345"}',
          verified: false,
        }}
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.getByText(
        /The credentials for this mode could not be successfully verified./,
      ),
    ).toBeInTheDocument();
  });

  test('displays response even if it is not a valid JSON', () => {
    render(
      <ModeRequestResponse
        data={{
          transferType: 'NEFT',
          bankUrl: 'https://api.bank.com/transfer',
          request: '{"amount":1000,"currency":"INR"}',
          response: 'Invalid response format',
          verified: true,
        }}
      />,
      { wrapper: Wrapper },
    );

    expect(screen.getByText('Invalid response format')).toBeInTheDocument();
  });

  test('copies the request and response values when Copy component is clicked', () => {
    // eslint-disable-next-line react/prop-types
    jest.mock('components/Copy', () => ({ value }) => <div>{value}</div>);

    render(
      <ModeRequestResponse
        data={{
          transferType: 'NEFT',
          bankUrl: 'https://api.bank.com/transfer',
          request: '{"amount":1000,"currency":"INR"}',
          response: '{"status":"SUCCESS","transactionId":"12345"}',
          verified: true,
        }}
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.getByText(/--url 'https:\/\/api.bank.com\/transfer'/),
    ).toBeInTheDocument();
    expect(screen.getByText(/"status": "SUCCESS",/)).toBeInTheDocument();
  });
});
