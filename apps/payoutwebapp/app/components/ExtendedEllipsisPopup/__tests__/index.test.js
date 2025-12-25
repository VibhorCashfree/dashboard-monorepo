import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ExtendedEllipsisPopup from '..';

const renderer = new ShallowRenderer();

afterEach(() => {
  cleanup();
});

describe('ExtendedEllipsisPopup', () => {
  const actions = [
    { text: 'Primary Action 1', value: 'primary1', primary: true },
    {
      text: 'Primary Action 2',
      value: 'primary2',
      primary: true,
      disabled: true,
    },
    { text: 'Secondary Action 1', value: 'secondary1', primary: false },
  ];

  const onClickMock = jest.fn();

  test('should render primary actions', () => {
    render(<ExtendedEllipsisPopup actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    expect(screen.getByText('Primary Action 1')).toBeInTheDocument();
    expect(screen.getByText('Primary Action 2')).toBeInTheDocument();
  });

  test('should render secondary actions in an ellipsis popup', () => {
    render(<ExtendedEllipsisPopup actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.queryByText('Secondary Action 1')).not.toBeInTheDocument();
  });

  test('should not call onClick when a disabled primary action is clicked', () => {
    render(<ExtendedEllipsisPopup actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByText('Primary Action 2'));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('should call onClick with the correct value when a primary action is clicked', () => {
    render(<ExtendedEllipsisPopup actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByText('Primary Action 1'));
    expect(onClickMock).toHaveBeenCalledWith(expect.anything(), 'primary1');
  });

  test('should render nothing if actions array is empty', () => {
    const { container } = render(
      <ExtendedEllipsisPopup actions={[]} onClick={onClickMock} />,
      { wrapper: Wrapper },
    );

    expect(container.firstChild).toBeNull();
  });

  test('shallow render & match the snapshot', () => {
    const actions = [
      {
        key: 'UPDATE_DETAILS',
        text: 'Update Details',
        primary: false,
        value: 'UPDATE_DETAILS',
      },
      {
        key: 'DELETE',
        text: 'Delete',
        primary: false,
        value: 'DELETE',
      },
    ];

    renderer.render(
      <ExtendedEllipsisPopup actions={actions} onChange={jest.fn()} />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
