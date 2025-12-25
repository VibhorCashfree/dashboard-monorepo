import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import Wrapper from '__tests__/components/Wrapper';
import FormWizard from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('utils/isFormValid', () => jest.fn());

  // eslint-disable-next-line react/prop-types
  jest.mock('components/Drawer', () => ({ children }) => <div>{children}</div>);

  // eslint-disable-next-line react/prop-types
  jest.mock('components/Icon', () => ({ name }) => <span>{name}</span>);
});

describe('FormWizard', () => {
  const defaultProps = {
    header: {
      title: 'Test Header',
      subTitle: 'Test SubHeader',
      actionButtons: jest.fn(),
    },
    closeConfirm: {
      title: 'Confirm Close',
      body: 'Are you sure you want to close?',
    },
    items: [
      {
        label: 'Step 1',
        render: jest.fn(),
        requiredFields: jest.fn().mockReturnValue([]),
      },
      {
        label: 'Step 2',
        render: jest.fn(),
        requiredFields: jest.fn().mockReturnValue([]),
      },
    ],
    activeIndex: 0,
    onStepChange: jest.fn(),
    onClose: jest.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<FormWizard {...defaultProps} {...props} />, { wrapper: Wrapper });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the component with initial props', () => {
    renderComponent();

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test SubHeader')).toBeInTheDocument();
    expect(screen.getAllByText('Step 1').length).toBe(2);
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  test('should handle navigation between steps', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Step 2'));

    expect(defaultProps.onStepChange).toHaveBeenCalledWith(1);
  });

  test('should handle form submission', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Proceed'));

    expect(defaultProps.items[0].render).toHaveBeenCalled();
  });

  // test('should disable the Proceed button if the form is invalid', () => {
  //   renderComponent();

  //   expect(screen.getByText('Proceed')).toBeDisabled();
  // });

  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Theme>
        <FormWizard {...defaultProps} />
      </Theme>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach((key) => {
      const StyledComponent = StyledComponents[key];

      const tree = renderer
        .create(
          <Theme>
            <StyledComponent />
          </Theme>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
