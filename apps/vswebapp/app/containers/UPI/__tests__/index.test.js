import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as UPIService from 'services/UPI';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';
import VerifyModal from '../components/VerifyModal';

// Containers
import UPI from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/UPI');

  jest.spyOn(UPIService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1621310,
          processedOn: '2023-02-01T00:54:21+05:30',
          verificationId: 1621310,
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
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

const renderer = new ShallowRenderer();

describe('In UPI Container', () => {
  test('checks render', async () => {
    render(<UPI />, { wrapper: CustomWrapper });

    expect(UPIService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(UPIService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('success@upi')).toBeInTheDocument();
      expect(screen.queryByText('JOHN SNOW')).toBeInTheDocument();
      expect(screen.queryByText('Valid')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'UPI VPAs and the verification statuses are shown here.',
        ),
      ).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.VERIFY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Verify UPI VPA')).toBeInTheDocument();
      expect(screen.queryByText('Optional')).toBeInTheDocument();
      expect(
        screen.queryByText(
          '₹ 1.20 will be deducted from your available balance',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Verify',
      });

      expect(submitButton).toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('VPA is Valid')).toBeInTheDocument();
      expect(screen.queryByText('Name Provided')).toBeInTheDocument();
      expect(screen.queryByText('VPA')).toBeInTheDocument();
      expect(screen.queryByText('Name at Bank')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Failed To Verify')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.NOT_EXIST}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('VPA is Invalid')).toBeInTheDocument();

      expect(screen.queryByText('Name Provided')).toBeInTheDocument();
      expect(screen.queryByText('VPA')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
  test('checks Verify Modals render', async () => {
    render(<VerifyModal onClose={jest.fn()} onResponse={jest.fn()} />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText('VPA')).toBeInTheDocument();
      expect(screen.queryByText('Account Holder Name')).toBeInTheDocument();
    });
  });

  test('text for Verify Modal is correct', () => {
    const { getByText } = render(
      <VerifyModal onClose={jest.fn()} onResponse={jest.fn()} />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(getByText('VPA')).toBeInTheDocument();
    expect(getByText('Account Holder Name')).toBeInTheDocument();
    expect(getByText('Verify')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  test('checks Verify Modals Snapshot render', async () => {
    renderer.render(
      <Wrapper>
        <VerifyModal onClose={jest.fn()} onResponse={jest.fn()} />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Verify Button functionality on Verify Modal', async () => {
    const onResponse = jest.fn();
    const { getByText } = render(
      <VerifyModal onClose={jest.fn()} onResponse={onResponse} />,
      {
        wrapper: CustomWrapper,
      },
    );

    const verifyButton = getByText('Verify');

    expect(verifyButton).toBeDisabled();
    expect(verifyButton).toBeInTheDocument();
  });

  test('check handleChange function in VerifyModal', () => {
    render(<VerifyModal onClose={jest.fn()} onResponse={jest.fn()} />, {
      wrapper: CustomWrapper,
    });

    const input = screen.queryByPlaceholderText('Name');

    fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(input.value).toBe('John Doe');
  });
});
