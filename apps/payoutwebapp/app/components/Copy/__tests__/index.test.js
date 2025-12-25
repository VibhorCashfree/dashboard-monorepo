import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import Copy from '..';

// eslint-disable-next-line react/prop-types
jest.mock('components/Icon', () => ({ name, ...props }) => (
  <div {...props}>{name}</div>
));

const renderer = new ShallowRenderer();

describe('Copy', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shallow render & match the snapshot', () => {
    renderer.render(<Copy value="skhf92ug64" />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('renders null if no value is provided', () => {
    const { container } = render(<Copy />);
    expect(container.firstChild).toBeNull();
  });

  test('renders the copy icon if a value is provided', () => {
    render(<Copy value="Test Value" />);
    expect(screen.getByText('copy')).toBeInTheDocument();
  });

  test('changes the icon after clicking it', () => {
    render(<Copy value="Test Value" />);
    const icon = screen.getByText('copy');
    fireEvent.click(icon);
    expect(screen.getByText('tick')).toBeInTheDocument();
  });

  test('copies the value to the clipboard when clicked', () => {
    render(<Copy value="Test Value" />);
    const icon = screen.getByText('copy');
    fireEvent.click(icon);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test Value');
  });

  test('calls the onClick callback when provided', () => {
    const onClick = jest.fn();
    render(<Copy value="Test Value" onClick={onClick} />);
    const icon = screen.getByText('copy');
    fireEvent.click(icon);
    expect(onClick).toHaveBeenCalled();
  });

  test('does not call the onClick callback if not provided', () => {
    render(<Copy value="Test Value" />);
    const icon = screen.getByText('copy');
    fireEvent.click(icon);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test Value');
  });
});
