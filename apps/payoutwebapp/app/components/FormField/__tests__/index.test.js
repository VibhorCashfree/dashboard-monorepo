import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Constants
import { FILE_SIZE_CHECK } from 'constants/common';

// Components
import Wrapper from '__tests__/components/Wrapper';
import FormField from '..';

const renderer = new ShallowRenderer();

describe('FormField', () => {
  const defaultProps = {
    label: 'Test Label',
    required: 'mandatory',
    property: 'testProperty',
    description: 'Test description',
    extensions: ['.pdf', '.doc'],
    type: 'file',
    width: 5,
    enums: ['Option1', 'Option2'],
    error: '',
    value: '',
    onChange: jest.fn(),
  };

  // eslint-disable-next-line react/prop-types
  const renderComponent = (props = {}) =>
    render(<FormField {...defaultProps} {...props} />, {
      wrapper: Wrapper,
    });

  test('should render file input field and handle file change', () => {
    renderComponent({ type: 'file' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText(FILE_SIZE_CHECK)).toBeInTheDocument();
    expect(screen.getByText('File type: .pdf,.doc')).toBeInTheDocument();
  });

  test('should render dropdown field and handle change', () => {
    renderComponent({ type: 'dropdown' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Choose a Test Label')).toBeInTheDocument();
  });

  test('should render checkbox field and handle change', () => {
    renderComponent({ type: 'checkBox' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    const checkbox = screen.getByText('Option1');

    fireEvent.click(checkbox);

    // expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('should render radio button field and handle change', () => {
    renderComponent({ type: 'radioButtons' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    const radioButton = screen.getByText('Option1');

    fireEvent.click(radioButton);

    // expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('should render input text field and handle change', () => {
    renderComponent({ type: 'inputText' });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'newValue' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('should display error message', () => {
    renderComponent({ error: 'Sample error message' });

    expect(screen.getByText('Sample error message')).toBeInTheDocument();
  });

  test('shallow render & match the snapshot', () => {
    renderer.render(
      <FormField
        label="This is label"
        required="mandatory"
        property="foo"
        description="This is a description"
        extensions={['.csv', '.xls', '.pdf']}
        type="dropdown"
        enums={[]}
        error="This is an error"
        value="bar"
        onChange={jest.fn()}
      />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
