import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import UPImobile from '..';

const renderer = new ShallowRenderer();

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

describe('In UPImobile page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CustomWrapper>
        <UPImobile />
      </CustomWrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks UPI', async () => {
    render(<UPImobile />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(
        screen.queryByText('UPI Mobile Number Verification'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Click Verify')).toBeInTheDocument();
      expect(screen.queryByText('Verify UPI VPA via API')).toBeInTheDocument();
    });
  });
});
