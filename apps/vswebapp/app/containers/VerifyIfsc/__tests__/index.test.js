import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

// Services
import * as BAVService from 'services/bav';

// Containers
import VerifyIfsc from '..';

beforeEach(() => {
  jest.mock('services/bav');

  jest
    .spyOn(BAVService, 'verifyIFSC')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In VerifyIfsc Container', () => {
  test('checks render', async () => {
    render(<VerifyIfsc />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Verify IFSC')).toBeInTheDocument();
      expect(screen.queryByText('Enter IFSC')).toBeInTheDocument();
      expect(
        screen.queryByText('IFSC must be 11 characters'),
      ).toBeInTheDocument();

      expect(screen.queryByText('How to verify an IFSC?'));
    });

    const submitButton = screen.queryByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    const ifscInput = screen.queryByPlaceholderText('Enter IFSC');

    await userEvent.clear(ifscInput);
    await userEvent.type(ifscInput, 'YESB0CMSNOC');

    expect(ifscInput.value).toBe('YESB0CMSNOC');

    fireEvent.click(submitButton);

    expect(BAVService.verifyIFSC).toHaveBeenCalledWith({
      ifsc: 'YESB0CMSNOC',
    });
  });

  test('checks render', async () => {
    render(<ErrorAlert />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('IFSC is Invalid'));
    });
  });

  test('checks render', async () => {
    render(
      <SuccessAlert
        data={{
          bankDetails: {
            bank: 'foo',
            branch: 'bar',
            address: 'koramangala',
            city: 'bangalore',
          },
        }}
      />,
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Valid IFSC'));
      expect(screen.queryByText('koramangala'));
      expect(screen.queryByText('foo'));
      expect(screen.queryByText('bar'));
      expect(screen.queryByText('bangalore'));
    });
  });
});
