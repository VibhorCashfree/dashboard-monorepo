import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Router from 'react-router-dom';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Services
import * as UPIService from 'services/UPI';

// Utils
import pitchPage from 'utils/pitchPage';

// Pages
import UPI from '..';

// Components
import Tabs from '../components/Tabs';

const renderer = new ShallowRenderer();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    tabId: 'batch',
  }),
}));

beforeEach(() => {
  jest
    .mock('utils/pitchPage')
    .spyOn(pitchPage, 'get')
    .mockImplementation(() => ['PAN', 'BAV', 'AADHAAR', 'GSTIN']);
});

jest.spyOn(UPIService, 'getAll').mockImplementation(() =>
  Promise.resolve({
    data: [
      {
        id: 1619806,
        processedOn: '2023-01-30T14:31:31+05:30',
        verificationId: 1619806,
        vpa: 'success@upi',
        nameProvided: '',
        nameAtBank: 'JOHN SNOW',
        accountStatus: 'VALID',
        reason: '',
      },
    ],
    hasNext: false,
  }),
);

jest.spyOn(UPIService, 'getAllCount').mockImplementation(() =>
  Promise.resolve({
    count: 1,
  }),
);

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});
// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

describe('In UPI page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <UPI />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks UPI', async () => {
    render(<UPI />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(screen.queryByText('Uploaded At')).toBeInTheDocument();
      expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
      expect(screen.queryByText('Invalid')).toBeInTheDocument();
      expect(screen.queryByText('Uploaded By')).toBeInTheDocument();
      expect(screen.queryByText('No record found')).toBeInTheDocument();
      expect(screen.queryByText('Batch')).toHaveClass('active');
      expect(screen.queryByText('All batch files are shown here.'));
    });
  });

  test('checks render', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['UPI', 'AADHAAR']);

    render(<UPI />, { wrapper: Wrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Try UPI Verification/));
    });
  });

  test('checks Tabs render', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ tabId: 'all' });

    render(<Tabs />, { wrapper: CustomWrapper });

    await waitFor(() => {
      const lastTab = document.querySelector(
        '.ui.pointing.secondary.menu .item:last-child',
      );

      fireEvent.click(lastTab);
    });
  });
});
