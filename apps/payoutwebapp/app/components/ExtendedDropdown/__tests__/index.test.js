import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ExtendedDropdown from '..';

const renderer = new ShallowRenderer();

describe('ExtendedDropdown', () => {
  const actions = [
    { text: 'Primary Action 1', value: 'primary1', primary: true },
    {
      text: 'Primary Action 2',
      value: 'primary2',
      primary: true,
      tooltip: 'Primary tooltip',
    },
    { text: 'Secondary Action 1', value: 'secondary1', primary: false },
  ];

  const onClickMock = jest.fn();

  test('should render primary actions', () => {
    render(<ExtendedDropdown actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    expect(screen.getByText('Primary Action 1')).toBeInTheDocument();
    expect(screen.getByText('Primary Action 2')).toBeInTheDocument();
  });

  test('should render secondary actions in a dropdown', () => {
    render(<ExtendedDropdown actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('should call onClick with the correct value when a primary action is clicked', () => {
    render(<ExtendedDropdown actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByText('Primary Action 1'));
    expect(onClickMock).toHaveBeenCalledWith('primary1');
  });

  test('should call onClick with the correct value when a secondary action is clicked', () => {
    render(<ExtendedDropdown actions={actions} onClick={onClickMock} />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByText('Actions'));
    fireEvent.click(screen.getByText('Secondary Action 1'));
    expect(onClickMock).toHaveBeenCalledWith('secondary1');
  });

  test('should render nothing if actions array is empty', () => {
    const { container } = render(
      <ExtendedDropdown actions={[]} onClick={onClickMock} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(container.firstChild).toBeNull();
  });

  test('shallow render & match the snapshot', () => {
    const actions = [
      {
        key: 'UPDATE_DETAILS',
        text: 'Update Details',
        primary: true,
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
      <ExtendedDropdown actions={actions} onChange={jest.fn()} />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
