import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Router from 'react-router-dom';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Tabs from '../components/Tabs';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Pages
import Pan from '..';

// Utils
import pitchPage from 'utils/pitchPage';

const renderer = new ShallowRenderer();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    tabId: 'batch',
  }),
}));

jest
  .mock('utils/pitchPage')
  .spyOn(pitchPage, 'get')
  .mockImplementation(() => ['UPI', 'BAV', 'AADHAAR', 'GSTIN']);

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

describe('In Pan page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <Pan />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks Pan', async () => {
    render(<Pan />, { wrapper: CustomWrapper });

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

  test('checks render', async () => {
    jest
      .mock('utils/pitchPage')
      .spyOn(pitchPage, 'get')
      .mockImplementation(() => ['PAN', 'AADHAAR']);

    render(<Pan />, { wrapper: Wrapper });

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Try PAN Verification/));
    });
  });
});
